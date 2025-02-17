import { InjectPool } from "nestjs-slonik";
import { CommonQueryMethods, DatabasePool, ListSqlToken, QuerySqlToken, sql } from "slonik";
import { UserSchema } from "src/schemas/user.schema";

interface Include {
    model: string;
    sourceKey: string;
    targetKey: string;
    as?: string;
    required?: boolean;
    attributes?: RepositoryOptions["attributes"];
}

export interface RepositoryOptions {
    transaction?: CommonQueryMethods;
    // include?: Include | Include[];
    attributes?: string[] | {
        exclude?: string[];
    }
    required?: boolean;
}

const options: RepositoryOptions = {
    required: false
}

export abstract class Repository {
    protected readonly model: string;
    constructor(@InjectPool() protected readonly db: DatabasePool) {
        this.model = this.getModel();
    }

    protected abstract getModel(): string;

    public ATTRIBUTES(attributes: RepositoryOptions["attributes"], tableName: string = this.model) {
        let attrs: any[] = [];

        if (Array.isArray(attributes)) {
            attrs = attributes.map(col => (sql.identifier([tableName, col])));
        } else if (Array.isArray(attributes?.exclude)) {
            attrs = Object.keys(UserSchema.shape).filter(col => !(attributes.exclude!.includes(col))).map(col => (sql.identifier([tableName, col])));
        }
        return sql.join(attrs, sql.fragment`, `);
    }

    public WHERE(where: Record<string, any>) {
        return sql.unsafe`
        WHERE ${sql.join(
            Object.keys(where).map(key => sql.unsafe`${sql.identifier([key])} = ${where[key]}`),
            sql.fragment` AND `
        )}
        `
    }

    public SELECT(tableName: string, ...attributes: ListSqlToken[]) {
        return sql.unsafe`
            SELECT ${sql.join(attributes, sql.fragment`, `)} FROM ${sql.identifier([tableName])}
        `
    }

    public INCLUDE(include: Include, required: RepositoryOptions["required"]) {
        const tableName = this.model;

        let joinType = sql.fragment`LEFT`;

        if (include.required && required) {
            joinType = sql.fragment`INNER`;
        } else if (include.required) {
            joinType = sql.fragment`RIGHT`;
        }

        return sql.unsafe`
            ${joinType} JOIN ${sql.identifier([include.model])} 
            ON ${sql.identifier([tableName, include.sourceKey])} = ${sql.identifier([include.model, include.targetKey])}
        `;
    }

    async findOne<T extends Record<string, any>>(where: T, condition = options) {
        const tableName = this.model;
        const { transaction, attributes } = condition;

        const sqlUnsafe = sql.unsafe`
                    ${this.SELECT(tableName, this.ATTRIBUTES(attributes))}
                    ${this.WHERE(where)}
                `
        
        if (transaction) {
            return await transaction.maybeOne(sqlUnsafe);
        }
        return await this.db.maybeOne(sqlUnsafe);
    }
}
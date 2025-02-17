import { Module } from "@nestjs/common";
import { SlonikModule } from "nestjs-slonik";
import { DB_URI } from "src/config/db.config";

@Module({
    imports: [
        SlonikModule.forRoot({
            connectionUri: DB_URI,
            clientConfigurationInput: {
                typeParsers: [
                    { name: 'timestamp', parse: value => new Date(`${value} UTC`) }
                ]
            }
        }),
    ],
    exports: [SlonikModule]
})

export class DatabaseModule { }
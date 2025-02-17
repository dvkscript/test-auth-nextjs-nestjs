import * as dotenv from 'dotenv';

dotenv.config();

export const DB_URI = `postgres://${process.env.POSTGRES_USER
    }:${process.env.POSTGRES_PASSWORD
    }@${process.env.POSTGRES_HOST
    }:${process.env.POSTGRES_PORT || 5432
    }/${process.env.POSTGRES_DATABASE}`
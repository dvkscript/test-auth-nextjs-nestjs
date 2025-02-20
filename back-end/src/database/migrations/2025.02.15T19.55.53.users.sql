CREATE TABLE IF NOT EXISTS users (
    id VARCHAR DEFAULT uuid_generate_v4() NOT NULL,
    email VARCHAR(100) NOT NULL,
    last_name VARCHAR(50),  
    first_name VARCHAR(50),
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "UQ_users_email" UNIQUE ("email"),
    CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
);

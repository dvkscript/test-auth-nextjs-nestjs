CREATE TABLE IF NOT EXISTS user_passwords (
    id VARCHAR DEFAULT uuid_generate_v4() NOT NULL,
    password VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "PK_user_passwords_id" PRIMARY KEY ("id"),
    CONSTRAINT "FK_user_passwords_user_id" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

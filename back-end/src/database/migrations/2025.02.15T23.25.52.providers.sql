CREATE TABLE IF NOT EXISTS providers (
    id VARCHAR DEFAULT uuid_generate_v4() NOT NULL,
    name VARCHAR(100) NOT NULL,
    user_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "PK_providers_id" PRIMARY KEY ("id"),
    CONSTRAINT "FK_user_tokens_user_id" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

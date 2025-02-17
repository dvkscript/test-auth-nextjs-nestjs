CREATE TABLE IF NOT EXISTS blacklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    token VARCHAR NOT NULL,
    expired TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

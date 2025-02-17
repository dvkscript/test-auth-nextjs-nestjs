INSERT INTO users (id, email, last_name, first_name, is_active, created_at, updated_at)
VALUES 
    (uuid_generate_v4(), 'user1@example.com', 'Nguyen', 'An', TRUE, NOW(), NOW()),
    (uuid_generate_v4(), 'user2@example.com', 'Tran', 'Binh', FALSE, NOW(), NOW()),
    (uuid_generate_v4(), 'user3@example.com', 'Le', 'Chi', TRUE, NOW(), NOW()),
    (uuid_generate_v4(), 'user4@example.com', 'Pham', 'Dung', FALSE, NOW(), NOW()),
    (uuid_generate_v4(), 'user5@example.com', 'Hoang', 'Em', TRUE, NOW(), NOW());

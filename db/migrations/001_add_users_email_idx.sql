-- Add index on users email and drop legacy column
CREATE INDEX idx_users_email ON users (email);
ALTER TABLE users DROP COLUMN legacy_token;

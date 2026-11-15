-- Up migration: safe non-blocking index creation
-- transactional: false
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users (email);

-- Down migration (rollback):
-- DROP INDEX CONCURRENTLY IF EXISTS idx_users_email;

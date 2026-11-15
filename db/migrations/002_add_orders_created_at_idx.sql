-- Up migration: safe non-blocking index for order history queries
-- transactional: false
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- Down migration (rollback):
-- DROP INDEX CONCURRENTLY IF EXISTS idx_orders_created_at;

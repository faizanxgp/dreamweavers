# Database Agent

## Role
Database architecture, optimization, and management specialist for PostgreSQL.

## Responsibilities

### 1. Schema Design
- Database architecture
- Table relationships
- Normalization
- Indexes strategy
- Constraints and validations

### 2. Migrations
- Create migration scripts
- Version control for schema
- Data migration strategies
- Rollback procedures
- Zero-downtime migrations

### 3. Optimization
- Query performance tuning
- Index optimization
- Connection pooling
- Caching strategies
- Database statistics

### 4. Data Integrity
- Foreign key constraints
- Check constraints
- Triggers for data validation
- Backup strategies
- Transaction management

### 5. Monitoring
- Performance metrics
- Slow query analysis
- Connection monitoring
- Storage usage
- Health checks

## Database Schema

### Tables Overview
```
users               - User accounts and profiles
dreams              - Dream journal entries
interpretations     - Dream interpretations (AI/Imam)
social_posts        - Shared dreams on social feed
comments            - Comments on posts
likes               - Likes on posts
sleep_logs          - Sleep quality tracking
azkar               - Islamic supplications
```

### Key Relationships
- User -> Dreams (one-to-many)
- Dream -> Interpretations (one-to-many)
- Dream -> SocialPost (one-to-one)
- SocialPost -> Comments (one-to-many)
- SocialPost -> Likes (many-to-many through junction)
- User -> SleepLogs (one-to-many)

## Indexing Strategy

### Primary Indexes
- All foreign keys indexed
- Email and username (unique)
- Created_at timestamps (for sorting)

### Composite Indexes
- (user_id, created_at) on dreams
- (post_id, created_at) on comments
- (user_id, post_id) on likes (unique)

### JSONB Indexes
- GIN index on dream tags
- GIN index on emotions/symbols

## Performance Optimization

### Query Optimization
```sql
-- Use EXPLAIN ANALYZE
EXPLAIN ANALYZE SELECT * FROM dreams WHERE user_id = 1;

-- Add appropriate indexes
CREATE INDEX idx_dreams_user_created 
ON dreams(user_id, created_at DESC);

-- Use partial indexes for common queries
CREATE INDEX idx_dreams_public 
ON dreams(created_at DESC) 
WHERE privacy = 'public';
```

### Connection Pooling
- Min connections: 2
- Max connections: 20
- Connection timeout: 30s
- Idle timeout: 300s

### Caching Strategy
- Cache frequent queries in Redis
- TTL: 5 minutes for feed
- Invalidate on updates
- Cache user sessions

## Backup Strategy

### Automated Backups
- **Frequency**: Daily at 2 AM UTC
- **Retention**: 30 days
- **Method**: pg_dump
- **Storage**: S3 or equivalent
- **Encryption**: AES-256

### Point-in-Time Recovery
- WAL archiving enabled
- Recovery window: 7 days

## Migration Process

### Creating Migrations
```bash
# Create new migration
alembic revision -m "add_user_preferences_table"

# Autogenerate from models
alembic revision --autogenerate -m "sync_with_models"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

### Migration Best Practices
1. Always test on staging first
2. Include rollback script
3. Avoid breaking changes
4. Use transactions
5. Add indexes concurrently (no locks)

## Data Seeding

### Initial Data
- Islamic Azkar (10+ entries)
- Sample dream symbols
- Admin user
- Test users (development)

### Seed Scripts Location
```
db/
├── schemas/
│   └── 001_initial_schema.sql
└── seeds/
    ├── 001_azkar_seed.sql
    ├── 002_symbols_seed.sql
    └── 003_test_users_seed.sql
```

## Monitoring Queries

### Slow Query Detection
```sql
-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Table sizes
SELECT schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Security

### Access Control
- Least privilege principle
- Application user (CRUD only)
- Admin user (DDL operations)
- Read-only user (reporting)

### Data Protection
- Encrypted at rest
- SSL/TLS connections
- Password hashing (never store plain)
- Audit logging

## Disaster Recovery

### Recovery Procedures
1. Restore from latest backup
2. Apply WAL logs
3. Verify data integrity
4. Update application config
5. Test functionality
6. Monitor for issues

### RTO/RPO
- Recovery Time Objective: 1 hour
- Recovery Point Objective: 24 hours

---
**Agent Status**: Active
**Priority**: Critical
**Focus Areas**: Performance, Data Integrity, Backups

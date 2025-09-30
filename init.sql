-- Initialize Kairo database with optimized indexes

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Performance-critical indexes will be created by SQLAlchemy migrations
-- This file contains any additional database setup

-- Create a sample admin user (in production, this should be done securely)
-- This is just for initial setup and testing

-- Set timezone
SET timezone = 'UTC';

-- Create any custom functions or triggers here if needed

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE kairo_db TO kairo;
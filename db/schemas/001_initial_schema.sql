-- Dream Interpreter Database Schema
-- PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'imam', 'admin');
CREATE TYPE dream_type AS ENUM ('regular', 'istikhara', 'prophetic', 'confused');
CREATE TYPE dream_privacy AS ENUM ('private', 'friends', 'public');
CREATE TYPE interpretation_type AS ENUM ('ai', 'imam', 'community');
CREATE TYPE interpretation_status AS ENUM ('pending', 'in_progress', 'completed', 'declined');

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    role user_role DEFAULT 'user',

    -- Profile
    full_name VARCHAR(200),
    bio VARCHAR(500),
    avatar_url VARCHAR(500),

    -- Privacy
    profile_visibility BOOLEAN DEFAULT TRUE,
    allow_friend_requests BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Indexes
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- Dreams table
CREATE TABLE dreams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Content
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    dream_type dream_type DEFAULT 'regular',

    -- Context (stored as JSONB for flexibility)
    emotions JSONB,
    symbols JSONB,
    colors JSONB,
    people JSONB,

    -- Timing
    dream_date VARCHAR(50),
    time_of_day VARCHAR(20),

    -- Privacy
    privacy dream_privacy DEFAULT 'private',
    is_shared BOOLEAN DEFAULT FALSE,

    -- Istikhara specific
    istikhara_decision TEXT,

    -- Metadata
    tags JSONB,
    audio_url VARCHAR(500),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dreams_user_id ON dreams(user_id);
CREATE INDEX idx_dreams_dream_type ON dreams(dream_type);
CREATE INDEX idx_dreams_privacy ON dreams(privacy);
CREATE INDEX idx_dreams_created_at ON dreams(created_at DESC);
CREATE INDEX idx_dreams_tags ON dreams USING GIN(tags);

-- Interpretations table
CREATE TABLE interpretations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dream_id INTEGER NOT NULL REFERENCES dreams(id) ON DELETE CASCADE,

    -- Interpretation details
    interpretation_type interpretation_type NOT NULL,
    interpretation_text TEXT NOT NULL,

    -- AI specific
    model_name VARCHAR(100),
    confidence_score FLOAT,

    -- Imam specific
    imam_id INTEGER REFERENCES users(id),
    status interpretation_status DEFAULT 'completed',

    -- Metadata
    key_symbols TEXT,
    spiritual_guidance TEXT,
    quranic_references TEXT,
    hadith_references TEXT,

    -- User feedback
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interpretations_user_id ON interpretations(user_id);
CREATE INDEX idx_interpretations_dream_id ON interpretations(dream_id);
CREATE INDEX idx_interpretations_type ON interpretations(interpretation_type);
CREATE INDEX idx_interpretations_imam_id ON interpretations(imam_id);
CREATE INDEX idx_interpretations_status ON interpretations(status);

-- Social Posts table
CREATE TABLE social_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dream_id INTEGER NOT NULL UNIQUE REFERENCES dreams(id) ON DELETE CASCADE,

    -- Content
    caption TEXT,
    interpretation_included BOOLEAN DEFAULT FALSE,

    -- Engagement counters
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,

    -- Moderation
    is_flagged BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX idx_social_posts_created_at ON social_posts(created_at DESC);
CREATE INDEX idx_social_posts_likes_count ON social_posts(likes_count DESC);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES social_posts(id) ON DELETE CASCADE,

    -- Content
    text TEXT NOT NULL,

    -- Threading
    parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,

    -- Moderation
    is_flagged BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_comment_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES social_posts(id) ON DELETE CASCADE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Ensure unique like per user per post
    CONSTRAINT unique_user_post_like UNIQUE (user_id, post_id)
);

CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);

-- Sleep tracking table
CREATE TABLE sleep_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Sleep data
    sleep_date DATE NOT NULL,
    sleep_time TIME,
    wake_time TIME,
    duration_hours FLOAT,
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),

    -- Additional data
    notes TEXT,
    had_dream BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sleep_logs_user_id ON sleep_logs(user_id);
CREATE INDEX idx_sleep_logs_date ON sleep_logs(sleep_date DESC);

-- Azkar content table (for Islamic supplications)
CREATE TABLE azkar (
    id SERIAL PRIMARY KEY,

    -- Content
    arabic_text TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT NOT NULL,

    -- Category
    category VARCHAR(100) NOT NULL, -- 'night', 'sleep', 'morning', 'evening'

    -- Reference
    reference TEXT, -- Quranic or Hadith reference

    -- Order
    display_order INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_azkar_category ON azkar(category);
CREATE INDEX idx_azkar_display_order ON azkar(display_order);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dreams_updated_at BEFORE UPDATE ON dreams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interpretations_updated_at BEFORE UPDATE ON interpretations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at BEFORE UPDATE ON social_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sleep_logs_updated_at BEFORE UPDATE ON sleep_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update social post counters
CREATE OR REPLACE FUNCTION update_post_counters()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'likes' THEN
        IF TG_OP = 'INSERT' THEN
            UPDATE social_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE social_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
        END IF;
    ELSIF TG_TABLE_NAME = 'comments' THEN
        IF TG_OP = 'INSERT' THEN
            UPDATE social_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE social_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
        END IF;
    END IF;

    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers for counter updates
CREATE TRIGGER update_likes_counter AFTER INSERT OR DELETE ON likes
    FOR EACH ROW EXECUTE FUNCTION update_post_counters();

CREATE TRIGGER update_comments_counter AFTER INSERT OR DELETE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_post_counters();

-- Comments
COMMENT ON TABLE users IS 'User accounts with authentication and profile information';
COMMENT ON TABLE dreams IS 'Dream journal entries with context and metadata';
COMMENT ON TABLE interpretations IS 'Dream interpretations from AI, Imams, or community';
COMMENT ON TABLE social_posts IS 'Publicly shared dreams for social interaction';
COMMENT ON TABLE comments IS 'Comments on social posts with threading support';
COMMENT ON TABLE likes IS 'Like interactions on social posts';
COMMENT ON TABLE sleep_logs IS 'Sleep quality tracking data';
COMMENT ON TABLE azkar IS 'Islamic supplications and remembrances';

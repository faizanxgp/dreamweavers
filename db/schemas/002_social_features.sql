-- Social Features Extension - Followers, Shares, Notifications
-- PostgreSQL 15+

-- Create custom types for social features
CREATE TYPE notification_type AS ENUM (
    'follow',
    'like',
    'comment',
    'share',
    'mention',
    'interpretation_received',
    'imam_assigned'
);

-- Followers/Following relationship table
CREATE TABLE followers (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Ensure unique follow relationship and prevent self-follow
    CONSTRAINT unique_follower_following UNIQUE (follower_id, following_id),
    CONSTRAINT prevent_self_follow CHECK (follower_id != following_id)
);

CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);
CREATE INDEX idx_followers_created_at ON followers(created_at DESC);

-- Shares/Reposts table
CREATE TABLE shares (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES social_posts(id) ON DELETE CASCADE,

    -- Content
    caption TEXT, -- Optional comment when sharing

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Ensure unique share per user per post
    CONSTRAINT unique_user_post_share UNIQUE (user_id, post_id)
);

CREATE INDEX idx_shares_user_id ON shares(user_id);
CREATE INDEX idx_shares_post_id ON shares(post_id);
CREATE INDEX idx_shares_created_at ON shares(created_at DESC);

-- Notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Notification details
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,

    -- Related entities (nullable, depending on notification type)
    actor_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- User who triggered the notification
    post_id INTEGER REFERENCES social_posts(id) ON DELETE CASCADE,
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    dream_id INTEGER REFERENCES dreams(id) ON DELETE CASCADE,
    interpretation_id INTEGER REFERENCES interpretations(id) ON DELETE CASCADE,

    -- Status
    is_read BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- User mentions table (for @mentions in comments)
CREATE TABLE mentions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- User being mentioned
    comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES social_posts(id) ON DELETE CASCADE,
    mentioned_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- At least one of comment_id or post_id must be set
    CONSTRAINT mention_target CHECK (
        (comment_id IS NOT NULL AND post_id IS NULL) OR
        (comment_id IS NULL AND post_id IS NOT NULL)
    )
);

CREATE INDEX idx_mentions_user_id ON mentions(user_id);
CREATE INDEX idx_mentions_comment_id ON mentions(comment_id);
CREATE INDEX idx_mentions_post_id ON mentions(post_id);
CREATE INDEX idx_mentions_created_at ON mentions(created_at DESC);

-- Add shares_count to social_posts table
ALTER TABLE social_posts ADD COLUMN shares_count INTEGER DEFAULT 0;

-- Add followers/following counts to users table (denormalized for performance)
ALTER TABLE users ADD COLUMN followers_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN following_count INTEGER DEFAULT 0;

-- Function to update follower counters
CREATE OR REPLACE FUNCTION update_follower_counters()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment following count for follower
        UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
        -- Increment followers count for following
        UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement following count for follower
        UPDATE users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
        -- Decrement followers count for following
        UPDATE users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for follower counter updates
CREATE TRIGGER update_follower_counter AFTER INSERT OR DELETE ON followers
    FOR EACH ROW EXECUTE FUNCTION update_follower_counters();

-- Function to update shares counter
CREATE OR REPLACE FUNCTION update_shares_counter()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE social_posts SET shares_count = shares_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE social_posts SET shares_count = shares_count - 1 WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create trigger for shares counter updates
CREATE TRIGGER update_shares_counter AFTER INSERT OR DELETE ON shares
    FOR EACH ROW EXECUTE FUNCTION update_shares_counter();

-- Function to create notifications
CREATE OR REPLACE FUNCTION create_notification_on_action()
RETURNS TRIGGER AS $$
DECLARE
    notification_user_id INTEGER;
    notification_title VARCHAR(200);
    notification_message TEXT;
    notification_type_val notification_type;
    post_user_id INTEGER;
BEGIN
    -- Handle different trigger tables
    IF TG_TABLE_NAME = 'followers' AND TG_OP = 'INSERT' THEN
        -- New follower notification
        notification_user_id := NEW.following_id;
        notification_type_val := 'follow';
        SELECT username INTO notification_title FROM users WHERE id = NEW.follower_id;
        notification_message := notification_title || ' started following you';
        notification_title := 'New Follower';

        INSERT INTO notifications (user_id, type, title, message, actor_id, created_at)
        VALUES (notification_user_id, notification_type_val, notification_title, notification_message, NEW.follower_id, CURRENT_TIMESTAMP);

    ELSIF TG_TABLE_NAME = 'likes' AND TG_OP = 'INSERT' THEN
        -- New like notification
        SELECT user_id INTO post_user_id FROM social_posts WHERE id = NEW.post_id;
        -- Don't notify if user likes their own post
        IF post_user_id != NEW.user_id THEN
            notification_user_id := post_user_id;
            notification_type_val := 'like';
            SELECT username INTO notification_title FROM users WHERE id = NEW.user_id;
            notification_message := notification_title || ' liked your post';
            notification_title := 'New Like';

            INSERT INTO notifications (user_id, type, title, message, actor_id, post_id, created_at)
            VALUES (notification_user_id, notification_type_val, notification_title, notification_message, NEW.user_id, NEW.post_id, CURRENT_TIMESTAMP);
        END IF;

    ELSIF TG_TABLE_NAME = 'comments' AND TG_OP = 'INSERT' THEN
        -- New comment notification
        SELECT user_id INTO post_user_id FROM social_posts WHERE id = NEW.post_id;
        -- Don't notify if user comments on their own post
        IF post_user_id != NEW.user_id THEN
            notification_user_id := post_user_id;
            notification_type_val := 'comment';
            SELECT username INTO notification_title FROM users WHERE id = NEW.user_id;
            notification_message := notification_title || ' commented on your post';
            notification_title := 'New Comment';

            INSERT INTO notifications (user_id, type, title, message, actor_id, post_id, comment_id, created_at)
            VALUES (notification_user_id, notification_type_val, notification_title, notification_message, NEW.user_id, NEW.post_id, NEW.id, CURRENT_TIMESTAMP);
        END IF;

    ELSIF TG_TABLE_NAME = 'shares' AND TG_OP = 'INSERT' THEN
        -- New share notification
        SELECT user_id INTO post_user_id FROM social_posts WHERE id = NEW.post_id;
        -- Don't notify if user shares their own post
        IF post_user_id != NEW.user_id THEN
            notification_user_id := post_user_id;
            notification_type_val := 'share';
            SELECT username INTO notification_title FROM users WHERE id = NEW.user_id;
            notification_message := notification_title || ' shared your post';
            notification_title := 'New Share';

            INSERT INTO notifications (user_id, type, title, message, actor_id, post_id, created_at)
            VALUES (notification_user_id, notification_type_val, notification_title, notification_message, NEW.user_id, NEW.post_id, CURRENT_TIMESTAMP);
        END IF;
    END IF;

    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers for automatic notifications
CREATE TRIGGER notify_on_follow AFTER INSERT ON followers
    FOR EACH ROW EXECUTE FUNCTION create_notification_on_action();

CREATE TRIGGER notify_on_like AFTER INSERT ON likes
    FOR EACH ROW EXECUTE FUNCTION create_notification_on_action();

CREATE TRIGGER notify_on_comment AFTER INSERT ON comments
    FOR EACH ROW EXECUTE FUNCTION create_notification_on_action();

CREATE TRIGGER notify_on_share AFTER INSERT ON shares
    FOR EACH ROW EXECUTE FUNCTION create_notification_on_action();

-- Comments
COMMENT ON TABLE followers IS 'User follow relationships for social networking';
COMMENT ON TABLE shares IS 'Shared/reposted dreams for social interaction';
COMMENT ON TABLE notifications IS 'User notifications for social activities';
COMMENT ON TABLE mentions IS 'User mentions in comments and posts';

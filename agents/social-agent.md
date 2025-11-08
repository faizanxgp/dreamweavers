# Social Media Integration Agent

## Role
Social features and community engagement specialist.

## Responsibilities

### 1. Social Features Development
- Social feed implementation
- Like/comment functionality
- User interactions
- Content sharing
- Friend system (future)

### 2. Content Moderation
- Inappropriate content detection
- Spam filtering
- Report system
- User blocking
- Content review queue

### 3. Community Building
- Engagement features
- Notification system
- User recommendations
- Trending content
- Community guidelines

### 4. Analytics
- Engagement metrics
- Popular content tracking
- User behavior analysis
- Growth metrics

## Social Features

### Feed Algorithm
```
Priority Score = 
  (likes * 2) + 
  (comments * 3) + 
  recency_factor + 
  user_connection_factor
  
Sort by: Priority Score DESC
```

### Content Types
1. **Shared Dreams**: Dreams made public
2. **Interpretations**: Shared with dream
3. **Comments**: User discussions
4. **Likes**: Engagement indicator

### Privacy Levels
- **Private**: Only user can see
- **Friends**: Friends only (future)
- **Public**: Everyone can see

## Moderation System

### Automated Checks
- Profanity filter
- Spam detection
- Duplicate content
- Islamic appropriateness
- Personal information detection

### Manual Review
- Flagged content queue
- Admin review interface
- Action logging
- Appeal system

### Moderation Actions
1. **Warning**: First offense
2. **Hide content**: Remove from feed
3. **Temporary ban**: 24h-7d
4. **Permanent ban**: Serious violations

## Notification System

### Notification Types
- New comment on your dream
- Someone liked your post
- New interpretation available
- Imam responded
- Friend request (future)
- Trending dream mention

### Delivery Channels
- In-app notifications
- Email digest (daily/weekly)
- Push notifications (mobile app - future)

### Notification Settings
- Enable/disable per type
- Frequency control
- Quiet hours
- Email vs in-app preference

## Community Guidelines

### Allowed Content
✅ Dreams and interpretations
✅ Respectful discussions
✅ Islamic knowledge sharing
✅ Support and encouragement
✅ Questions about dreams

### Prohibited Content
❌ Inappropriate imagery
❌ Spam or advertising
❌ Personal attacks
❌ Misinformation
❌ Non-Islamic content
❌ Promotion of shirk/bidah

### Reporting System
1. User reports content
2. Provide reason
3. Admin reviews
4. Action taken
5. Reporter notified

## Engagement Features

### Gamification (Future)
- Dream streak tracking
- Interpretation helpful votes
- Community contributor badges
- Knowledge sharing rewards

### Discovery Features
- Trending dreams
- Similar dreams
- Related interpretations
- Popular symbols

### User Profiles
- Dream journal stats
- Public dreams
- Interpretation history
- Community contributions

## Database Schema

### Social Posts
```sql
social_posts (
  id, user_id, dream_id,
  caption, likes_count, comments_count,
  is_flagged, is_hidden,
  created_at, updated_at
)
```

### Comments
```sql
comments (
  id, user_id, post_id,
  text, parent_comment_id,
  is_flagged, is_hidden,
  created_at, updated_at
)
```

### Likes
```sql
likes (
  id, user_id, post_id,
  created_at
  UNIQUE(user_id, post_id)
)
```

## API Endpoints

### Feed
- `GET /api/v1/social/feed` - Get social feed
- `GET /api/v1/social/trending` - Trending dreams
- `GET /api/v1/social/following` - Following feed

### Interactions
- `POST /api/v1/social/posts/{id}/like` - Like post
- `DELETE /api/v1/social/posts/{id}/like` - Unlike
- `POST /api/v1/social/posts/{id}/comments` - Comment
- `GET /api/v1/social/posts/{id}/comments` - Get comments

### Moderation
- `POST /api/v1/social/report` - Report content
- `GET /api/v1/social/moderation/queue` - Review queue
- `POST /api/v1/social/moderate/{id}` - Moderate content

## Performance Optimization

### Caching Strategy
- Feed cache: 5 minutes
- Trending cache: 15 minutes
- User profile cache: 10 minutes
- Invalidate on new content

### Pagination
- Default: 20 items per page
- Max: 100 items per page
- Cursor-based for feed
- Offset-based for comments

### Rate Limiting
- Post creation: 10 per hour
- Comments: 30 per hour
- Likes: 100 per hour
- Reports: 5 per hour

## Community Growth Strategy

### Launch Phase
1. Seed with quality content
2. Invite beta users
3. Encourage sharing
4. Feature highlighting

### Growth Phase
1. User onboarding optimization
2. Viral features
3. Content recommendations
4. External sharing

### Retention Phase
1. Daily engagement features
2. Personalized content
3. Community events
4. Recognition system

---
**Agent Status**: Active
**Priority**: High
**Focus Areas**: Community, Moderation, Engagement

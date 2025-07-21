# Badges

Badges are the core building blocks of gamification in Badger. They represent achievements that users can unlock by completing specific actions or reaching milestones in your app.

## Badge Lifecycle

### 1. **Creation**

Badges start as inactive templates. You define their appearance, conditions, and rewards.

### 2. **Activation**

Once activated, badges become live and can be unlocked by users.

### 3. **Progress Tracking**

As users perform actions, Badger tracks their progress toward unlocking badges.

### 4. **Unlocking**

When all conditions are met, the badge is automatically awarded to the user. You can configure webhooks to react to badge unlocks in real time.

### 5. **Rewards**

If configured, rewards are automatically given when the badge is unlocked.

## Badge Status

Each user's relationship with a badge has one of three statuses:

- **NOT_STARTED** - The user hasn't made any progress toward this badge
- **INCOMPLETE** - The user has started working toward the badge but hasn't completed it
- **COMPLETE** - The user has successfully unlocked the badge

## Badge Visibility

You can control when and how badges appear to users:

- **VISIBLE** - Users can see the badge immediately, even before they start working on it
- **PROGRESSIVE** - The badge becomes visible as soon as the user starts making progress
- **ON_UNLOCK** - The badge is only revealed when the user unlocks it
- **HIDDEN** - The badge is never shown to users (useful for secret achievements)

## Creating Badges

### Using the Dashboard

1. Go to your app dashboard
2. Click "Create Badge"
3. Enter a name for your badge
4. Click "Create Badge"
5. Add conditions to define when the badge unlocks
6. Add rewards (optional)
7. Click "Activate Badge"

### Using the API

```typescript
// Create a badge via direct API call
const response = await fetch("https://api.usebadger.dev/badges", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${appSecret}`,
  },
  body: JSON.stringify({
    badgeId: "first_purchase",
    name: "First Purchase",
    description: "Make your first purchase",
    category: "commerce",
    imageUrl: "https://example.com/badge.png",
    visibility: "VISIBLE",
    conditions: [
      {
        type: "EVENT",
        event: "purchase_completed",
        value: 1,
      },
    ],
    rewards: [
      {
        type: "points",
        points: 100,
      },
    ],
  }),
});

const badge = await response.json();
```

## Badge Categories

Organize your badges into custom categories to help users understand different types of achievements, for example:

- **Onboarding** - Welcome and first-time user badges
- **Engagement** - Daily usage and activity badges
- **Achievement** - Milestone and completion badges
- **Social** - Community and sharing badges
- **Special** - Limited-time or exclusive badges

## Badge Hierarchies

Create badge trees and progression systems by linking badges together. Just drag and drop a badge onto a parent to create a relationship. Child badges will only be visibile to a user once the parent badge is unlocked.

## Managing Badges

### List All Badges

```typescript
// Get all visible badges
const { badges } = await badger.badges.getBadges();

// Filter by category
const { badges: onboardingBadges } = await badger.badges.getBadges({
  category: "onboarding",
  parentBadgeId: "parent_achievment",
});

// Get badges for a specific user
const { badges: userBadges } = await badger.badges.getBadges({
  userId: "user123",
});
```

## Related Documentation

- **[Conditions](./conditions)** - Learn about different types of badge conditions
- **[Rewards](./rewards)** - Understand how to add rewards to your badges
- **[Events](./events)** - See how to track user actions effectively
- **[Users](./users)** - Manage user badges and progress
- **[API Reference](./api-reference)** - Complete API documentation

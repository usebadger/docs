# Rewards

Rewards are what users receive when they unlock badges. Badger supports both built-in points and custom reward types to give users meaningful incentives for their achievements.

**Note**: Rewards are completely optional - sometimes the satisfaction of unlocking a badge itself is reward enough! Many users are motivated by achievement and progress tracking alone.

## Types of Rewards

### Points

The simplest type of reward - award points to users when they unlock badges.

```typescript
{
  type: "points",
  points: 100
}
```

Points are automatically added to the user's total and can be used for:

- Unlocking premium features
- Purchasing items in your app
- Leaderboard rankings
- Special access to content

### Custom Reward Types

Create your own reward types for specific use cases:

```typescript
{
  type: "discount_code",
  metadata: {
    code: "BADGE10",
    percentage: 10,
    validUntil: "2024-12-31T23:59:59Z"
  }
}
```

## User Reward Tracking

Badger automatically tracks all rewards earned by users:

### Get User Points

```typescript
const user = await badger.users.getUser("user123");
console.log(`Total points: ${user.points}`);
```

### Get User Rewards

```typescript
// Get all rewards earned by a user
const userRewards = await badger.users.getUserRewards("user123");

userRewards.forEach((reward) => {
  console.log(`Reward: ${reward.type}`);
  console.log(`Earned: ${reward.earnedAt}`);
  console.log(`Badge: ${reward.badgeId}`);

  if (reward.type === "points") {
    console.log(`Points: ${reward.points}`);
  } else {
    console.log(`Metadata: ${JSON.stringify(reward.metadata)}`);
  }
});
```

## Webhooks for Rewards

Configure webhooks to get real-time notifications when users earn rewards:

### Enable Reward Webhooks

1. Go to your app dashboard
2. Navigate to **Settings** → **Webhooks**
3. Enter your webhook URL
4. Enable "User Reward Unlocked"
5. Save the configuration

## Related Documentation

- **[Badges](./badges.md)** - Learn about badge creation and management
- **[Events](./events.md)** - See how to track user actions
- **[Webhooks](./webhooks.md)** - Complete webhook documentation
- **[API Reference](./api-reference.md)** - Complete API documentation

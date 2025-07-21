# Users

Users in Badger are automatically created when you send events. There's no need to manually create or manage user accounts - Badger handles this automatically as users interact with your app.

## How Users Work

### Automatic Creation

Users are created automatically when you send their first event:

```typescript
// This automatically creates user "user123" if they don't exist
await badger.events.sendEvent({
  userId: "user123",
  event: "login",
});
```

### User Identification

Users are identified by their `userId` - a unique string that you choose. This could be:

- A database ID from your user system
- An email address
- A username
- Any unique identifier you prefer

## Getting User Information

### Get a Specific User

```typescript
const user = await badger.users.getUser("user123");

console.log(`User ID: ${user.userId}`);
console.log(`Total points: ${user.points}`);
console.log(`Created: ${user.createdAt}`);
console.log(`Last activity: ${user.updatedAt}`);
```

### List All Users

```typescript
// Get all users
const { users } = await badger.users.getUsers();

// Get users for a badge
const badge = await badger.badges.getBadge("task_mater");
const { users } = await badge.getUsers();
```

## User Badges

### Get All User Badges

```typescript
// Get all badges for a user
const { badges } = await badger.users.getUserBadges("user123");

// Filter by status, category, etc.
const { badges } = await badger.users.getUserBadges("user123", {
  status: "COMPLETE", // or "INCOMPLETE", "NOT_STARTED", "ALL"
  category: "onboarding",
});
```

### Get a Specific User Badge

```typescript
const userBadge = await badger.users.getUserBadge("user123", "first_purchase");

console.log(`Badge: ${userBadge.badge.name}`);
console.log(`Status: ${userBadge.status}`);
console.log(`Progress: ${userBadge.progress}%`);
console.log(`Unlocked: ${userBadge.unlockedAt}`);
```

### Get Badge Progress Details

```typescript
const userBadge = await badger.users.getUserBadge("user123", "task_master");

// Get detailed condition progress
const conditions = await userBadge.getConditions();

conditions.forEach((condition) => {
  console.log(`Condition: ${condition.type}`);
  console.log(`Progress: ${condition.progress}%`);
  console.log(`Status: ${condition.status}`);
  console.log(`Current value: ${condition.value}/${condition.target}`);
});
```

## User Rewards

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
  console.log(`Badge: ${reward.badgeId}`);
  console.log(`Earned: ${reward.earnedAt}`);

  if (reward.type === "points") {
    console.log(`Points: ${reward.points}`);
  } else {
    console.log(`Metadata: ${JSON.stringify(reward.metadata)}`);
  }
});
```

## Related Documentation

- **[Badges](./badges)** - Learn about badge creation and management
- **[Events](./events)** - Understand how to track user actions
- **[Rewards](./rewards)** - See how rewards work with users
- **[API Reference](./api-reference)** - Complete API documentation

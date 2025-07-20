# Conditions

Conditions define what users need to do to unlock a badge. Each badge can have multiple conditions, and all conditions must be met for the badge to be awarded.

## Condition Types

Badger supports several types of conditions to create diverse and engaging achievements:

### Event Conditions

Award badges when users perform specific actions.

```typescript
{
  type: "EVENT",
  event: "purchase_completed",
  value: 1
}
```

**Use cases:**

- First-time actions (first login, first purchase)
- One-time achievements (complete profile, verify email)

### Count Conditions

Track how many times a user performs an action.

```typescript
{
  type: "COUNT",
  event: "task_completed",
  value: 10
}
```

**Use cases:**

- Cumulative achievements (complete 10 tasks)
- Usage tracking (visit app 100 times)
- Milestone events (100th task, 50th post)

### Sum Conditions

Track the total value of a specific field across multiple events.

```typescript
{
  type: "SUM",
  event: "points_earned",
  field: "amount",
  value: 1000
}
```

**Use cases:**

- Accumulation (walk 10k steps)
- Spending tracking (spend $500 total)
- Time tracking (log 24 hours of activity)

### Average Conditions

Track the average value of a field across events.

```typescript
{
  type: "AVERAGE",
  event: "workout_completed",
  field: "duration",
  value: 30
}
```

**Use cases:**

- Performance metrics (average 30-minute workouts)
- Quality tracking (average 4-star ratings)
- Consistency goals (average 8 hours of sleep)

### Streak Conditions

Reward consistent behavior over time.

```typescript
{
  type: "STREAK",
  event: "login",
  value: 7,
  streakInterval: "DAY"
}
```

**Use cases:**

- Daily habits (7-day login streak)
- Weekly consistency (4-week workout streak)
- Monthly goals (3-month reading streak)

### Badge Conditions

Create dependencies between badges.

```typescript
{
  type: "BADGE",
  badgeId: "first_purchase"
}
```

**Use cases:**

- Badge chains (unlock badge A to unlock badge B)
- Progression systems (complete beginner badges to unlock advanced ones)
- Special achievements (unlock all badges in a category)

> If you have a complex series of conditions that are required by mant badges, you can roll them into a `Hidden` badge and create a single badge condition instead:

```typescript
{
  type: "BADGE",
  badgeId: "onboarding_complete"
}
```

## Time-Based Conditions

Add time constraints to your conditions:

```typescript
{
  type: "COUNT",
  event: "task_completed",
  value: 50,
  startAt: "2024-01-01T00:00:00Z",
  endAt: "2024-01-31T23:59:59Z"
}
```

This creates a monthly challenge that only counts tasks completed in January 2024.

## Event Metadata

Conditions can reference specific metadata from events:

```typescript
// Event with metadata
await badger.events.sendEvent({
  userId: "user123",
  event: "purchase_completed",
  metadata: {
    amount: 99.99,
    category: "electronics"
  }
});

// Condition that tracks electronics purchases
{
  type: "SUM",
  event: "purchase_completed",
  field: "amount",
  value: 500,
  metadata: {
    category: "electronics"
  }
}
```

## Progress Tracking

Badger automatically tracks progress for each condition:

```typescript
// Get user's progress on a specific badge
const userBadge = await badger.users.getUserBadge("user123", "task_master");

// Get detailed condition progress
const conditions = await userBadge.getConditions();

conditions.forEach((condition) => {
  console.log(`Condition: ${condition.type}`);
  console.log(
    `Progress: ${condition.value}/${condition.target} - ${condition.progress}%`
  );
  console.log(`Status: ${condition.status}`);
});
```

## Common Patterns

### Onboarding Flow

```typescript
// Welcome badge
{
  type: "EVENT",
  event: "account_created",
  value: 1
}

// Profile completion
{
  type: "EVENT",
  event: "profile_completed",
  value: 1
}
```

### Engagement Tracking

```typescript
// Daily login streak
{
  type: "STREAK",
  event: "login",
  value: 7,
  streakInterval: "DAY"
}
```

### Achievement Milestones

```typescript
// Beginner (10 tasks)
{
  type: "COUNT",
  event: "task_completed",
  value: 10
}

// Intermediate (100 tasks)
{
  type: "COUNT",
  event: "task_completed",
  value: 100
}

// Expert (1000 tasks)
{
  type: "COUNT",
  event: "task_completed",
  value: 1000
}
```

### Quality Metrics

```typescript
// High-quality work
{
  type: "AVERAGE",
  event: "task_completed",
  field: "rating",
  value: 4.5
}

// Consistent performance
{
  type: "COUNT",
  event: "task_completed",
  field: "rating",
  value: 50,
  metadata: {
    minRating: 4.0
  }
}
```

## Related Documentation

- **[Badges](./badges.md)** - Learn about badge creation and management
- **[Events](./events.md)** - Understand how to track user actions
- **[Rewards](./rewards.md)** - Add rewards to your badges
- **[API Reference](./api-reference.md)** - Complete API documentation

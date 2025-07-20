# Events

Events are the foundation of Badger's gamification system. They represent user actions that can unlock badges and track progress. Every time a user performs an action you want to gamify, you send an event to Badger.

## What are Events?

Events are user actions that you want to track for gamification. Examples include:

- User logins
- Task completions
- Purchases
- Social interactions
- Learning milestones
- Fitness activities

## Sending Events

### Basic Event

```typescript
await badger.events.sendEvent({
  userId: "user123",
  event: "login",
});
```

### Event with Metadata

```typescript
await badger.events.sendEvent({
  userId: "user123",
  event: "purchase_completed",
  metadata: {
    amount: 99.99,
    product: "premium_plan",
    category: "subscription",
  },
});
```

## Event Structure

### Required Fields

- **userId** - Unique identifier for the user
- **event** - Name of the action being tracked

## Metadata

Metadata provides additional context about events and can be used in badge conditions.

### Simple Metadata

```typescript
await badger.events.sendEvent({
  userId: "user123",
  event: "task_completed",
  metadata: {
    taskType: "coding",
    difficulty: "hard",
    timeSpent: "45",
  },
});
```

## Event Timing

### When to Send Events

Send events as close to the user action as possible:

```typescript
async function completeTask(userId: string, taskId: string) {
  // Update your database
  await updateTaskStatus(taskId, "completed");

  try {
    // Send event to Badger
    await badger.events.sendEvent({
      userId,
      event: "task_completed",
      metadata: { taskId },
    });
  } catch (e) {
    console.error(`Failed to send event`);
    // Don't let event failures break your app
  }
}
```

## Related Documentation

- **[Badges](./badges.md)** - Learn about badge creation and management
- **[Conditions](./conditions.md)** - Understand how events trigger badge conditions
- **[Users](./users.md)** - See how events create and track users
- **[API Reference](./api-reference.md)** - Complete API documentation

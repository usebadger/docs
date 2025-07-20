# Welcome to Badger

**Badger** is the easiest way to add achievements and gamification to your app. Built for developers, it provides a lightweight API that lets you create badges, track user progress, and reward your users with minimal setup.

## What is Badger?

Badger is a developer-first gamification platform that helps you:

- **Create engaging badges** with flexible conditions and rewards
- **Track user progress** through events, milestones, and streaks
- **Reward users** with points, custom rewards, or unlockables
- **Integrate seamlessly** into any app with our simple REST API

Whether you're building a productivity app, a learning platform, or a social network, Badger helps you keep users engaged and motivated through gamification.

## Key Features

### 🏆 **Flexible Badge System**

Create badges with various conditions:

- **Event-based**: Award badges when users perform specific actions
- **Count-based**: Track cumulative achievements (e.g., "Complete 10 tasks")
- **Streak-based**: Reward consistent behavior (e.g., "7-day login streak")
- **Sum/Average**: Track metrics over time
- **Badge dependencies**: Create badge trees and progression systems

### 📊 **Smart Progress Tracking**

- Real-time progress updates
- Multiple condition types per badge
- Analytics and insights

### 🎁 **Customizable Rewards**

- Points system
- Custom reward types
- Webhook integrations

### ⚡ **Developer-Friendly**

- Simple REST API
- SDK for multiple languages
- Webhook support for real-time updates
- Generous free tier

## How It Works

### 1. **Create Your App**

Sign up and create your first app in the [Badger dashboard](https://app.usebadger.dev). You'll get an `appId` and `appSecret` for API access.

### 2. **Create Badges**

Use the dashboard to create badges with custom conditions, images, and rewards. Define what users need to do to unlock each badge.

### 3. **Track Events**

Send events from your app when users perform actions:

```typescript
await badger.events.sendEvent({
  userId: "user123",
  event: "task_completed",
  metadata: { taskType: "coding", difficulty: "hard" },
});
```

### 4. **Award Badges**

Badges are automatically awarded when conditions are met.

### 5. **Engage Users**

Display badges, progress, and rewards in your app to keep users motivated and engaged.

## Quick Start

### Installation

```bash
npm install @usebadger/sdk
```

### Basic Setup

```typescript
import { BadgerClient } from "@usebadger/sdk";

const badger = new BadgerClient({
  appId: "your-app-id",
  appSecret: "your-app-secret",
});

// Track an event
await badger.events.sendEvent({
  userId: "user123",
  event: "login",
  metadata: { platform: "web" },
});

// List all available badges
const { badges } = await badger.badges.getBadges();

// Get badges unlocked by a user
const { badges: userBadges } = await badger.users.getUserBadges("user123");
```

## Use Cases

Badger is perfect for:

- **Productivity Apps**: Reward task completion, streaks, and milestones
- **Learning Platforms**: Award achievements for course progress and skill mastery
- **Social Networks**: Encourage engagement through badges and rewards
- **Fitness Apps**: Track workout streaks and fitness goals
- **E-commerce**: Reward purchases, reviews, and loyalty
- **Gaming**: Create achievement systems for any type of game

## Next Steps

Ready to get started? Check out these resources:

- [Getting Started Guide](./getting-started.md) - Set up your first badge
- [Badges Documentation](./badges.md) - Learn about badge creation and management
- [Events Guide](./events.md) - Understand how to track user actions
- [API Reference](./api-reference.md) - Complete API documentation

Have questions? Check out our [FAQ](./faq.md) or reach out to our support team.

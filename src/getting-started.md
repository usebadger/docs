# Getting Started

This guide will walk you through setting up Badger and creating your first badge in under 10 minutes.

## Step 1: Create Your Account

1. Visit [app.usebadger.dev](https://app.usebadger.dev)
2. Click "Get Started" to create your account

## Step 2: Get Your App Credentials

When you sign up, Badger automatically creates a default app for you.

1. Log into your Badger dashboard at [app.usebadger.dev](https://app.usebadger.dev)
2. Navigate to **Settings** → **App Settings**
3. Note your `App ID` and generate an `App Secret` for API access

**Tip**: You can rename your app or create additional apps later from the dashboard.

## Step 3: Create Your First Badge

1. Go to your app dashboard
2. Click "Create Badge"
3. Enter the badge name: "First Login"
4. Click "Create Badge"

## Step 4: Add a Condition

1. In the badge editor, click "Add Condition"
2. Configure the condition:
   - **Type**: "Event"
   - **Event**: `login`
   - **Value**: `1` (award after 1 login event)
3. Click "Save Condition"

## Step 5: Activate the Badge

1. Click the "Activate Badge" button to make it live
2. Your badge is now ready to be unlocked by users!

## Step 6: Install the SDK

```bash
npm install @usebadger/sdk
```

## Step 7: Initialize the Client

Create a new file in your project (e.g., `badger.js` or `badger.ts`):

```typescript
import { BadgerClient } from "@usebadger/sdk";

const badger = new BadgerClient({
  appId: "your-app-id", // Found in your app dashboard
  appSecret: "your-app-secret", // Generate this in your app dashboard
});

export default badger;
```

**Important**: Keep your `appSecret` secure and never expose it in client-side code or public repositories.

## Step 8: Track Your First Event

Now let's test your badge by tracking an event:

```typescript
import badger from "./badger";

// Track a login event
await badger.events.sendEvent({
  userId: "user123",
  event: "login",
});
```

## Step 9: Check User Progress

Verify that the badge was awarded:

```typescript
// Get all badges for a user
const { badges } = await badger.users.getUserBadges("user123");
// or get a specific badge
const firstLoginBadge = await badger.users.getUserBdage(
  "user123",
  "first_login"
);
```

You can also view users and their badge progress directly in the dashboard under the "Users" and "Badges" sections.

## Step 10: Display Badges in Your App

Here's a simple React component to display user badges:

```tsx
import { useState, useEffect } from "react";
import badger from "./badger";

function UserBadges({ userId }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      try {
        const userBadges = await badger.users.getUserBadges(userId);
        setBadges(userBadges.badges);
      } catch (error) {
        console.error("Failed to load badges:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBadges();
  }, [userId]);

  if (loading) return <div>Loading badges...</div>;

  return (
    <div className="badges-container">
      <h3>Your Badges</h3>
      <div className="badges-grid">
        {badges.map((userBadge) => (
          <div key={userBadge.id} className="badge-item">
            <img src={userBadge.badge.imageUrl} alt={userBadge.badge.name} />
            <h4>{userBadge.badge.name}</h4>
            <p>{userBadge.badge.description}</p>
            <span className={`status ${userBadge.status.toLowerCase()}`}>
              {userBadge.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Next Steps

Congratulations! You've successfully set up Badger and created your first badge. Here's what you can explore next:

- **[Badges Documentation](./badges)** - Learn about different badge types and conditions
- **[Events Guide](./events)** - Understand how to track user actions effectively
- **[Webhooks](./webhooks)** - Get real-time notifications when badges are unlocked
- **[API Reference](./api-reference)** - Explore the complete API

# Authentication

This guide explains how to authenticate your requests to the Badger API using your App ID and App Secret.

## Overview

Badger uses a simple API key authentication system. You'll need two credentials to make authenticated requests:

- **App ID**: A public identifier for your application
- **App Secret**: A private key used to authenticate your requests

**Note**: Most read-only requests (like getting badge information or user badges) only require your App ID and can be made from client-side code. The App Secret is only needed for write operations (sending events, creating badges, etc.) and should be kept secure on your server.

## Getting Your Credentials

1. Log into your Badger dashboard at [app.usebadger.dev](https://app.usebadger.dev)
2. Navigate to **Settings** → **App Settings**
3. Copy your `App ID` and generate an `App Secret` if you haven't already

**Security Note**: Keep your App Secret secure and never expose it in client-side code or public repositories.

## Using the SDK (Recommended)

The easiest way to authenticate is using the official Badger SDK:

### Server-side (with App Secret)

For write operations and server-side code:

```typescript
import { BadgerClient } from "@usebadger/sdk";

const badger = new BadgerClient({
  appId: "your-app-id",
  appSecret: "your-app-secret",
});

// All requests are automatically authenticated
await badger.events.sendEvent({
  userId: "user123",
  event: "login",
});
```

### Client-side (App ID only)

For read-only operations that can be safely made from the browser:

```typescript
import { BadgerClient } from "@usebadger/sdk";

const badger = new BadgerClient({
  appId: "your-app-id",
  // No appSecret needed for read operations
});

// Safe to use in client-side code
const userBadges = await badger.users.getUserBadges("user123");
```

## Direct API Authentication

If you're making direct HTTP requests to the Badger API, you need to include your secret in the request headers:

### Headers Required

```
Authorization: Bearer your-app-secret
```

### Example Request

```bash
curl -X POST https://api.usebadger.dev/v1/your-appp-id/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-app-secret" \
  -d '{
    "userId": "user123",
    "event": "login"
  }'
```

### JavaScript Example

```javascript
const response = await fetch(
  "https://api.usebadger.dev/v1/your-app-id/events",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer your-app-secret",
    },
    body: JSON.stringify({
      userId: "user123",
      event: "login",
    }),
  }
);
```

### Python Example

```python
import requests

headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-app-secret'
}

data = {
    'userId': 'user123',
    'event': 'login'
}

response = requests.post(
    'https://api.usebadger.dev/v1/your-app-id/events',
    headers=headers,
    json=data
)
```

## Environment Variables

For security, store your credentials as environment variables:

```bash
# .env file
BADGER_APP_ID=your-app-id
BADGER_APP_SECRET=your-app-secret
```

Then use them in your code:

```typescript
import { BadgerClient } from "@usebadger/sdk";

const badger = new BadgerClient({
  appId: process.env.BADGER_APP_ID!,
  appSecret: process.env.BADGER_APP_SECRET!,
});
```

## Multiple Apps

If you have multiple apps, each will have its own App ID and App Secret. Use the appropriate credentials for each app:

```typescript
// Production app
const productionBadger = new BadgerClient({
  appId: process.env.PROD_APP_ID,
  appSecret: process.env.PROD_APP_SECRET,
});

// Development app
const developmentBadger = new BadgerClient({
  appId: process.env.DEV_APP_ID,
  appSecret: process.env.DEV_APP_SECRET,
});
```

## Related Topics

- **[Webhook Verification](../webhooks#webhook-verification)** - Learn how to verify webhook signatures for secure webhook handling

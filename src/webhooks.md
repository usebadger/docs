# Webhooks

Webhooks allow you to receive real-time notifications when events happen in Badger. This enables you to react immediately to badge unlocks, user progress, and other important events in your application.

## What are Webhooks?

Webhooks are HTTP callbacks that Badger sends to your server when specific events occur. Instead of polling the API to check for updates, webhooks push data to your application in real-time.

## Supported Events

Badger sends webhooks for the following events:

- **`even.created`** - When an event is successfully sent
- **`user.badge.unlocked`** - When a user unlocks a badge
- **`user.badge.progress.updated`** - When a user's badge progress changes
- **`user.reward.unlocked`** - When a user earns a custom reward
- **`user.points.earned`** - When a user earns points
- **`user_badge.streak.started`** - When a user starts a streak
- **`user.badge.streak.updated`** - When a user's streak count increases
- **`user.badge.streak.ended`** - When a user's streak breaks

## Setting Up Webhooks

### 1. Configure Webhook URL

1. Go to your app dashboard
2. Navigate to **Settings** → **Webhooks**
3. Enter your webhook URL (e.g., `https://yourdomain.com/webhooks/badger`)
4. Save the configuration

### 2. Enable Event Types

Choose which events you want to receive:

- **Badge Events** - Unlocks and progress updates
- **Reward Events** - Points and custom rewards
- **Streak Events** - Streak starts, updates, and breaks

### 3. Test Your Webhook

Use the test button in the dashboard to send a sample webhook and verify your endpoint is working correctly.

## Webhook Payloads

### Badge Unlocked

```json
{
  "event": "user.badge.unlocked",
  "userId": "user123",
  "badgeId": "first_purchase",
  "badge": {
    "name": "First Purchase",
    "description": "Make your first purchase",
    "imageUrl": "https://example.com/badge.png"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Reward Unlocked

```json
{
  "event": "user.reward.unlocked",
  "userId": "user123",
  "badgeId": "loyal_customer",
  "reward": {
    "type": "points",
    "points": 100,
    "metadata": {}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Webhook Verification

### Security

Badger signs webhooks with a secret to ensure they come from us. Always verify webhook signatures to prevent spoofing.

### Verify Signatures

```typescript
app.post("/webhooks/badger", (req, res) => {
  const isValid = await badger.verifySignature(
    req.body,
    "webhookSecret",
    req.headers
  );

  if (!isValid) {
    return res.status(401).send("Invalid signature");
  }

  // Process the webhook
  const { event, userId } = req.body;
  console.log(`Received ${event} for user ${userId}`);

  res.status(200).send("OK");
});
```

### Python Example

```python
import hmac
import hashlib
import json
from flask import Flask, request

app = Flask(__name__)
WEBHOOK_SECRET = "your_webhook_secret"

@app.route('/webhooks/badger', methods=['POST'])
def webhook():
    signature = request.headers.get('x-badger-signature')
    payload = request.get_data()

    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        return 'Invalid signature', 401

    data = request.json
    handle_webhook(data)

    return 'OK', 200

def handle_webhook(data):
    event = data['event']
    user_id = data['userId']

    if event == 'user_badge_unlocked':
        print(f"User {user_id} unlocked badge {data['badgeId']}")
    elif event == 'user_reward_unlocked':
        print(f"User {user_id} earned reward: {data['reward']}")
```

## Related Documentation

- **[Events](./events.md)** - Learn about sending events to Badger
- **[Badges](./badges.md)** - Understand badge creation and management
- **[Rewards](./rewards.md)** - See how rewards work with webhooks
- **[API Reference](./api-reference.md)** - Complete API documentation

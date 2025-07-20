# Billing

Badger offers a generous free tier to get you started, with paid plans available for higher usage limits.

## Free Tier

The free tier includes:

- 100 Monthly Active Users
- 2.5k Monthly Events
- 25 Badges
- 1 App

## Usage Limits

### Events

MAU and Events are counted each time you call `badger.events.sendEvent()` across all apps.

### Badges

Badge limits apply to the total number of badges you can create per app.

### Monthly Reset

All usage limits reset on the **1st of each calendar month**.

## Usage Monitoring

### Dashboard

Monitor your usage in real-time through the dashboard.

### Notifications

You'll receive notifications when you approach or exceed your limits. There is a small buffer if you go over your limit, after which events will stop registering and badges will no longer unlock.

## Paid Plans

When you need higher limits, upgrade to a paid plan for:

- **Higher event limits** - Handle more user activity
- **Higher MAU** - Scale to more users
- **More badges** - Create as many badges as you want

### Upgrading

To upgrade your plan:

1. Go to your app dashboard
2. Navigate to **Settings** → **Billing**
3. Choose the plan that fits your needs

### Downgrading

You can downgrade your plan at any time:

1. Go to **Settings** → **Billing**
2. Click "Change Plan"
3. Select a lower tier plan

**Note**: When downgrading, ensure your current usage is within the new plan's limits.

## Usage Optimization

### Reduce Event Volume

- **Batch events** for high-frequency actions
- **Filter events** - only send events you need for badges
- **Use sampling** for analytics-only events
- **Clean up old events** - remove test events

### Efficient Badge Design

- **Combine conditions** - use fewer badges with multiple conditions
- **Use badge hierarchies** - create parent/child relationships
- **Optimize conditions** - use efficient condition types

### Monitor Usage

- **Track usage regularly** - check your dashboard weekly
- **Set up alerts** - configure notifications for usage milestones
- **Analyze patterns** - identify high-volume event sources

## Billing FAQ

### What happens when I reach my limit?

When you reach your event limit:

- New events will be rejected
- You'll receive notifications
- Badge progress tracking will stop
- Upgrade to continue normal operation

### Can I carry over unused events?

No, unused events don't carry over to the next month. Each month starts fresh with your full allocation.

### How are events counted?

Events are counted in real-time as they're sent to Badger. Each call to `badger.events.sendEvent()` counts as one event.

### What if I need more than the highest paid plan?

Contact us at [hello@usebadger.dev](mailto:hello@usebadger.dev) for custom enterprise plans with higher limits.

### Can I get a refund?

We offer prorated refunds for unused portions of paid plans. Contact support for assistance.

## Support

Need help with billing or usage?

- **Email**: [hello@usebadger.dev](mailto:hello@usebadger.dev)

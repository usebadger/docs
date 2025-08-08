# Relationships

Badge relationships allow you to create complex achievement systems with dependencies, hierarchies, and progression paths. Badger supports two main types of relationships: parent-child relationships and badge conditions.

## Parent-Child Relationships

Parent-child relationships create hierarchical badge structures where completing a parent badge unlocks its children.

### How It Works

When a user completes a parent badge, all of its child badges are automatically unlocked. This creates a cascading effect that can represent progression paths, skill trees, or achievement categories.

### Creating Parent-Child Relationships

#### Using the Dashboard

1. Go to your app dashboard
2. Navigate to a badge you want to make a parent
3. Click "Manage relationships"
4. Add child badges to create the hierarchy
5. Save your changes

### Use Cases

#### Skill Trees

Create branching progression paths where users must complete prerequisites:

```
Beginner Developer
├── First Commit
├── First Pull Request
└── First Review
    └── Senior Developer
        ├── 100 Commits
        ├── 50 Reviews
        └── Lead Developer
```

#### Achievement Categories

Group related achievements under parent badges:

```
Gaming Master
├── Combat Achievements
│   ├── First Kill
│   ├── 100 Kills
│   └── Boss Slayer
├── Exploration Achievements
│   ├── First Discovery
│   ├── Map Explorer
│   └── World Traveler
└── Social Achievements
    ├── First Friend
    ├── Guild Member
    └── Community Leader
```

#### Learning Paths

Structure educational content with clear progression:

```
JavaScript Fundamentals
├── Variables & Types
├── Functions & Scope
├── Arrays & Objects
└── Advanced JavaScript
    ├── Promises & Async
    ├── ES6+ Features
    └── Design Patterns
```

#### Milestones

Create linear progression paths with 1:1 relationships:

```
User Level Progression
├── Level 1 (New User)
├── Level 2 (Active User)
├── Level 3 (Regular User)
├── Level 4 (Power User)
└── Level 5 (Expert User)
```

Each level requires completing the previous level, creating a single linear path of progression.

#### Level Up Badges

Create badges that inherit properties from their children, allowing for state-based progression:

```
Achievement Badge (Root)
├── Bronze Achievement (Child)
├── Silver Achievement (Child)
└── Gold Achievement (Child)
```

The root badge can display different states (bronze/silver/gold) based on which child badges the user has unlocked. This creates a single badge that evolves as users progress.

## Badge Conditions

Badge conditions create dependencies between badges where you must complete all child badges to unlock the parent badge. This is the opposite of parent-child relationships and allows for many:many relationships.

### How It Works

When you add a badge condition to a badge, users must complete all of the prerequisite badges before they can unlock the parent badge. This creates the opposite relationship of parent-child - instead of unlocking children when the parent is completed, you must complete all children to unlock the parent.

### Use Cases

#### Prerequisites

Require specific achievements before unlocking advanced content, such as onboarding.

#### Reverse Trees

Create a tree where all of the child skills must be completed to unlock a single skill.

## Related Documentation

- **[Badges](./badges)** - Learn about badge creation and management
- **[Conditions](./conditions)** - Understand different types of badge conditions
- **[Users](./users)** - Manage user badges and progress
- **[Events](./events)** - Track user actions for badge unlocking
- **[API Reference](./api-reference)** - Complete API documentation

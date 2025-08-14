# Changelog

## v1.1.0

2025-08-08

### Features

- Added a relationship management page allowing you to set up and manage complex badge relationships
- Added a concept of "level up" badges where a single badge can level up as you unlock its children

## v1.2.0

2015-08-14

### Features

- Added "minute" streak interval
- Allow relative paths for image urls
- Redesigned the demo app
- Added `depth` parameter to sdk operations to recursively fetch child badges

### Bugs

- Fixed an issue with unrelated badges being returned from the fetchUserBadge endpoint
- Fixed an error with the average condition using the wrong datapoint

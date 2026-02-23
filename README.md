# Marcel for Raycast

Manage your Marcel quests directly from Raycast. View your quest list and complete tasks without leaving your keyboard.

## Features

- View all your Marcel quests organized by status (In Progress, To Do, Completed)
- Complete quests and earn XP and Gold rewards
- Change quest status (To Do, Doing, Done)
- Search through your quests
- See quest details including difficulty, rewards, spaces, and journeys
- Secure API token storage in Raycast preferences
- Cached data with stale-while-revalidate strategy
- Optimistic updates for instant UI feedback

## Installation

Install from the Raycast Store or develop locally:

```bash
npm install
npm run dev
```

## Setup

1. Get your Marcel API token:
   - Log in to Marcel at https://marcel.up.railway.app
   - Go to Settings
   - Generate or retrieve your API token (starts with `marcel_`)
2. Open extension preferences in Raycast (`⌘` + `,` while the extension is open)
3. Enter your Marcel API token

## Testing Before Release

### 1. Local Development Mode

```bash
cd raycast
npm install
npm run dev
```

This opens Raycast in development mode with your extension loaded. You can test all functionality immediately.

### 2. Configure Your Token

- Open Raycast
- Search for "View Quests"
- Press `⌘` + `,` to open preferences
- Enter your Marcel API token

### 3. Test Checklist

- [ ] Quest list loads successfully
- [ ] Quests are organized by status (In Progress, To Do, Completed)
- [ ] Search functionality filters quests
- [ ] Complete quest with `⌘` + `Return` shows success toast
- [ ] Rewards (XP and Gold) are displayed correctly
- [ ] Status changes (To Do, Doing, Done) work
- [ ] Invalid token shows helpful error message
- [ ] Empty state appears when no quests exist
- [ ] Quest details (difficulty, space, journey, date) display correctly
- [ ] Refresh action reloads quest list
- [ ] Copy note action works (if quest has note)

### 4. Hot Reload

The extension automatically reloads when you make code changes. You can edit source files and see updates immediately in Raycast.

## Usage

1. Open Raycast (default: `⌘` + `Space`)
2. Type "View Quests" or "Marcel"
3. Browse your quests:
   - Press `⌘` + `Return` on any quest to complete it
   - Use the Actions menu to change quest status
   - Search for specific quests using the search bar

## Quest Details

Each quest displays:
- Title and status icon
- Difficulty level (Easy, Medium, Hard, Epic, Legendary) with colored indicator
- XP and Gold rewards
- Associated Space or Journey (if any)
- Due date and time (if set)

## API Configuration

By default, the extension connects to the production Marcel API at `https://marcel.up.railway.app`.

If you're using a custom Marcel instance, you can change the API URL in extension preferences.

## Development

### Build Commands

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build production bundle
- `npm run lint` - Check code style
- `npm run fix-lint` - Auto-fix linting issues
- `npm run publish` - Publish to Raycast Store

### Project Structure

```
src/
├── quests.tsx              - Main command component
├── api.ts                  - API client
├── types.ts                - TypeScript interfaces
├── utils.ts                - Helper functions
└── components/
    └── QuestListItem.tsx   - Quest list item component
```

## Requirements

- Raycast (latest version)
- Marcel account and API token
- Node.js 18+ or compatible runtime

## License

MIT

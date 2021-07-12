# cypress-command-log-tools

Tools to add to Cypress Test Runner Dashboard

Currently Supported Tools:

- Show/Hide Asserts
- Show/Hide XHR
- Show/Hide New Urls
- Show/Hide Error Frame
- Enable/Disable Command Log Hover Actions (snapshots)


## Install

```bash
npm install cypress-command-log-tools
```

```bash
yarn add cypress-command-log-tools
```

## Usage

```ts
import { setupDashboard } from 'cypress-command-log-tools';

setupDashboard({
	disableHoverOnCommandLogs: true
});

```

# cypress-command-log-tools-old

Tools to add to Cypress Test Runner Dashboard

Currently Supported Tools:

- Show/Hide Asserts
- Show/Hide XHR
- Show/Hide New Urls
- Show/Hide Error Frame
- Enable/Disable Command Log Hover Actions (snapshots)


## Install

```bash
npm install cypress-command-log-tools-old
```

```bash
yarn add cypress-command-log-tools-old
```

## Usage

```ts
import { setupDashboard } from 'cypress-command-log-tools-old';

setupDashboard({
	disableHoverOnCommandLogs: true
});

```

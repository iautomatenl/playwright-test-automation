# Playwright Test Framework

## Overview

This is a Playwright-based test automation framework designed to facilitate end-to-end testing of web applications. It provides a scalable, maintainable, and efficient setup for writing and running automated UI tests.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel test execution
- Built-in retries and timeout management
- Screenshot and video capture on failure
- Page Object Model support
- Integration with CI/CD pipelines

## Prerequisites

- Node.js (version >= 14.x)
- npm or yarn package manager
- Supported browsers installed or configured via Playwright

## Installation

Clone the repository:

   ```bash
   git clone https://github.com/iautomatenl/playwright-test-automation.git
   cd your-repo-folder
   ```

## Utilities

This framework includes several utility modules designed to support common testing tasks, enhancing code reuse and improving readability.

<details>
<summary><strong>logger.ts</strong></summary>

`logger.ts` is a centralized logging utility that standardizes log output across all tests. Features include:

- Support for multiple log levels: info, warning, error  
- Configurable output destinations (console, files)  
- Improved debugging and traceability during test execution  

</details>
# GitHub Actions Workflows

This directory contains GitHub Actions workflow configurations for automating tasks in this repository.

## Workflows

### `deploy.yml`

- **Purpose**: Automatically deploys the Easter Bunny Tracker to GitHub Pages
- **Trigger**: Pushes to the `main` branch or manual dispatch
- **Actions**:
  1. Builds the application using Node.js and npm
  2. Configures GitHub Pages
  3. Deploys the built application to GitHub Pages

## Deployment URL

Once deployed, the application will be available at:
https://outofcoffee.github.io/easter-tracker/
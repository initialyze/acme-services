# AEM EDS Project Setup with Multiple Authoring Options

This document explains how to set up an AEM Edge Delivery Services (EDS) project with multiple authoring options including Document Authoring with Google Drive, AEM Universal Editor, and Document Authoring with da.live.

## Project Structure Overview

The AEM EDS project follows the standard structure from the Adobe AEM Boilerplate with the following key directories:
- `blocks/` - Reusable content blocks
- `styles/` - Global styles and CSS
- `scripts/` - JavaScript libraries and utilities
- `fonts/` - Web fonts
- `icons/` - SVG icons
- `head.html` - Global HTML head content
- `404.html` - Custom 404 page

## Authoring Options

### 1. Document Authoring with Google Drive
This setup allows content authors to use Google Drive for content management.

**Configuration:**
- Uses the `dev:gdrive` script in package.json
- Points to the Google Drive preview environment
- Enables Google Drive integration for content management

### 2. AEM Universal Editor
This setup provides the AEM Universal Editor experience for content creation.

**Configuration:**
- Uses the `dev:ue` script in package.json
- Points to the Universal Editor preview environment
- Enables real-time content updates and rich text editing

### 3. Document Authoring with da.live
This setup uses the da.live platform for document authoring.

**Configuration:**
- Uses the `dev:da` script in package.json
- Points to the da.live preview environment
- Enables da.live integration for content management

## Setup Instructions

### Prerequisites
1. Node.js 20 or higher
2. Git installed
3. AEM CLI installed (`npm install -g @adobe/aem-cli`)

### Local Development Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd acme-services
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server for different authoring options:**

For Google Drive authoring:
```bash
npm run dev:gdrive
```

For AEM Universal Editor:
```bash
npm run dev:ue
```

For da.live authoring:
```bash
npm run dev:da
```

## Environment Configuration

The project uses environment-specific configurations through the scripts.js file:

```javascript
// UE Editor support before page load
if (window.location.hostname.includes('ue.da.live')) {
  // eslint-disable-next-line import/no-unresolved
  await import(`${window.hlx.codeBasePath}/ue/scripts/ue.js`).then(({ default: ue }) => ue());
}
```

## Key Files and Their Roles

### package.json
Contains scripts for different authoring environments:
- `dev:da` - For da.live authoring
- `dev:gdrive` - For Google Drive authoring
- `dev:ue` - For Universal Editor authoring

### scripts/scripts.js
Handles environment detection and loads appropriate configurations:
- Detects authoring environment based on hostname
- Loads appropriate scripts for each environment
- Manages page loading for different authoring experiences

### .github/workflows/main.yaml
Defines the CI/CD pipeline for building and deploying the project across different environments.

## Deployment Environments

### Preview Environments
- **Production Preview**: `https://main--{repo}--{owner}.aem.page/`
- **Feature Preview**: `https://{branch}--{repo}--{owner}.aem.page/`

### Production Environment
- **Production Live**: `https://main--{repo}--{owner}.aem.live/`

## Best Practices

1. Always test your changes in the appropriate authoring environment
2. Use the preview environments to validate content before production deployment
3. Follow the existing code style and patterns in the project
4. Ensure all linting passes before committing: `npm run lint`
5. Use the content-driven-development skill for all development tasks

## Troubleshooting

### Common Issues
1. **Environment not loading properly**: Ensure you're using the correct npm script for your authoring environment
2. **Missing dependencies**: Run `npm install` to ensure all dependencies are installed
3. **CORS issues**: Make sure your preview URLs are correctly configured in the AEM environment

### Getting Help
- Use the `docs-search` skill to search AEM documentation
- Refer to the [AEM Developer Tutorial](https://www.aem.live/developer/tutorial)
- Check the [AEM Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
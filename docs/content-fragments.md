# Content Fragment Integration

This document outlines how to integrate AEM Content Fragments with the conference website solution for speakers, sessions, and sponsors.

## Overview

AEM Content Fragments provide a structured way to manage content that can be reused across multiple pages and blocks. This solution will leverage Content Fragments for speakers, sessions, and sponsors to enable content reuse and centralized management.

## Configuration Setup

### 1. Content Fragment Models

For each content type, we'll need to create appropriate Content Fragment Models:

#### Speaker Fragment Model
```
{
  "name": "Speaker",
  "description": "Speaker profile information",
  "fields": [
    {
      "name": "fullName",
      "type": "text",
      "required": true
    },
    {
      "name": "jobTitle",
      "type": "text"
    },
    {
      "name": "company",
      "type": "text"
    },
    {
      "name": "bio",
      "type": "longText"
    },
    {
      "name": "photo",
      "type": "image"
    },
    {
      "name": "socialLinks",
      "type": "multiText"
    }
  ]
}
```

#### Session Fragment Model
```
{
  "name": "Session",
  "description": "Session information",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "date",
      "type": "date"
    },
    {
      "name": "time",
      "type": "text"
    },
    {
      "name": "description",
      "type": "longText"
    },
    {
      "name": "speaker",
      "type": "contentFragment"
    },
    {
      "name": "room",
      "type": "text"
    },
    {
      "name": "tags",
      "type": "multiText"
    }
  ]
}
```

#### Sponsor Fragment Model
```
{
  "name": "Sponsor",
  "description": "Sponsor information",
  "fields": [
    {
      "name": "companyName",
      "type": "text",
      "required": true
    },
    {
      "name": "logo",
      "type": "image"
    },
    {
      "name": "website",
      "type": "text"
    },
    {
      "name": "tier",
      "type": "text"
    },
    {
      "name": "description",
      "type": "longText"
    }
  ]
}
```

### 2. Block Implementation for Content Fragments

The blocks will need to be updated to fetch content from Content Fragments rather than tables:

#### Speaker Cards Block
The speakers block will be updated to:
- Accept a Content Fragment path or reference
- Fetch speaker data from the Content Fragment
- Display speaker information using the fragment fields

#### Session List Block
The session list block will be updated to:
- Accept a Content Fragment path or reference
- Fetch session data from the Content Fragment
- Display session information with speaker details

#### Sponsors Block
The sponsors block will be updated to:
- Accept a Content Fragment path or reference
- Fetch sponsor data from the Content Fragment
- Display sponsor logos and information

## Implementation Approach

### 1. Fragment Loading Function
Create a helper function to load and process Content Fragments:

```javascript
async function loadContentFragment(fragmentPath) {
  try {
    const response = await fetch(fragmentPath);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load content fragment:', error);
    return null;
  }
}
```

### 2. Block Configuration
Each block will support both:
- Table-based authoring (legacy support)
- Content Fragment reference (new approach)

### 3. Configuration File
Create a configuration file to define fragment paths:

```json
{
  "fragments": {
    "speakers": "/content/dam/speakers",
    "sessions": "/content/dam/sessions",
    "sponsors": "/content/dam/sponsors"
  }
}
```

## Usage Instructions

### For Content Authors
1. Create Content Fragments using the defined models
2. Place fragments in the appropriate folders
3. Reference fragments in blocks using the fragment path
4. Content will automatically populate the blocks

### For Developers
1. Update block JavaScript to support fragment loading
2. Implement fallback to table-based content
3. Add fragment configuration in the project
4. Test fragment loading and display

## Benefits of Content Fragment Integration

1. **Centralized Content Management**: Single source of truth for speaker, session, and sponsor information
2. **Content Reuse**: Same speakers can be referenced across multiple sessions
3. **Consistency**: Ensures uniform presentation of information
4. **Scalability**: Easy to add new content without modifying block structures
5. **Maintenance**: Updates to content fragments automatically propagate to all references
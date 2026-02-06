# Content Fragment Usage Guide

This document explains how to use AEM Content Fragments with the conference website solution for speakers, sessions, and sponsors.

## Overview

The conference solution supports both traditional table-based content authoring and AEM Content Fragment integration. This allows content authors to leverage the power of Content Fragments for managing speaker, session, and sponsor information while maintaining backward compatibility with existing table-based workflows.

## Setting Up Content Fragments

### 1. Create Content Fragment Models

First, create the following Content Fragment Models in your AEM instance:

#### Speaker Fragment Model
```
{
  "name": "Speaker",
  "description": "Speaker profile information",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "required": true
    },
    {
      "name": "jobTitle",
      "type": "text"
    },
    {
      "name": "companyName",
      "type": "text"
    },
    {
      "name": "description",
      "type": "longText"
    },
    {
      "name": "image_ext",
      "type": "text"
    },
    {
      "name": "tags",
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
      "type": "text"
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
      "name": "description",
      "type": "longText"
    },
    {
      "name": "tags",
      "type": "multiText"
    }
  ]
}
```

### 2. Create Content Fragments

Create individual content fragments for each speaker, session, and sponsor using the above models.

## Using Content Fragments in Blocks

### Speaker Block

To use Content Fragments with the speaker block, add a `data-fragment-path` attribute to the block:

```html
<!-- In your page content -->
<div class="speaker-block" data-fragment-path="/content/dam/conference/speakers.json">
  <!-- Content will be loaded from the fragment -->
</div>
```

The block will automatically fetch and display speaker data from the specified fragment.

### Session Block

To use Content Fragments with the session block, add a `data-fragment-path` attribute to the block:

```html
<!-- In your page content -->
<div class="session-list-block" data-fragment-path="/content/dam/conference/sessions.json">
  <!-- Content will be loaded from the fragment -->
</div>
```

### Sponsor Block

To use Content Fragments with the sponsor block, add a `data-fragment-path` attribute to the block:

```html
<!-- In your page content -->
<div class="sponsor-block" data-fragment-path="/content/dam/conference/sponsors.json">
  <!-- Content will be loaded from the fragment -->
</div>
```

## Fallback Behavior

If a `data-fragment-path` attribute is not provided, the blocks will fall back to the traditional table-based content authoring method, allowing for backward compatibility with existing content.

## Fragment Data Format

The Content Fragments should return data in a JSON format that the blocks can consume. For speakers, the expected structure is:

```json
{
  "items": [
    {
      "id": "adrian-lee",
      "title": "Adrian Lee",
      "description": {
        "html": "Adrian designs pipelines integrating AI-generated text into editorial processes."
      },
      "image_ext": "https://example.com/image.jpg",
      "tags": [
        "aem-initialyzer:conference"
      ],
      "jobTitle": "Marketing Technologist",
      "companyName": "CopyGen"
    }
  ]
}
```

## Best Practices

1. **Consistent Naming**: Use consistent naming conventions for your fragment models and fields.
2. **Version Control**: Keep your fragment models version-controlled to ensure consistency across environments.
3. **Testing**: Test both fragment-based and table-based modes to ensure proper functionality.
4. **Performance**: Consider caching strategies for frequently accessed fragments.
5. **Documentation**: Document the structure of your fragments for content authors.

## Troubleshooting

### Fragment Loading Issues

If fragments are not loading properly:
1. Verify that the fragment path is correct and accessible
2. Check that the fragment returns valid JSON
3. Ensure that CORS settings allow access to the fragment endpoint
4. Confirm that the fragment model matches the expected data structure

### Fallback to Table-Based Content

If fragment loading fails, the blocks will automatically fall back to table-based content authoring. This ensures that your content remains accessible even if there are issues with the fragment system.

## Migration Strategy

When migrating from table-based content to Content Fragments:
1. Create the appropriate Content Fragment Models
2. Create Content Fragments for existing speakers, sessions, and sponsors
3. Update page content to use `data-fragment-path` attributes
4. Test thoroughly to ensure proper display
5. Gradually phase out table-based content as needed
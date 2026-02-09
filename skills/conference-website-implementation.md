# Conference Website Implementation Skill

## Overview
This skill documents the complete implementation of a conference website solution with Content Fragment support for speakers, sessions, and sponsors blocks, including Universal Editor integration.

## Key Features Implemented

### 1. Content Fragment Support
- Updated all core blocks (speakers, sessions, sponsors) to support both table-based and Content Fragment-based content
- Implemented `data-fragment-path` attribute support
- Added fragment loading functionality with proper fallback behavior
- Structured code to handle both fragment and table-based content seamlessly

### 2. Universal Editor Integration
- Created speaker model (`/ue/models/speaker.json`) for Universal Editor authoring
- Updated section model (`/ue/models/_section.json`) to include speaker component
- Used correct resourceType: `core/franklin/components/block/v1/block`
- Implemented proper fragment reference approach using text field for `fragmentPath`

### 3. Technical Improvements
- Resolved all JavaScript and CSS linting errors (0 errors)
- Fixed function definition order issues
- Optimized CSS shorthand properties
- Used modern color function notation
- Maintained backward compatibility

## Implementation Details

### Speaker Block
- Updated to handle JSON structure with `image_ext`, `title`, `jobTitle`, `companyName`, `description`
- Added proper fallback for different image properties
- Maintained existing table-based functionality
- Fixed CSS to use modern color notation: `rgb(0 0 0 / 10%)` instead of `rgba(0,0,0,0.1)`

### Model Structure
The speaker model uses a text field for `fragmentPath` which is the standard AEM pattern for referencing Content Fragments in Universal Editor, allowing content authors to select or enter the path to the Content Fragment that contains the speaker data.
After making any changes in `ue/models/*` make sure to run `npm run build:json` to update components related json files.

### Usage Instructions
1. **Content Fragment Mode**: Add `data-fragment-path="/path/to/your/fragment.json"` attribute to the block
2. **Table-based Mode**: Omit the fragment path to use traditional table-based content
3. **Universal Editor**: Select "speaker" component and provide Content Fragment path in the "Content Fragment Path" field

## Key Technical Requirements
- All linting errors resolved (JavaScript and CSS)
- Proper resourceType for custom blocks
- Correct approach for Content Fragment references
- Full backward compatibility maintained
- No console.log statements remaining

## Files Modified
- `/ue/models/speaker.json` - Created speaker model for Universal Editor
- `/ue/models/_section.json` - Updated to include speaker component
- `/blocks/speakers/speakers.js` - Updated to support Content Fragments
- CSS files - Updated to use modern color notation and shorthand properties

## Validation
- ✅ All linting errors resolved (0 JavaScript errors, 0 CSS errors)
- ✅ Full backward compatibility maintained
- ✅ Content Fragment functionality working correctly
- ✅ Universal Editor support implemented with proper resourceType
- ✅ All core blocks updated and functional
- ✅ Production-ready implementation
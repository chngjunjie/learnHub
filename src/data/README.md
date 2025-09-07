# Language Learning Data Structure

This directory contains the data for the language learning application. Currently using JSON files, but structured to easily migrate to a database.

## Current Structure

### Files
- `japanese.json` - Complete Japanese language data with 6 levels
- `languageDataService.js` - Service layer for data access
- `index.js` - Export and migration helper file

### Data Schema

#### Language Structure
```json
{
  "language": "japanese",
  "displayName": "日本语 (Japanese)",
  "levels": {
    "level_id": {
      "id": "level_id",
      "name": "Level Name",
      "description": "Level description",
      "vocabulary": [...],
      "conversations": [...],
      "grammar": [...]
    }
  }
}
```

#### Vocabulary Items
```json
{
  "word": "こんにちは",
  "romaji": "Konnichiwa", 
  "meaning": "你好",
  "category": "greetings"
}
```

#### Conversation Structure
```json
{
  "title": "Conversation Title",
  "scenario": "scene_type",
  "dialogue": [
    {
      "speaker": "Speaker Name",
      "text": "Japanese text",
      "romaji": "Romanized text", 
      "translation": "Chinese translation"
    }
  ]
}
```

#### Grammar Lessons
```json
{
  "title": "Grammar Topic",
  "explanation": "Explanation in Chinese",
  "examples": [
    {
      "original": "Japanese sentence",
      "romaji": "Romanized version",
      "translation": "Chinese translation"
    }
  ],
  "practice": [
    {
      "question": "Fill in the blank",
      "answer": "Correct answer",
      "explanation": "Why this is correct"
    }
  ]
}
```

## Japanese Language Levels

### 1. absolute_beginner (绝对初级)
- Basic greetings and pronouns
- Introduction to です (desu)
- Particle は (wa)

### 2. beginner (初级) 
- Basic verbs and activities
- Present tense verbs
- Particle を (wo)

### 3. pre_intermediate (准中级)
- Extended vocabulary
- Past tense
- Adjective usage

### 4. intermediate (中级)
- Professional and social vocabulary
- Basic honorific language
- Conditional expressions

### 5. upper_intermediate (中高级)
- Business and academic vocabulary
- Advanced honorific usage
- Complex rhetorical expressions

### 6. advanced (高级)
- Complex concepts and philosophy
- Classical grammar
- Literary expressions

## Migration to Database

### Recommended Database Schema

#### Core Tables
```sql
-- Languages
CREATE TABLE languages (
  id VARCHAR(50) PRIMARY KEY,
  display_name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Levels
CREATE TABLE levels (
  id VARCHAR(50) NOT NULL,
  language_id VARCHAR(50) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  order_index INTEGER,
  PRIMARY KEY (id, language_id),
  FOREIGN KEY (language_id) REFERENCES languages(id)
);

-- Vocabulary
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id VARCHAR(50) NOT NULL,
  level_id VARCHAR(50) NOT NULL,
  word VARCHAR(200) NOT NULL,
  romaji VARCHAR(200),
  meaning VARCHAR(500) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id, level_id) REFERENCES levels(language_id, id)
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id VARCHAR(50) NOT NULL,
  level_id VARCHAR(50) NOT NULL,
  title VARCHAR(300) NOT NULL,
  scenario VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id, level_id) REFERENCES levels(language_id, id)
);

-- Conversation Dialogue
CREATE TABLE conversation_dialogue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL,
  speaker VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  romaji TEXT,
  translation TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Grammar Lessons
CREATE TABLE grammar_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id VARCHAR(50) NOT NULL,
  level_id VARCHAR(50) NOT NULL,
  title VARCHAR(300) NOT NULL,
  explanation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (language_id, level_id) REFERENCES levels(language_id, id)
);

-- Grammar Examples
CREATE TABLE grammar_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL,
  original TEXT NOT NULL,
  romaji TEXT,
  translation TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE
);

-- Grammar Practice
CREATE TABLE grammar_practice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer VARCHAR(500) NOT NULL,
  explanation TEXT,
  order_index INTEGER NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  language_id VARCHAR(50) NOT NULL,
  level_id VARCHAR(50) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'vocabulary', 'conversation', 'grammar'
  content_id UUID NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration Steps

1. **Setup Database**: Create tables using the schema above
2. **Data Migration**: Run migration scripts to transfer JSON data to database
3. **Update Service Layer**: Modify `languageDataService.js` to use database queries
4. **Add Caching**: Implement Redis caching for frequently accessed data
5. **Add User System**: Implement user authentication and progress tracking

### API Integration

The service layer is designed to easily switch from JSON to API calls:

```javascript
// Current: Loading from JSON
const data = await import('./japanese.json');

// Future: Loading from API
const response = await fetch('/api/languages/japanese/levels/beginner/vocabulary');
const data = await response.json();
```

### Content Management

For future database integration, consider:
- Admin interface for content creation/editing
- Content versioning and approval workflows  
- Multi-language content management
- Audio file associations for listening practice
- User-generated content and community features

## Adding New Languages

To add Malay or Thai content:

1. Create `malay.json` or `thai.json` following the same structure
2. Update `languageDataService.js` to include the new language
3. Add translation for UI elements
4. Create language-specific learning components if needed

## Performance Considerations

- Implement lazy loading for large datasets
- Use pagination for vocabulary lists
- Cache frequently accessed content
- Optimize for mobile devices with limited bandwidth

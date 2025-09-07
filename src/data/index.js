// Language Data Index
// This file exports all language data and services

export { default as languageDataService } from './languageDataService';
export { default as japaneseData } from './japanese.json';

// Future exports for other languages
// export { default as malayData } from './malay.json';
// export { default as thaiData } from './thai.json';

// Database transition helpers
export const DB_MIGRATION_NOTES = {
  vocabulary: {
    table: 'vocabulary',
    fields: ['id', 'language', 'level', 'word', 'romaji', 'meaning', 'category', 'created_at', 'updated_at']
  },
  conversations: {
    table: 'conversations',
    fields: ['id', 'language', 'level', 'title', 'scenario', 'created_at', 'updated_at'],
    related: {
      dialogue: {
        table: 'conversation_dialogue',
        fields: ['id', 'conversation_id', 'speaker', 'text', 'romaji', 'translation', 'order_index']
      }
    }
  },
  grammar: {
    table: 'grammar_lessons',
    fields: ['id', 'language', 'level', 'title', 'explanation', 'created_at', 'updated_at'],
    related: {
      examples: {
        table: 'grammar_examples',
        fields: ['id', 'lesson_id', 'original', 'romaji', 'translation', 'order_index']
      },
      practice: {
        table: 'grammar_practice',
        fields: ['id', 'lesson_id', 'question', 'answer', 'explanation', 'order_index']
      }
    }
  },
  user_progress: {
    table: 'user_progress',
    fields: ['id', 'user_id', 'language', 'level', 'content_type', 'content_id', 'completed', 'score', 'created_at', 'updated_at']
  }
};

// Suggested API endpoints for database integration
export const API_ENDPOINTS = {
  // Language data
  getLanguages: '/api/languages',
  getLanguage: '/api/languages/:language',
  getLevels: '/api/languages/:language/levels',
  
  // Content endpoints
  getVocabulary: '/api/languages/:language/levels/:level/vocabulary',
  getConversations: '/api/languages/:language/levels/:level/conversations',
  getGrammar: '/api/languages/:language/levels/:level/grammar',
  
  // User progress
  getUserProgress: '/api/users/:userId/progress',
  updateProgress: '/api/users/:userId/progress',
  
  // Admin endpoints
  createContent: '/api/admin/content',
  updateContent: '/api/admin/content/:id',
  deleteContent: '/api/admin/content/:id'
};

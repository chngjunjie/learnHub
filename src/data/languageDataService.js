// Language Data Service
// This service handles loading language content data
// Can be easily modified to fetch from a database instead of JSON files

import japaneseData from './japanese.json';

class LanguageDataService {
  constructor() {
    this.cache = new Map();
    this.loadedLanguages = new Set();
  }

  // Load language data (currently from JSON, can be modified for DB)
  async loadLanguageData(language) {
    if (this.loadedLanguages.has(language)) {
      return this.cache.get(language);
    }

    try {
      let data;
      switch (language) {
        case 'japanese':
          data = japaneseData;
          break;
        case 'malay':
          // TODO: Load Malay data when available
          data = this.getPlaceholderData('malay');
          break;
        case 'thai':
          // TODO: Load Thai data when available
          data = this.getPlaceholderData('thai');
          break;
        default:
          throw new Error(`Language ${language} not supported`);
      }

      this.cache.set(language, data);
      this.loadedLanguages.add(language);
      return data;
    } catch (error) {
      console.error(`Error loading ${language} data:`, error);
      return this.getPlaceholderData(language);
    }
  }

  // Get vocabulary for specific language and level
  async getVocabulary(language, level) {
    const data = await this.loadLanguageData(language);
    return data.levels[level]?.vocabulary || [];
  }

  // Get conversations for specific language and level
  async getConversations(language, level) {
    const data = await this.loadLanguageData(language);
    return data.levels[level]?.conversations || [];
  }

  // Get grammar lessons for specific language and level
  async getGrammar(language, level) {
    const data = await this.loadLanguageData(language);
    return data.levels[level]?.grammar || [];
  }

  // Get all available levels for a language
  async getLevels(language) {
    const data = await this.loadLanguageData(language);
    return Object.keys(data.levels || {}).map(levelId => ({
      id: levelId,
      name: data.levels[levelId].name,
      description: data.levels[levelId].description
    }));
  }

  // Get language display information
  async getLanguageInfo(language) {
    const data = await this.loadLanguageData(language);
    return {
      language: data.language,
      displayName: data.displayName
    };
  }

  // Search vocabulary by category
  async searchVocabularyByCategory(language, level, category) {
    const vocabulary = await this.getVocabulary(language, level);
    return vocabulary.filter(item => item.category === category);
  }

  // Get all vocabulary categories for a level
  async getVocabularyCategories(language, level) {
    const vocabulary = await this.getVocabulary(language, level);
    const categories = [...new Set(vocabulary.map(item => item.category))];
    return categories;
  }

  // Placeholder data for languages not yet implemented
  getPlaceholderData(language) {
    const displayNames = {
      malay: '马来语 (Malay)',
      thai: '泰语 (Thai)'
    };

    return {
      language,
      displayName: displayNames[language] || language,
      levels: {
        beginner: {
          id: 'beginner',
          name: '初级 (Beginner)',
          description: `${displayNames[language]} 初级内容开发中`,
          vocabulary: [
            { word: '内容开发中', romaji: 'Content in development', meaning: '内容开发中', category: 'system' }
          ],
          conversations: [
            {
              title: '内容开发中 (Content in Development)',
              scenario: 'placeholder',
              dialogue: [
                { speaker: 'System', text: '内容开发中', romaji: 'Content in development', translation: '内容正在开发中，请稍后再来查看。' }
              ]
            }
          ],
          grammar: [
            {
              title: '内容开发中',
              explanation: '语法内容正在开发中，请稍后再来查看。',
              examples: [],
              practice: []
            }
          ]
        },
        intermediate: {
          id: 'intermediate',
          name: '中级 (Intermediate)',
          description: `${displayNames[language]} 中级内容开发中`,
          vocabulary: [],
          conversations: [],
          grammar: []
        },
        advanced: {
          id: 'advanced',
          name: '高级 (Advanced)',
          description: `${displayNames[language]} 高级内容开发中`,
          vocabulary: [],
          conversations: [],
          grammar: []
        }
      }
    };
  }

  // Future database methods (placeholder for when switching to DB)
  
  // async fetchFromDatabase(language, level, contentType) {
  //   const response = await fetch(`/api/languages/${language}/levels/${level}/${contentType}`);
  //   return response.json();
  // }

  // async saveToDatabase(language, level, contentType, data) {
  //   const response = await fetch(`/api/languages/${language}/levels/${level}/${contentType}`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  //   });
  //   return response.json();
  // }

  // async updateProgress(userId, language, level, contentType, itemId) {
  //   const response = await fetch('/api/progress', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId, language, level, contentType, itemId })
  //   });
  //   return response.json();
  // }
}

// Create singleton instance
const languageDataService = new LanguageDataService();

export default languageDataService;

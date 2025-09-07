import React, { useState, useEffect } from 'react';
import languageDataService from '../../data/languageDataService';

function VocabularyCard({ language, level }) {
  const [vocabulary, setVocabulary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMeaning, setShowMeaning] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVocabulary();
  }, [language, level]);

  const loadVocabulary = async () => {
    try {
      setLoading(true);
      const vocabData = await languageDataService.getVocabulary(language, level);
      const categoryData = await languageDataService.getVocabularyCategories(language, level);
      
      setVocabulary(vocabData);
      setCategories(['all', ...categoryData]);
      setShowMeaning({});
    } catch (error) {
      console.error('Error loading vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVocabulary = selectedCategory === 'all' 
    ? vocabulary 
    : vocabulary.filter(item => item.category === selectedCategory);

  const toggleMeaning = (index) => {
    setShowMeaning(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">词汇学习 (Vocabulary)</h3>
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">加载中... (Loading...)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">词汇学习 (Vocabulary)</h3>
      
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择分类 (Select Category):
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? '全部 (All)' : category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-4">
        {filteredVocabulary.length > 0 ? (
          filteredVocabulary.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleMeaning(index)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{item.word}</p>
                  {item.romaji && (
                    <p className="text-gray-600">{item.romaji}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">分类: {item.category}</p>
                </div>
                <div>
                  {showMeaning[index] ? (
                    <p className="text-blue-600">{item.meaning}</p>
                  ) : (
                    <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      显示意思 (Show meaning)
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            没有找到该级别的词汇内容。(No vocabulary found for this level.)
          </div>
        )}
      </div>
      
      {filteredVocabulary.length > 0 && (
        <div className="mt-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={loadVocabulary}
          >
            刷新内容 (Refresh Content)
          </button>
        </div>
      )}
    </div>
  );
}

export default VocabularyCard;

import React, { useState } from 'react';
import VocabularyCard from './VocabularyCard';
import ConversationPractice from './ConversationPractice';
import GrammarLesson from './GrammarLesson';

function LanguageLearningFeatures({ language, level }) {
  const [activeFeature, setActiveFeature] = useState('vocabulary');

  const features = [
    { id: 'vocabulary', name: '词汇学习 (Vocabulary)', icon: '📚' },
    { id: 'conversation', name: '会话练习 (Conversation)', icon: '💬' },
    { id: 'grammar', name: '文法学习 (Grammar)', icon: '📝' },
    { id: 'listening', name: '听力练习 (Listening)', icon: '🎧' },
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'vocabulary':
        return <VocabularyCard language={language} level={level} />;
      case 'conversation':
        return <ConversationPractice language={language} level={level} />;
      case 'grammar':
        return <GrammarLesson language={language} level={level} />;
      case 'listening':
        return (
          <div className="p-4">
            <h3 className="text-xl font-bold mb-4">听力练习 (Listening Practice)</h3>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="mb-4">听力练习功能正在开发中。请稍后再来查看！</p>
              <p>Listening practice feature is under development. Please check back later!</p>
            </div>
          </div>
        );
      default:
        return <VocabularyCard language={language} level={level} />;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">选择学习功能 (Select Learning Feature)</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeFeature === feature.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <span className="mr-2">{feature.icon}</span>
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {renderFeatureContent()}
      </div>
    </div>
  );
}

export default LanguageLearningFeatures;

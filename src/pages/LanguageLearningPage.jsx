import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LanguageLearningFeatures from '../components/language/LanguageLearningFeatures';
import languageDataService from '../data/languageDataService';

function LanguageLearningPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('japanese');
  const [selectedLevel, setSelectedLevel] = useState('absolute_beginner');
  const [showFeatures, setShowFeatures] = useState(false);
  const [availableLevels, setAvailableLevels] = useState([]);
  const [languageInfo, setLanguageInfo] = useState({});

  const languages = [
    { id: 'japanese', name: '日本语 (Japanese)' },
    { id: 'malay', name: '马来语 (Malay)' },
    { id: 'thai', name: '泰语 (Thai)' }
  ];

  useEffect(() => {
    loadLanguageData();
  }, [selectedLanguage]);

  const loadLanguageData = async () => {
    try {
      const levels = await languageDataService.getLevels(selectedLanguage);
      const info = await languageDataService.getLanguageInfo(selectedLanguage);
      
      setAvailableLevels(levels);
      setLanguageInfo(info);
      
      // Set the first available level as default
      if (levels.length > 0) {
        setSelectedLevel(levels[0].id);
      }
    } catch (error) {
      console.error('Error loading language data:', error);
    }
  };

  const getLanguageDisplayName = () => {
    return languageInfo.displayName || selectedLanguage;
  };

  const getLevelDisplayName = () => {
    const level = availableLevels.find(l => l.id === selectedLevel);
    return level ? level.name : selectedLevel;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-duo-green-50 via-white to-duo-blue-50 font-nunito">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-6xl animate-bounce-slow">🦉</div>
            <div>
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-duo-green-600 to-duo-blue-600 bg-clip-text text-transparent font-comfortaa">
                语言学习中心
              </h1>
              <h2 className="text-2xl text-gray-600 font-light">
                The free, fun, and effective way to learn languages!
              </h2>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Join millions of learners worldwide! 🌍 Master new languages with bite-sized lessons, 
            game-like features, and science-backed methods.
          </p>
        </div>
        
        {!showFeatures ? (
          <div className="max-w-5xl mx-auto">
            {/* Language Selection */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 text-duo-green-700 font-comfortaa">
                  选择你的语言冒险 ✨
                </h3>
                <p className="text-gray-600">Choose your language adventure</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {languages.map((language, index) => (
                  <button
                    key={language.id}
                    className={`group relative overflow-hidden rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                      selectedLanguage === language.id
                        ? 'border-duo-green-400 bg-duo-green-50 shadow-xl scale-105'
                        : 'border-gray-200 bg-white hover:border-duo-green-300 hover:bg-duo-green-25'
                    }`}
                    onClick={() => setSelectedLanguage(language.id)}
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="p-8 text-center">
                      <div className="text-4xl mb-4">
                        {language.id === 'japanese' && '🏯'}
                        {language.id === 'malay' && '🇲🇾'}
                        {language.id === 'thai' && '🇹🇭'}
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-gray-800">
                        {language.name}
                      </h4>
                      {selectedLanguage === language.id && (
                        <div className="absolute top-4 right-4 text-duo-green-500 text-2xl animate-bounce">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-duo-green-400/10 to-duo-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Level Selection */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 text-duo-blue-700 font-comfortaa">
                  选择你的级别 🎯
                </h3>
                <p className="text-gray-600">Choose your level</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableLevels.map((level, index) => (
                  <div
                    key={level.id}
                    className={`group relative overflow-hidden rounded-2xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
                      selectedLevel === level.id
                        ? 'border-duo-blue-400 bg-duo-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 bg-white hover:border-duo-blue-300 hover:bg-duo-blue-25'
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-800">{level.name}</h4>
                        {selectedLevel === level.id && (
                          <div className="text-duo-blue-500 text-xl animate-pulse">🎯</div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{level.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-duo-blue-400 to-duo-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Display */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-3 text-duo-yellow-600 font-comfortaa">
                  学习功能 🚀
                </h3>
                <p className="text-gray-600">Learning Features</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: "📚",
                    title: "词汇学习",
                    subtitle: "Vocabulary",
                    description: `学习日常使用的${getLanguageDisplayName().split(' ')[0]}词汇，按分类整理便于记忆`,
                    color: "duo-green",
                    bgPattern: "from-duo-green-50 to-duo-green-100"
                  },
                  {
                    icon: "💬",
                    title: "会话练习", 
                    subtitle: "Conversation",
                    description: `通过实际情景对话学习${getLanguageDisplayName().split(' ')[0]}，提高口语表达能力`,
                    color: "duo-blue",
                    bgPattern: "from-duo-blue-50 to-duo-blue-100"
                  },
                  {
                    icon: "🎧",
                    title: "听力练习",
                    subtitle: "Listening", 
                    description: `提高${getLanguageDisplayName().split(' ')[0]}听力理解能力，适应不同语速和口音`,
                    color: "duo-yellow",
                    bgPattern: "from-duo-yellow-50 to-duo-yellow-100"
                  },
                  {
                    icon: "📝", 
                    title: "文法学习",
                    subtitle: "Grammar",
                    description: `系统学习${getLanguageDisplayName().split(' ')[0]}的语法规则，配备练习和例句`,
                    color: "duo-red",
                    bgPattern: "from-red-50 to-red-100"
                  }
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgPattern} border-2 border-${feature.color}-200 hover:border-${feature.color}-400 p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer`}
                    style={{animationDelay: `${index * 200}ms`}}
                  >
                    <div className="relative z-10">
                      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h4 className={`font-bold text-2xl mb-2 text-${feature.color}-700`}>
                        {feature.title}
                      </h4>
                      <p className={`font-semibold text-lg mb-3 text-${feature.color}-600`}>
                        {feature.subtitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/30 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/20 rounded-full transform group-hover:scale-125 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Information */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-duo-green-50 to-duo-blue-50 rounded-2xl border-2 border-duo-green-200 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl animate-pulse-slow">🎯</div>
                  <h4 className="text-2xl font-bold text-duo-green-700 font-comfortaa">
                    学习进度说明
                  </h4>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📊</div>
                    <p className="leading-relaxed">每个级别包含词汇、会话、语法和听力四个模块</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">⭐</div>
                    <p className="leading-relaxed">建议按顺序完成各个级别的学习</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">🔄</div>
                    <p className="leading-relaxed">定期复习已学内容以巩固记忆</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Learning Button */}
            <div className="text-center">
              <button 
                className="group relative overflow-hidden bg-gradient-to-r from-duo-green-500 to-duo-blue-500 hover:from-duo-green-600 hover:to-duo-blue-600 text-white font-bold text-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl font-comfortaa"
                onClick={() => setShowFeatures(true)}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>开始学习</span>
                  <span className="text-2xl group-hover:animate-wiggle">🚀</span>
                  <span>Start Learning</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-duo-yellow-400 to-duo-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-duo-green-200 p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">
                    {selectedLanguage === 'japanese' && '🏯'}
                    {selectedLanguage === 'malay' && '🇲🇾'}
                    {selectedLanguage === 'thai' && '🇹🇭'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-duo-green-700 font-comfortaa">
                      {getLanguageDisplayName()}
                    </h3>
                    <p className="text-duo-blue-600 font-semibold">
                      {getLevelDisplayName()}
                    </p>
                  </div>
                </div>
                <button 
                  className="mt-6 sm:mt-0 bg-white/80 backdrop-blur-sm text-duo-green-600 border-2 border-duo-green-300 hover:bg-duo-green-50 hover:border-duo-green-400 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  onClick={() => setShowFeatures(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span>←</span>
                    <span>返回选择 (Back)</span>
                  </span>
                </button>
              </div>
            </div>
            
            <LanguageLearningFeatures language={selectedLanguage} level={selectedLevel} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default LanguageLearningPage;

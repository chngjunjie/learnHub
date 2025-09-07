import React, { useState, useEffect } from 'react';
import languageDataService from '../../data/languageDataService';

function GrammarLesson({ language, level }) {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadGrammarLessons();
  }, [language, level]);

  const loadGrammarLessons = async () => {
    try {
      setLoading(true);
      const grammarData = await languageDataService.getGrammar(language, level);
      setLessons(grammarData);
      setSelectedLesson(0);
      setShowAnswers(false);
    } catch (error) {
      console.error('Error loading grammar lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentLesson = lessons[selectedLesson] || { examples: [], practice: [] };

  if (loading) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">文法学习 (Grammar Lessons)</h3>
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">加载中... (Loading...)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">文法学习 (Grammar Lessons)</h3>
      
      {lessons.length > 0 ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">选择课程 (Select lesson):</label>
            <select 
              value={selectedLesson}
              onChange={(e) => {
                setSelectedLesson(Number(e.target.value));
                setShowAnswers(false);
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {lessons.map((lesson, index) => (
                <option key={index} value={index}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h4 className="text-lg font-semibold mb-3">{currentLesson.title}</h4>
            <p className="mb-4">{currentLesson.explanation}</p>
            
            <h5 className="font-semibold mb-2">例子 (Examples):</h5>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              {currentLesson.examples && currentLesson.examples.length > 0 ? (
                currentLesson.examples.map((example, index) => (
                  <div key={index} className="mb-3">
                    <p className="font-medium">{example.original}</p>
                    {example.romaji && (
                      <p className="text-gray-500 text-sm italic">{example.romaji}</p>
                    )}
                    <p className="text-gray-600">{example.translation}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">没有例子可显示。(No examples available.)</p>
              )}
            </div>
            
            <h5 className="font-semibold mb-2">练习 (Practice):</h5>
            <div className="bg-gray-50 p-4 rounded-lg">
              {currentLesson.practice && currentLesson.practice.length > 0 ? (
                <>
                  {currentLesson.practice.map((item, index) => (
                    <div key={index} className="mb-3">
                      <p className="mb-1">{item.question}</p>
                      {showAnswers && (
                        <div>
                          <p className="text-green-600 font-medium">答案: {item.answer}</p>
                          {item.explanation && (
                            <p className="text-gray-600 text-sm">解释: {item.explanation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {showAnswers ? '隐藏答案 (Hide Answers)' : '显示答案 (Show Answers)'}
                  </button>
                </>
              ) : (
                <p className="text-gray-500">没有练习可显示。(No practice exercises available.)</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => {
                setSelectedLesson(Math.max(0, selectedLesson - 1));
                setShowAnswers(false);
              }}
              disabled={selectedLesson === 0}
            >
              上一课 (Previous Lesson)
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setSelectedLesson(Math.min(lessons.length - 1, selectedLesson + 1));
                setShowAnswers(false);
              }}
              disabled={selectedLesson === lessons.length - 1}
            >
              下一课 (Next Lesson)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          没有找到该级别的语法课程。(No grammar lessons available for this language and level.)
        </div>
      )}
    </div>
  );
}

export default GrammarLesson;

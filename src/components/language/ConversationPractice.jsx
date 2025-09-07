import React, { useState, useEffect } from 'react';
import languageDataService from '../../data/languageDataService';

function ConversationPractice({ language, level }) {
  const [conversations, setConversations] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, [language, level]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const conversationData = await languageDataService.getConversations(language, level);
      setConversations(conversationData);
      setCurrentScenarioIndex(0);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentScenario = conversations[currentScenarioIndex] || { dialogue: [] };

  const nextScenario = () => {
    if (currentScenarioIndex < conversations.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setCurrentScenarioIndex(0); // Loop back to the first scenario
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">会话练习 (Conversation Practice)</h3>
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">加载中... (Loading...)</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">会话练习 (Conversation Practice)</h3>
      
      {conversations.length > 0 ? (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">{currentScenario.title}</h4>
            <div className="text-sm text-gray-500">
              {currentScenarioIndex + 1} / {conversations.length}
            </div>
          </div>
          
          {currentScenario.scenario && (
            <div className="mb-3">
              <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                场景 (Scenario): {currentScenario.scenario}
              </span>
            </div>
          )}
          
          <div className="space-y-4 mb-6">
            {currentScenario.dialogue && currentScenario.dialogue.map((line, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">{line.speaker}:</p>
                <p className="mb-1">{line.text}</p>
                {line.romaji && (
                  <p className="text-gray-500 text-sm italic">{line.romaji}</p>
                )}
                <p className="text-gray-600 text-sm">{line.translation}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => setCurrentScenarioIndex(Math.max(0, currentScenarioIndex - 1))}
              disabled={currentScenarioIndex === 0}
            >
              上一个 (Previous)
            </button>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={nextScenario}
            >
              下一个 (Next)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          没有找到该级别的会话内容。(No conversation scenarios available for this language and level.)
        </div>
      )}
      
      {conversations.length > 0 && currentScenario.dialogue && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">练习说出以下句子 (Practice saying these sentences):</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            {currentScenario.dialogue.map((line, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">{line.text}</p>
                {line.romaji && (
                  <p className="text-sm text-gray-500">{line.romaji}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConversationPractice;

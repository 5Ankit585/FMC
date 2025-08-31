import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const QA = ({ isLoggedIn }) => {
  const [query, setQuery] = useState('');
  const [answers, setAnswers] = useState([
    { question: 'What is the full form of DTU?', answer: 'DTU stands for Delhi Technological University.' },
    { question: 'When was DTU established?', answer: 'DTU was established in 1941 as Delhi College of Engineering (DCE) and became Delhi Technological University (DTU) in 2008.' },
    { question: 'Where is DTU located?', answer: 'DTU is located in Rohini, Delhi, India.' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const maxLength = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !query.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newAnswer = { question: query, answer: 'Answer will be provided soon.' };
      setAnswers([newAnswer, ...answers]);
      setQuery('');
      setIsSubmitting(false);
    }, 1000);
  };

  const toggleAnswer = (section, index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [`${section}-${index}`]: !prev[`${section}-${index}`],
    }));
  };

  const mostAskedQuestions = [
    { question: 'What is the full form of DTU?', answer: 'DTU stands for Delhi Technological University.' },
    { question: 'When was DTU established?', answer: 'DTU was established in 1941 as Delhi College of Engineering (DCE) and became Delhi Technological University (DTU) in 2008.' },
    { question: 'Where is DTU located?', answer: 'DTU is located in Rohini, Delhi, India.' },
  ];

  return (
    <div className="container p-4 flex flex-col gap-6 max-w-3xl ml-0">
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 border border-[var(--border-color)]">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, maxLength))}
              placeholder="Type your question..."
              className="w-full p-3 pr-20 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              disabled={!isLoggedIn || isSubmitting}
              aria-label="Question input"
              maxLength={maxLength}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
              {query.length}/{maxLength}
            </span>
            {!isLoggedIn && (
              <p className="text-red-500 text-xs mt-1 animate-pulse">
                Please log in to ask a question.
              </p>
            )}
          </div>
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors duration-200 text-sm"
              disabled={!isLoggedIn || !query.trim() || isSubmitting}
              aria-label="Submit question"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">Most Asked Questions</h3>
          <div className="space-y-3">
            {mostAskedQuestions.map((qa, index) => (
              <div
                key={index}
                className="question-item p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-base text-gray-800 dark:text-gray-100">{qa.question}</p>
                  <button
                    onClick={() => toggleAnswer('mostAsked', index)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                    aria-label={expandedQuestions[`mostAsked-${index}`] ? 'Hide answer' : 'Show answer'}
                  >
                    <FontAwesomeIcon icon={expandedQuestions[`mostAsked-${index}`] ? faMinus : faPlus} />
                  </button>
                </div>
                {expandedQuestions[`mostAsked-${index}`] && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{qa.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {answers.map((qa, index) => (
            <div
              key={index}
              className="question-item p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-base text-gray-800 dark:text-gray-100">{qa.question}</p>
                <button
                  onClick={() => toggleAnswer('submitted', index)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                  aria-label={expandedQuestions[`submitted-${index}`] ? 'Hide answer' : 'Show answer'}
                >
                  <FontAwesomeIcon icon={expandedQuestions[`submitted-${index}`] ? faMinus : faPlus} />
                </button>
              </div>
              {expandedQuestions[`submitted-${index}`] && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{qa.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QA;
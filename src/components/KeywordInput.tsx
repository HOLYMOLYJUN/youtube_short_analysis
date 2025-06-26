
import React, { useState } from 'react';

interface KeywordInputProps {
  onSearch: (keyword: string) => void;  // App.tsx에서 검색을 트리거하는 콜백 함수
  isLoading: boolean;  // 현재 검색이 진행 중인지 여부 표시
}

/**
 * 사용자가 키워드를 입력하고 분석을 시작할 수 있는 컴포넌트.
 * 입력 필드와 검색 버튼을 포함함.
 */
export const KeywordInput: React.FC<KeywordInputProps> = ({ onSearch, isLoading }) => {
  const [keyword, setKeyword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    onSearch(keyword); // 현재 키워드를 가지고 onSearch 함수 호출
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label htmlFor="keyword-input" className="block text-xl font-semibold mb-3 text-primary-300">
        YouTube Shorts 키워드 분석
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="keyword-input"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="분석할 키워드를 입력하세요... (예: K팝 댄스 챌린지)"
          className="flex-grow p-4 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200 text-gray-100 placeholder-gray-400"
          disabled={isLoading}  // 로딩 중일 때 입력 비활성화
        />
        <button
          type="submit"
          disabled={isLoading || !keyword.trim()} // 로딩 중이거나 키워드가 비어있으면 버튼 비활성화
          className="px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
        >
          {isLoading ? '분석 중...' : '분석 시작'}
        </button>
      </div>
    </form>
  );
};
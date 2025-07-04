
import React from 'react';

/**
 * API 호출 등 백그라운드 작업 중임을 표시하는
 * 간단한 SVG 기반 로딩 스피너 컴포넌트.
 */
export const LoadingSpinner: React.FC = () => {
  return (
    <svg 
      className="animate-spin h-8 w-8 text-primary-500" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
      aria-label="로딩 중"  //웹 접근성: 화면 낭독기용 라벨
      role="status" //웹 접근성: 이 요소가 상태임을 나타냄
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
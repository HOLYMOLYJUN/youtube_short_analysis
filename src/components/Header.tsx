
import React from 'react';

// 유튜브 쇼츠를 간단히 표현한 SVG 아이콘 (컨셉 이미지)
const ShortsLogoIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 15L15.2778 11.5L10 8V15Z" fill="white"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M22.8889 6.70019C22.6333 5.00019 21.3 3.66686 19.6 3.41132C17.6556 2.88905 12 2.88905 12 2.88905C12 2.88905 6.34444 2.88905 4.4 3.41132C2.7 3.66686 1.36667 5.00019 1.11111 6.70019C0.588889 8.64463 0.588889 12.0002 0.588889 12.0002C0.588889 12.0002 0.588889 15.3557 1.11111 17.3002C1.36667 19.0002 2.7 20.3335 4.4 20.589C6.34444 21.1113 12 21.1113 12 21.1113C12 21.1113 17.6556 21.1113 19.6 20.589C21.3 20.3335 22.6333 19.0002 22.8889 17.3002C23.4111 15.3557 23.4111 12.0002 23.4111 12.0002C23.4111 12.0002 23.4111 8.64463 22.8889 6.70019Z" fill="#FF0000"/>
  </svg>
);

/**
 * 애플리케이션 헤더 컴포넌트.
 * 애플리케이션 타이틀과 로고를 보여줌.
 */
export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <ShortsLogoIcon className="w-10 h-10 text-red-500" />
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-400 to-red-500 text-transparent bg-clip-text">
            YouTube Shorts 채널 분석기
          </h1>
        </div>
      </div>
    </header>
  );
};
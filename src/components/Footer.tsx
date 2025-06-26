
import React from 'react';

/**
 * 애플리케이션의 푸터 컴포넌트.
 * 저작권 정보와 데이터의 성격에 대한 면책 조항을 표시함.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-center py-6 border-t border-slate-700">
      <p className="text-sm text-slate-400">
        &copy; {currentYear} YouTube Shorts 분석기. AI 기반 시뮬레이션 데이터입니다.
      </p>
      <p className="text-xs text-slate-500 mt-1">
        실제 YouTube 데이터가 아니며, 정보 제공 목적으로 생성되었습니다.
      </p>
    </footer>
  );
};
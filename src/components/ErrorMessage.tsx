
import React from 'react';

interface ErrorMessageProps {
  message: string; // 보여줄 에러 메시지
}

/**
 * 사용자에게 에러 메시지를 표준화된 형식으로 보여주는 컴포넌트.
 * 에러 아이콘과 메시지 텍스트를 포함함.
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-8 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          {/* 에러 아이콘 */}
          <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5a1 1 0 012 0v2a1 1 0 01-2 0v-2zm0-6a1 1 0 012 0v4a1 1 0 01-2 0V7z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">오류 발생</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
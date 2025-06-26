import React from 'react';
import type { ChannelAnalysis } from '../types';
import { ChannelCard } from './ChannelCard';

interface ShortsDisplayProps {
  results: ChannelAnalysis[]; // 표시할 채널 분석 데이터 배열
}

/**
 * 분석된 유튜브 쇼츠 채널 목록을 보여주는 컴포넌트입니다.
 * results 배열을 순회하며 각 분석 데이터마다 ChannelCard를 렌더링합니다.
 */
export const ShortsDisplay: React.FC<ShortsDisplayProps> = ({ results }) => {
  // 결과가 없으면 App.tsx에서 빈 상태 또는 에러 메시지를 처리합니다.
  // 이 컴포넌트는 결과가 있을 때만 렌더링됩니다.
  if (results.length === 0) {
    return null; 
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-primary-400">분석 결과:</h2>
      <div className="space-y-6">
        {/* 각 채널 분석 결과를 매핑하여 ChannelCard 컴포넌트를 렌더링 */}
        {results.map((analysis) => (
          <ChannelCard key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

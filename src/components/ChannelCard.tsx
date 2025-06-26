
import React from 'react';
import type { ChannelAnalysis } from '../types';
import { ViewsTrendChart } from './ViewsTrendChart'; // 조회수 추세 차트 컴포넌트 임포트

interface ChannelCardProps {
  analysis: ChannelAnalysis; // 단일 채널 분석 객체
}

/**
 * 레이블, 값, 선택적 아이콘이 있는 정보 항목을 렌더링하는 유틸리티 컴포넌트입니다.
 */
const InfoItem: React.FC<{ label: string; value: React.ReactNode; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex items-start py-2">
    {icon && <span className="mr-3 text-primary-400 w-5 h-5 flex items-center justify-center">{icon}</span>}
    <span className="font-semibold text-slate-300 w-36 shrink-0">{label}:</span>
    <span className="text-slate-200 break-words min-w-0">{value}</span>
  </div>
);

// SVG 아이콘 컴포넌트 (달력)
const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (비디오카메라)
const VideoCameraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (태그)
const TagIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (문서)
const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>
);

// SVG 아이콘 컴포넌트 (심볼)
const AtSymbolIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
  </svg>
);

// SVG 아이콘 컴포넌트 (눈눈)
const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (원화)
const CurrencyWonIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 3m0 0l3-3m-3 3V12m0-4.5h3.75M9 12h3.75m-3.75 0V15m1.125-6.75h1.5m2.25-1.5H15M9 15h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (사진)
const PhotographIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

// SVG 아이콘 컴포넌트 (차트)
const ChartBarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125Z" />
    </svg>
);

/**
 * 단일 유튜브 쇼츠 채널의 상세 분석을 보여주는 컴포넌트입니다.
 * 메타데이터, AI 생성 썸네일, 계산된 수익, 조회수 추세 차트 등을 표시합니다.
 */
export const ChannelCard: React.FC<ChannelCardProps> = ({ analysis }) => {
   // 숫자를 한글 원화(KRW) 형식으로 포맷팅하는 헬퍼 함수
  const formatCurrency = (value: number) => {
    return value.toLocaleString('ko-KR', { 
      style: 'currency', 
      currency: 'KRW',
      minimumFractionDigits: 0, // 소수점 자리 없음
      maximumFractionDigits: 0 
    });
  };

  // AI 생성 썸네일 이미지 로딩 실패 여부 상태
  const [thumbnailError, setThumbnailError] = React.useState(false);

  return (
    <div className="bg-slate-700 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-primary-500/30">
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-400 mb-1">{analysis.channelName}</h3>
        <p className="text-sm text-slate-300 mb-4 italic">대표 영상 컨셉: "{analysis.shortTitle}"</p>
        
        <div className="border-t border-slate-600 pt-4">
          {/* 채널 정보 항목들 */}
          <InfoItem 
            label="채널 주소" 
            value={
              <a 
                href={`https://www.youtube.com/${analysis.channelAddress}`} 
                target="_blank" // 새 탭에서 열기
                rel="noopener noreferrer" // 보안 모범 사례
                className="text-primary-400 hover:text-primary-300 hover:underline"
                title={`${analysis.channelAddress} 유튜브 채널 방문`}
              >
                {analysis.channelAddress}
              </a>
            } 
            icon={<AtSymbolIcon />} 
          />
          <InfoItem label="채널 개설일" value={analysis.creationDate} icon={<CalendarDaysIcon />} />
          <InfoItem label="첫 업로드일" value={analysis.firstUploadDate} icon={<CalendarDaysIcon />} />
          <InfoItem label="최근 업로드일" value={analysis.latestShortUploadDate} icon={<CalendarDaysIcon />} />
          <InfoItem label="총 동영상 수" value={analysis.videoCount.toLocaleString()} icon={<VideoCameraIcon />} />
          <InfoItem label="총 조회수" value={analysis.totalViews.toLocaleString()} icon={<EyeIcon />} />
          <InfoItem 
            label="예상 수익 (최소)" 
            value={formatCurrency(analysis.estimatedMinEarnings)} 
            icon={<CurrencyWonIcon />} 
          />
          <InfoItem 
            label="예상 수익 (최대)" 
            value={formatCurrency(analysis.estimatedMaxEarnings)} 
            icon={<CurrencyWonIcon />} 
          />
          <InfoItem label="채널 주제" value={analysis.channelTheme} icon={<TagIcon />} />
          
          {/* 기여도 분석 (여러 줄 텍스트) */}
          <div className="py-2 mt-2">
            <div className="flex items-start">
             <span className="mr-3 text-primary-400 w-5 h-5 flex items-center justify-center"><DocumentTextIcon /></span>
             <span className="font-semibold text-slate-300 w-36 shrink-0">기여도 분석:</span>
            </div>
            {/* 레이블 아래 분석 텍스트 들여쓰기 처리 */}
            <p className="text-slate-200 mt-1 ml-[calc(1.25rem+0.75rem+9rem)]"> 
              {analysis.contributionAnalysis}
            </p>
          </div>

          {/* 가장 많이 본 쇼츠 정보 섹션 */}
          <div className="mt-4 pt-4 border-t border-slate-600">
            <h4 className="text-md font-semibold text-primary-300 mb-3 flex items-center">
              <PhotographIcon className="w-5 h-5 mr-2 text-primary-400" />
              대표 쇼츠 (가장 인기있는 영상)
            </h4>
            <p className="text-slate-100 font-medium mb-2 ml-7">{analysis.mostViewedShortTitle}</p>
            
            <div className="ml-7 flex justify-center items-center">
              {/* AI 생성 이미지가 있으면 렌더, 없거나 로딩 실패 시 텍스트 설명 표시 */}
              {analysis.mostViewedShortThumbnailUrl && !thumbnailError ? (
                <img
                  src={analysis.mostViewedShortThumbnailUrl} // AI 생성 이미지 URL
                  alt={`썸네일: ${analysis.mostViewedShortTitle}`}
                  className="w-48 max-w-full aspect-[9/16] object-cover rounded-md bg-slate-800 border border-slate-500 shadow-lg"
                  onError={() => setThumbnailError(true)} // 이미지 로딩 실패 시 처리
                />
              ) : (
                // 대체: 이미지가 없거나 실패하면 설명 텍스트 보여줌
                <div className="w-48 aspect-[9/16] bg-slate-600 p-3 rounded-md border border-slate-500 shadow-inner flex flex-col justify-center items-center text-center">
                  {thumbnailError && (
                     <p className="text-xs text-red-400 mb-1">썸네일 로딩 실패</p>
                  )}
                  <p className="text-xs text-slate-300">
                    <span className="font-semibold text-slate-200 block mb-1">썸네일 설명:</span> 
                    {analysis.mostViewedShortThumbnailDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 조회수 성장 추이 차트 섹션 */}
          {/* 유효한 히스토리 데이터가 2개 이상일 때만 렌더링 */}
          {analysis.viewsHistory && analysis.viewsHistory.length > 1 && (
            <div className="mt-6 pt-4 border-t border-slate-600">
              <h4 className="text-md font-semibold text-primary-300 mb-3 flex items-center">
                <ChartBarIcon className="w-5 h-5 mr-2 text-primary-400" />
                업로드 수 대비 조회수 성장 추이
              </h4>
              <div className="bg-slate-800 p-2 rounded-lg">
                <ViewsTrendChart data={analysis.viewsHistory} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
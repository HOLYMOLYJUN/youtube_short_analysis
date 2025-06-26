import React from 'react';
import type { ViewsHistoryPoint } from '../types';

interface ViewsTrendChartProps {
  data: ViewsHistoryPoint[]; // {videos, views, date?} 배열 데이터
}

/**
 * 큰 숫자를 읽기 쉬운 문자열로 변환 (예: 1.2M, 350K)
 * @param num - 변환할 숫자
 * @returns 변환된 문자열
 */
const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'; // 백만 단위
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';       // 천 단위
  return num.toString();
};

/**
 * 누적 동영상 수 대비 누적 조회수 성장 추이를 시각화하는
 * SVG 선 그래프 컴포넌트.
 * AI 분석 데이터 중 viewsHistory를 이용함.
 */
export const ViewsTrendChart: React.FC<ViewsTrendChartProps> = ({ data }) => {
  // 최소 2개 데이터가 있어야 선 그래프를 그림
  if (!data || data.length < 2) {
    return <p className="text-sm text-slate-400 text-center py-4">조회수 추이 데이터를 표시하기에 정보가 부족합니다.</p>;
  }

  // SVG 크기와 여백 설정
  const svgWidth = 400;
  const svgHeight = 220;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 }; // 하단/좌측 여백 넉넉히
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // 최대값 계산 (스케일링에 사용)
  const maxVideos = Math.max(...data.map(d => d.videos), 0);
  const maxViews = Math.max(...data.map(d => d.views), 0);

  // 데이터 값을 픽셀 좌표로 변환하는 스케일 함수
  const xScale = (videos: number) => (videos / maxVideos) * chartWidth;
  const yScale = (views: number) => chartHeight - (views / maxViews) * chartHeight; // y축 반전

  // 선 그래프의 SVG 경로 문자열 생성
  const linePath = data
    .map(p => `${xScale(p.videos)},${yScale(p.views)}`)
    .join(' L '); // 선 연결 명령어 "L"

  // 축 눈금 수 설정 (가독성 위해 조절 가능)
  // const numXTicks = Math.min(data.length, 5); // 데이터 많으면 눈금 개수 줄임
  const numYTicks = 5;

  return (
    <div className="w-full overflow-x-auto"> {/* 차트가 너무 넓으면 가로 스크롤 허용 */}
      <svg width={svgWidth} height={svgHeight} className="text-slate-300">
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* X축 선 */}
          <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="currentColor" strokeWidth="1" />
          {/* Y축 선 */}
          <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="currentColor" strokeWidth="1" />

          {/* X축 눈금 및 라벨 */}
          {/* 첫, 중간, 마지막 데이터만 표시해서 시각적 복잡도 감소 */}
          {data.map((point, i) => {
            if (i === 0 || i === data.length - 1 || (data.length > 3 && i === Math.floor(data.length / 2)) ) {
              return (
                <g key={`x-tick-${i}`} transform={`translate(${xScale(point.videos)}, ${chartHeight})`}>
                  <line y2="5" stroke="currentColor" strokeWidth="1" />
                  <text dy="20" textAnchor="middle" fontSize="10px" fill="currentColor">
                    {point.videos} 동영상
                  </text>
                </g>
              );
            }
            return null;
          })}
          {/* X축 제목 */}
          <text
            x={chartWidth / 2}
            y={chartHeight + margin.bottom -10} // 눈금 아래 위치 조정
            textAnchor="middle"
            fontSize="11px"
            fill="currentColor"
            className="font-medium"
          >
            누적 동영상 수
          </text>

          {/* Y축 눈금 및 라벨 */}
          {Array.from({ length: numYTicks + 1 }).map((_, i) => {
            const viewsValue = (maxViews / numYTicks) * i;
            return (
              <g key={`y-tick-${i}`} transform={`translate(0, ${yScale(viewsValue)})`}>
                <line x2="-5" stroke="currentColor" strokeWidth="1" />
                <text dx="-10" dy="3" textAnchor="end" fontSize="10px" fill="currentColor">
                  {formatNumber(viewsValue)}
                </text>
              </g>
            );
          })}
          {/* Y축 제목 */}
          <text
            transform={`translate(${-margin.left + 15}, ${chartHeight / 2}) rotate(-90)`} // 세로 텍스트 회전
            textAnchor="middle"
            fontSize="11px"
            fill="currentColor"
            className="font-medium"
          >
            누적 조회수
          </text>

          {/* 데이터 선 경로 */}
          <path d={`M ${linePath}`} fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" />
          {/* 선 그래디언트 정의 */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(var(--color-primary-500, 96, 165, 250))" /> {/* Tailwind primary 색상 사용 */}
              <stop offset="100%" stopColor="rgb(var(--color-primary-400, 59, 130, 246))" />
            </linearGradient>
          </defs>

          {/* 데이터 점들 (라인 위 원형) */}
          {data.map((point, i) => (
            <circle
              key={`point-${i}`}
              cx={xScale(point.videos)}
              cy={yScale(point.views)}
              r="4" // 반지름 크기
              fill="rgb(var(--color-primary-400, 59, 130, 246))" // 채움색
              stroke="rgb(var(--color-slate-900, 15, 23, 42))" // 어두운 배경에 맞춘 테두리색
              strokeWidth="1.5"
            >
              {/* 마우스 오버 시 툴팁 */}
              <title>{`동영상 ${point.videos}개, 조회수 ${point.views.toLocaleString()}회${point.date ? ` (${point.date})` : ''}`}</title>
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
};

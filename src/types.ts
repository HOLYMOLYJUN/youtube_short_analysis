/**
 * 채널의 조회수 히스토리에서 단일 데이터 포인트를 나타냅니다.
 * 조회수 추세 차트를 그릴 때 사용됩니다.
 */
export interface ViewsHistoryPoint {
  videos: number; // 해당 시점까지 누적된 영상 수
  views: number;  // 해당 시점까지 누적된 조회수
  date?: string;  // 선택 사항: 이 스냅샷의 날짜 (YYYY-MM-DD), AI가 제공
}

/**
 * 시뮬레이션된 유튜브 쇼츠 채널에 대한 종합 분석을 나타냅니다.
 * 이 데이터는 주로 사용자 키워드를 기반으로 Gemini API에서 생성됩니다.
 */
export interface ChannelAnalysis {
  id: string; // 채널의 고유 식별자 (예: 'channel-1')
  shortTitle: string; // 이 채널의 대표적인 쇼츠 영상 제목 (키워드와 관련됨)
  channelName: string; // 채널 이름
  channelAddress: string; // 채널 핸들 (예: '@ChannelHandle')
  creationDate: string; // 채널 생성일 (YYYY-MM-DD)
  videoCount: number; // 채널의 총 영상 개수
  totalViews: number; // 채널 내 모든 영상의 총 조회수
  firstUploadDate: string; // 첫 영상 업로드 날짜 (YYYY-MM-DD)
  latestShortUploadDate: string; // 가장 최근 쇼츠 업로드 날짜 (YYYY-MM-DD)
  contributionAnalysis: string; // 키워드와 관련된 채널의 기여도에 대한 AI 분석
  channelTheme: string; // 채널의 주요 테마 또는 카테고리
  
  // 계산된 필드 (AI로부터 직접 받지 않고 totalViews로부터 유도됨)
  estimatedMinEarnings: number; // 예상 최소 수익 (totalViews * 0.1 KRW)
  estimatedMaxEarnings: number; // 예상 최대 수익 (totalViews * 0.5 KRW)
  
  // 가장 많이 본 쇼츠 영상 데이터
  mostViewedShortTitle: string; // 가장 인기 있는 시뮬레이션 쇼츠 제목
  mostViewedShortThumbnailDescription: string; // 인기 쇼츠 썸네일에 대한 텍스트 설명 (이미지 생성용 프롬프트)
  mostViewedShortThumbnailUrl?: string; // 인기 쇼츠 썸네일의 AI 생성 이미지 (Base64 데이터 URL)
  
  // 조회수 추세를 나타내는 히스토리 데이터
  viewsHistory: ViewsHistoryPoint[]; // 조회수 추세 그래프용 데이터 포인트 배열
}

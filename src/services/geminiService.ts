import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { ChannelAnalysis, ViewsHistoryPoint } from '../types';

// 중요: API 키 설정
// API_KEY는 환경 변수(process.env.API_KEY)로 설정되어야 합니다.
// 이 애플리케이션은 배포 환경에서 환경 변수가 올바르게 설정되었다고 가정합니다.
// API 키를 코드에 직접 하드코딩하지 마세요.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // API 키가 없으면 서버나 빌드 환경에서 이 오류가 기록됩니다.
  // 클라이언트에서는 서비스 실패 시 사용자에게 알림을 보여줍니다.
  console.error("중요: API_KEY가 설정되지 않았습니다. Gemini API 서비스를 사용할 수 없습니다. API_KEY 환경 변수를 설정해주세요.");
}

// GoogleGenAI 클라이언트 초기화
// 느낌표(!)는 API_KEY가 null이 아님을 단언합니다.
// 만약 API_KEY가 null이면 여기서 에러가 발생하는데, 서비스가 정상 동작할 수 없으니 괜찮습니다.
const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Gemini 모델 이름 정의
const TEXT_MODEL_NAME = "gemini-2.5-flash-preview-04-17"; // 텍스트 분석 및 JSON 생성용
const IMAGE_MODEL_NAME = "imagen-3.0-generate-002";       // 썸네일 이미지 생성용

/**
 * Gemini 이미지 생성 API를 사용해 썸네일 이미지를 생성합니다.
 * @param description - 이미지 생성 프롬프트가 될 텍스트 설명
 * @returns 생성된 JPEG 이미지의 Base64 데이터 URL 또는 실패 시 null 반환
 */
const generateThumbnailImage = async (description: string): Promise<string | null> => {
  if (!API_KEY) {
    console.warn("이미지 생성 불가: API_KEY가 설정되지 않았습니다.");
    return null;
  }
  try {
    const response = await ai.models.generateImages({
      model: IMAGE_MODEL_NAME,
      prompt: description,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' }, // JPEG 이미지 1장 요청
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`; // data URL 형식으로 반환
    }
    console.warn("이미지 생성 응답에 예상된 imageBytes가 없습니다. description:", description);
    return null;
  } catch (error) {
    console.error("썸네일 이미지 생성 중 오류 발생:", error);
    return null;
  }
};

/**
 * 주어진 키워드를 기반으로 Gemini API를 사용해 YouTube Shorts 채널 데이터를 시뮬레이션 분석합니다.
 * - 텍스트 모델로 채널 정보(JSON) 생성
 * - 각 채널에 대해 썸네일 이미지 생성
 * - 추정 수익 계산 등 추가 필드 계산
 * @param keyword - 분석할 키워드
 * @returns ChannelAnalysis 객체 배열을 포함하는 Promise
 * @throws API 키 미설정 또는 API 호출/파싱 실패 시 Error 발생
 */
export const analyzeKeywordForShorts = async (keyword: string): Promise<ChannelAnalysis[]> => {
  if (!API_KEY) {
    // 이 에러는 App 컴포넌트에서 잡아서 사용자에게 보여줍니다.
    throw new Error("API 키가 설정되지 않았습니다. 서비스 관리자에게 문의하세요.");
  }
  
  // Gemini 텍스트 모델에게 보낼 종합 프롬프트
  // 특정 JSON 형식으로 3~5개의 가상 채널과 동영상 정보를 생성 요청
  const prompt = `
당신은 키워드를 기반으로 YouTube Shorts 채널 정보를 시뮬레이션하는 AI 어시스턴트입니다.
사용자가 "${keyword}"라는 키워드를 제공하면, 이 키워드와 관련된 3개에서 5개의 가상 YouTube Shorts 동영상과 해당 동영상을 게시한 가상 채널에 대한 정보를 생성해주세요.

각 채널에 대해 다음 정보를 JSON 객체 배열 형식으로 제공해야 합니다:
[
  {
    "id": "고유 ID (예: 'channel-1', 'awesome-cats-channel')",
    "shortTitle": "해당 채널의 일반적인 Shorts 동영상 제목 (키워드 관련)",
    "channelName": "가상 채널 이름",
    "channelAddress": "가상 채널 주소 (예: '@${keyword}Pro', '@FunnyShortsTV')",
    "creationDate": "채널 개설일 (YYYY-MM-DD 형식, 예: '2022-01-15')",
    "videoCount": 120, // 현재 총 동영상 수 (실제 숫자 값)
    "totalViews": 2500000, // 채널의 현재 총 조회수 (실제 숫자 값)
    "firstUploadDate": "첫 동영상 업로드일 (YYYY-MM-DD 형식, 예: '2021-10-20')",
    "latestShortUploadDate": "가장 최근 Shorts 동영상 업로드일 (YYYY-MM-DD 형식, 예: '2023-08-15')",
    "contributionAnalysis": "채널의 동영상들이 '${keyword}' 키워드와 관련하여 어떤 기여를 하는지에 대한 간략한 분석 (1-2 문장, 한국어)",
    "channelTheme": "채널의 주요 주제 또는 카테고리 (한국어)",
    "mostViewedShortTitle": "이 채널에서 가장 인기있는 가상 Shorts 동영상의 제목",
    "mostViewedShortThumbnailDescription": "가장 인기있는 Shorts 동영상의 썸네일 비주얼에 대한 간략한 텍스트 설명 (1-2 문장). 이 설명은 이미지 생성 프롬프트로 사용될 것입니다.",
    "viewsHistory": [ // 조회수 성장 추이 데이터 (3-5개 지점)
      { "videos": 10, "views": 50000, "date": "2021-12-01" }, // 누적 동영상 수, 해당 시점 누적 조회수, 날짜(선택)
      { "videos": 50, "views": 750000, "date": "2022-06-15" },
      { "videos": 120, "views": 2500000, "date": "2023-08-15" } // 마지막 지점은 현재 videoCount 및 totalViews와 일치해야 함
    ]
  }
  // ... 이런 형식으로 2개에서 4개 더
]

규칙:
- 모든 텍스트 값은 한국어로 작성해주세요.
- 제공된 키워드 '${keyword}'와 밀접하게 관련된 콘텐츠를 생성해주세요.
- 날짜는 현실적인 과거 날짜여야 하며, 채널 개설일은 첫 동영상 업로드일보다 이전이거나 같아야 합니다.
- 첫 동영상 업로드일은 가장 최근 Shorts 업로드일보다 이전이거나 같아야 합니다.
- 동영상 수와 총 조회수는 0 이상의 정수여야 합니다.
- 'viewsHistory' 배열:
  - 3개에서 5개의 데이터 포인트를 포함해야 합니다.
  - 각 포인트의 'videos' (누적 동영상 수)와 'views' (누적 조회수)는 시간이 지남에 따라 증가하는 경향을 보여야 합니다.
  - 'videos' 값은 오름차순이어야 합니다.
  - 'viewsHistory'의 마지막 데이터 포인트의 'videos'는 외부의 'videoCount'와 일치해야 하고, 'views'는 외부의 'totalViews'와 일치해야 합니다. 'date'는 'latestShortUploadDate'와 일치하거나 매우 근접해야 합니다.
- 채널 주소는 '@'로 시작하고 공백 없는 영숫자 핸들 형식이어야 합니다.
- 각 객체의 id는 고유해야 합니다.
- 응답은 반드시 유효한 JSON 배열이어야 합니다. 마크다운 코드 블록 없이 순수 JSON만 반환해주세요.
- 'mostViewedShortThumbnailDescription'은 명확하고 시각적인 이미지 생성에 적합해야 합니다.
`;

  try {
    // 1단계: Gemini 텍스트 모델 호출하여 채널 데이터(JSON) 받기
    const textResponse: GenerateContentResponse = await ai.models.generateContent({
      model: TEXT_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json", // JSON 형식으로 응답 요청
        temperature: 0.75, // 창의성 조절 (0~1)
      },
    });

    if (!textResponse.text) {
      throw new Error("AI 응답에 텍스트가 없습니다.");
    }
    let jsonStr = textResponse.text.trim();

    
    // 혹시 마크다운 코드블럭(```json ... ```)으로 감싸져 있다면 제거
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    // JSON 문자열이 배열 형식이 아닐 경우, 배열 부분만 추출 시도
    if (!jsonStr.startsWith('[') || !jsonStr.endsWith(']')) {
        console.warn("비배열 JSON 문자열 수신, 배열 추출 시도 중:", jsonStr);
        const arrayMatch = jsonStr.match(/(\[.*\])/s); // 배열 형태 부분만 추출
        if (arrayMatch && arrayMatch[1]) {
            jsonStr = arrayMatch[1];
            console.log("추출된 배열 문자열:", jsonStr);
        } else {
            // 유효한 배열이 아니면 에러 던짐
            throw new Error("응답이 유효한 JSON 배열 형식이 아닙니다. 모델이 예상치 못한 텍스트를 반환했을 수 있습니다.");
        }
    }

    // JSON 파싱: 기본 채널 데이터 배열
    // 이 데이터에는 수익 추정치, 썸네일 URL은 포함되지 않음
    const parsedBaseData: Omit<ChannelAnalysis, 'estimatedMinEarnings' | 'estimatedMaxEarnings' | 'mostViewedShortThumbnailUrl'>[] = JSON.parse(jsonStr);
    
    if (!Array.isArray(parsedBaseData)) {
      throw new Error("분석 데이터가 배열 형식이 아닙니다. API 응답을 확인해주세요.");
    }

    // 2단계: 각 채널에 대해 썸네일 생성 및 추가 필드 계산
    const resultsWithThumbnailsAndEarnings: Promise<ChannelAnalysis>[] = parsedBaseData.map(async (channel) => {
      const totalViews = Number(channel.totalViews) || 0; // 숫자로 변환 보장
      const videoCount = Number(channel.videoCount) || 0; // 숫자로 변환 보장
      
      // 썸네일 이미지 생성 (설명 있을 때만)
      const thumbnailUrl = channel.mostViewedShortThumbnailDescription 
        ? await generateThumbnailImage(channel.mostViewedShortThumbnailDescription) 
        : null;

      // AI가 준 viewsHistory 유효성 검증 및 보정
      let viewsHistory = channel.viewsHistory || [];
      if (!Array.isArray(viewsHistory) || viewsHistory.length === 0) {
        // 히스토리가 없거나 이상하면 기본값 생성
        console.warn(`채널 ${channel.channelName}의 조회수 히스토리 누락 또는 유효하지 않음. 기본 히스토리 생성.`);
        viewsHistory = [
          { videos: Math.max(1, Math.floor(videoCount / 2)), views: Math.floor(totalViews / 2), date: channel.firstUploadDate || undefined },
          { videos: videoCount, views: totalViews, date: channel.latestShortUploadDate || channel.firstUploadDate || undefined }
        ];
      } else {
        // 마지막 히스토리 데이터가 총 동영상수와 총 조회수와 일치하도록 보정
        const lastPoint = viewsHistory[viewsHistory.length - 1];
        if (lastPoint.videos !== videoCount || lastPoint.views !== totalViews) {
           console.warn(`채널 ${channel.channelName}의 조회수 히스토리 마지막 지점 보정 (AI 데이터 불일치).`);
           viewsHistory[viewsHistory.length -1] = { 
               ...lastPoint, 
               videos: videoCount, 
               views: totalViews, 
               date: channel.latestShortUploadDate || lastPoint.date || channel.firstUploadDate || undefined
           };
        }
      }
      // 숫자 변환 및 동영상 수 기준 오름차순 정렬
      viewsHistory = viewsHistory.map(p => ({
          videos: Number(p.videos) || 0,
          views: Number(p.views) || 0,
          date: p.date // 날짜는 그대로 유지
      })).sort((a,b) => a.videos - b.videos);

      // 최종 ChannelAnalysis 객체 구성
      return {
        id: channel.id || `channel-${Math.random().toString(36).substr(2, 9)}`, // id 없으면 임의 생성
        shortTitle: channel.shortTitle || "N/A",
        channelName: channel.channelName || "N/A",
        channelAddress: channel.channelAddress || "@unknown",
        creationDate: channel.creationDate || "N/A",
        videoCount: videoCount,
        totalViews: totalViews,
        firstUploadDate: channel.firstUploadDate || "N/A",
        latestShortUploadDate: channel.latestShortUploadDate || channel.firstUploadDate || "N/A",
        contributionAnalysis: channel.contributionAnalysis || "N/A",
        channelTheme: channel.channelTheme || "N/A",
        mostViewedShortTitle: channel.mostViewedShortTitle || "N/A",
        mostViewedShortThumbnailDescription: channel.mostViewedShortThumbnailDescription || "내용 없음",
        mostViewedShortThumbnailUrl: thumbnailUrl || undefined, // null이면 undefined로 저장
        // 추정 수익 계산 (간단한 비율 적용)
        estimatedMinEarnings: totalViews * 0.1,
        estimatedMaxEarnings: totalViews * 0.5,
        viewsHistory: viewsHistory,
      };
    });
    
    // 모든 비동기 썸네일 생성 및 데이터 처리 완료 대기
    const finalResults = await Promise.all(resultsWithThumbnailsAndEarnings);

    return finalResults;

  } catch (e) {
    console.error("Gemini API 호출 또는 JSON 파싱 실패:", e);
    // 사용자 친화적인 에러 메시지 전파
    if (e instanceof Error) {
      // 필요시 JSON 파싱 오류 등 구체적 처리 가능
      if (e.message.includes("JSON")) {
          throw new Error(`AI 응답 처리 중 오류 발생: 잘못된 JSON 형식입니다. (${e.message})`);
      }
      throw new Error(`AI 분석 중 오류 발생: ${e.message}`);
    }
    throw new Error("AI 분석 중 알 수 없는 오류가 발생했습니다.");
  }
};

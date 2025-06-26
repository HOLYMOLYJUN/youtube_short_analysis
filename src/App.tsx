import React, { useState, useCallback, useEffect } from 'react';
import { KeywordInput } from './components/KeywordInput';
import { ShortsDisplay } from './components/ShortsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
// import { analyzeKeywordForShorts } from './services/geminiService';
import { getMockChannelData } from "./mockdata/mockdata"
import type { ChannelAnalysis } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';



/**
 * 메인 애플리케이션 컴포넌트입니다.
 * 검색 결과, 로딩 상태, 에러 상태 등 애플리케이션 상태를 관리합니다.
 * 사용자 입력을 처리하고 키워드 분석을 위한 API 호출을 조율합니다.
 */
const App: React.FC = () => {
  // 채널 분석 결과를 저장하는 상태
  const [searchResults, setSearchResults] = useState<ChannelAnalysis[]>([]);
  // API 호출 중 로딩 표시 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 에러 메시지 표시 상태
  const [error, setError] = useState<string | null>(null);


  // const [data, setData] = useState<DataType[] | null>(null);
  // const [response, setResponse] = useState<ApiResponse | null>(null);


  // useEffect(()=>{
    
  //   setIsLoading(true);
  //   setError(null);
  //   axios.get<DataType[]>("http://localhost:8000/hello.php").then(response => {
  //     setData(response.data);
  //   })
  //   .catch(err => {
  //       setError('데이터를 가져오는 중 오류가 발생했습니다.');
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //   });

  // },[])





  /**
   * 키워드가 제출되었을 때 검색 기능을 처리합니다.
   * `geminiService` API 호출을 트리거하고 응답에 따라 상태를 업데이트합니다.
   * @param keyword - 검색할 키워드
   */


  // const handleSearch = useCallback(async (keyword: string) => {
  //   if (!keyword.trim()) {
  //     setError("키워드를 입력해주세요.");
  //     setSearchResults([]);
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError(null);
  //   setSearchResults([]); // 새 검색 전 기존 결과 초기화

  //   try {
  //     // Gemini 서비스 호출하여 키워드 분석 실행
  //     const results = await analyzeKeywordForShorts(keyword);
  //     if (results.length === 0) {
  //       setError("분석 결과를 찾을 수 없습니다. 다른 키워드로 시도해보세요.");
  //     }
  //     setSearchResults(results);
  //   } catch (err) {
  //     console.error("분석 중 오류 발생:", err);
  //     const errorMessage = err instanceof Error ? `분석 중 오류 발생: ${err.message}` : "알 수 없는 오류가 발생했습니다.";
  //     setError(errorMessage);
  //     setSearchResults([]); // 오류 시 결과 초기화
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []); // useCallback으로 함수 메모이제이션


  const handleSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setError("키워드를 입력해주세요.");
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      // 기존 AI 호출 대신 mock 데이터 반환
      // 실제 API 호출은 제거 혹은 주석 처리
      // const results = await analyzeKeywordForShorts(keyword);
      
      // mock 데이터 반환 (동기 함수지만 await 붙여도 무방)
      const results = getMockChannelData();

      if (results.length === 0) {
        setError("분석 결과를 찾을 수 없습니다. 다른 키워드로 시도해보세요.");
      }
      setSearchResults(results);
    } catch (err) {
      console.error("분석 중 오류 발생:", err);
      const errorMessage = err instanceof Error ? `분석 중 오류 발생: ${err.message}` : "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(()=>{

    const results = getMockChannelData();

    console.log(results);
  },[])





  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-slate-800 shadow-2xl rounded-lg p-6 md:p-10">
          {/* 키워드 입력 컴포넌트 */}
          <KeywordInput onSearch={handleSearch} isLoading={isLoading} />
          
          {/* 로딩 상태 표시 */}
          {isLoading && (
            <div className="flex justify-center items-center mt-8">
              <LoadingSpinner />
              <p className="ml-3 text-lg text-primary-400">쇼츠 채널 분석 중...</p>
            </div>
          )}

          {/* 에러 메시지 표시 */}
          {error && !isLoading && <ErrorMessage message={error} />}
          
          {/* 분석 결과 표시 */}
          {!isLoading && !error && searchResults.length > 0 && (
            <ShortsDisplay results={searchResults} />
          )}

          {/* 초기 상태 또는 결과 없음 메시지 */}
           {!isLoading && !error && searchResults.length === 0 && (
             <div className="mt-8 text-center text-gray-400">
               <p>분석할 키워드를 입력하고 "분석 시작" 버튼을 클릭하세요.</p>
             </div>
           )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;

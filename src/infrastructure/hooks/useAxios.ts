import HttpClient from '@/infrastructure/http/HttpClient';
import { useCallback, useEffect } from 'react';

/**
 * Hook to provide an Axios instance with request cancellation support
 */
const useAxios = () => {
  /**
   * Generate a new `AbortSignal` for the current request
   */
  const newAbortSignal = useCallback(() => HttpClient.createAbortSignal(), []);

  /**
   * Cleanup any ongoing requests on component unmount
   */
  useEffect(() => {
    return () => {
      HttpClient.cancelRequests();
    };
  }, []);

  return {
    axiosInstance: HttpClient.getAxiosInstance(),
    newAbortSignal,
  };
};

export default useAxios;

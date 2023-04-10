import { useState, useCallback } from "react";
import { isAxiosError, AxiosResponse } from "axios";

type AsyncFunc = (...args: any[]) => Promise<AxiosResponse>;

// export const useApi = <T = any>(
export const useApi = <T>(
  apiFn: AsyncFunc,
  reset: boolean = false
): [
  data: T | undefined,
  error: AxiosResponse | undefined,
  loading: boolean,
  call: Function
] => {
  // const [data, setData] = useState<object>();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse>();

  const call = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      // TEST
      if (reset) {
        error && setError(undefined);
        data && setData(undefined);
      }
      // ====

      try {
        const result = await apiFn(...args);
        setData(result.data);
        // setData(result.data); ??
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
          setError(error.response);
        } else throw new Error("different error than axios");
      } finally {
        setLoading(false);
      }
    },
    [apiFn, error, data, reset]
  );

  return [data, error, loading, call];
};

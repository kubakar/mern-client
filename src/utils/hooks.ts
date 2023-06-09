import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { isAxiosError, AxiosResponse } from "axios";

type AsyncFunc = (...args: any[]) => Promise<any>;
type VoidAsyncFunc = () => Promise<void>;

const waiting = async (ms = 1000) => {
  const wait = new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: `waited ${ms}`,
        }),
      ms
    )
  );
  return wait;
}; // TESTING

export const useApi = <T, U = VoidAsyncFunc>(
  apiFn: AsyncFunc,
  reset: boolean = false
): [
  data: T | undefined,
  error: AxiosResponse | undefined,
  loading: boolean,
  call: U | VoidAsyncFunc,
  setter: Dispatch<SetStateAction<T | undefined>>
] => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosResponse>();

  const call = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      // reset
      if (reset) {
        error && setError(undefined);
        data && setData(undefined);
      }

      try {
        await waiting(1000); // TEST
        const result = await apiFn(...args);
        setData(result.data);
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

  return [data, error, loading, call, setData];
};

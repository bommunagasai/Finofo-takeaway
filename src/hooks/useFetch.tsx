import { useState } from 'react';

interface FetchOptions {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}


const useFetch = (options: FetchOptions) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setIsFetching(true);
      setError(null);
      setData(null);
      const response = await fetch(options.url,
        {
          method: options.method,
          headers: options.headers,
          mode: 'no-cors',
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, data, error, fetch: fetchData };
};

export default useFetch;
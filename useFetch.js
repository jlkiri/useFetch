import { useState, useEffect, useRef } from "react";

async function parseToJSON(response) {
  return await response.json();
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function useFetch({
  url,
  delay,
  options,
  fetchFn = window.fetch,
  parseFn = parseToJSON
}) {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function requestData() {
    try {
      const response = await fetchFn(url, options);
      const value = await parseFn(response);
      setValue(value);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    requestData();
  }, [url]);

  useInterval(requestData, delay);

  return { value, isLoading, error, requestData };
}

export default useFetch;

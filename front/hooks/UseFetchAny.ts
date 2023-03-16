import { useState, useEffect } from "react";

export const useFetchAny = (url: string, options?: {
  method: string,
  headers: {
    'Content-Type': string,
    'authorization': string
  },
  body: string

}) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(json);
                setLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [url, options]);

    return { response, error, loading };
}
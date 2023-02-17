import { useState, useEffect } from "react";
import axios from "axios";

export default function useAxios({ url, method, body = null, headers }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function fetchData() {
    if (!url) return;
    setLoading(true);
    axios({
      method,
      url,
      data: body,
      headers: headers ? { ...headers } : {},
    })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [method, url, body]);

  return { response, error, loading };
}
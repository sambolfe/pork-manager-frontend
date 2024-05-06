import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando requisição para:', url);
        setLoading(true);
        const response = await axios.get(url);
        console.log('Resposta recebida:', response);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro na requisição:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel any ongoing requests or cleanup tasks here, if necessary
    };
  }, [url]);

  return { data, loading, error };
};

export default useApi;

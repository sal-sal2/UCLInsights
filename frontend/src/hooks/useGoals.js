import { useState, useEffect, useCallback } from 'react';
import { fetchGoals } from '../services/goalsService';


const useGoals = (filters = {}) => {
  const [data,    setData   ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError  ] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGoals(filters);
      setData(result);
    } catch (err) {
      setError(err.message ?? 'Failed to load goals data');
    } finally {
      setLoading(false);
    }
 
  }, [filters.name, filters.team, filters.nation, filters.position]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
};

export default useGoals;

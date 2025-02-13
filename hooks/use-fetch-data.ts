import { useState, useEffect } from "react";
import { TreeRecord } from "@/types/records";
import { toast } from "sonner";

interface UseAthenaQueryResult {
  data: TreeRecord[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useAthenaQuery(): UseAthenaQueryResult {
  const [data, setData] = useState<TreeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/calls/queryAthena", {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido');
      setError(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}

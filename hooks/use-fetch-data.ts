import { useState, useEffect } from "react";

interface AthenaResult {
  [key: string]: string | null;
}

export function useAthenaQuery() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/calls/queryAthena");

        if (!response.ok) {
          throw new Error("Error fetching Athena query results");
        }

        const result = await response.json();
        console.log(result);

        // Extraer filas de los resultados
        const rows = result?.ResultSet?.Rows || [];
        if (rows.length === 0) {
          setData([]);
          return;
        }

        // Extraer encabezados (la primera fila suele contener los nombres de las columnas)
        const headers = rows[0].Data.map((col: any) => col.VarCharValue);

        // Extraer datos de las filas restantes
        const formattedData = rows.slice(1).map((row: any) => {
          const values = row.Data.map((col: any) => col.VarCharValue || null);
          return Object.fromEntries(headers.map((key, index) => [key, values[index]]));
        });

        setData(formattedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

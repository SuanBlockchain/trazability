import { NextResponse } from "next/server";
import {
  StartQueryExecutionCommand,
  GetQueryResultsCommand,
  GetQueryExecutionCommand,
  AthenaClient,
  QueryExecutionState,
} from "@aws-sdk/client-athena";
import { TreeRecord } from "@/types/records";

const athenaClient = new AthenaClient({
  region: process.env.ATHENA_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

async function checkQueryExecution(queryExecutionId: string) {
  const maxIntentos = 50;
  let intentos = 0;

  while (intentos < maxIntentos) {
    const queryExecution = await athenaClient.send(
      new GetQueryExecutionCommand({
        QueryExecutionId: queryExecutionId,
      })
    );

    const estado = queryExecution.QueryExecution?.Status?.State;

    if (estado === QueryExecutionState.SUCCEEDED) {
      return true;
    }

    if (
      estado === QueryExecutionState.FAILED ||
      estado === QueryExecutionState.CANCELLED
    ) {
      throw new Error(`La consulta falló con estado: ${estado}`);
    }

    // Esperar 1 segundo antes del siguiente intento
    await new Promise((resolve) => setTimeout(resolve, 1000));
    intentos++;
  }

  throw new Error("Tiempo de espera agotado");
}

async function queryAthena() {
  try {
    // Configurar la consulta
    const queryParams = {
      QueryString: `SELECT * FROM "${process.env.ATHENA_DATABASE}"."${process.env.ATHENA_TABLE}" limit 10;`,
      QueryExecutionContext: {
        Database: process.env.ATHENA_DATABASE,
      },
      ResultConfiguration: {
        OutputLocation: process.env.ATHENA_OUTPUT_LOCATION,
      },
      WorkGroup: process.env.ATHENA_WORKGROUP,
    };

    // Ejecutar la consulta
    const startQueryResponse = await athenaClient.send(
      new StartQueryExecutionCommand(queryParams)
    );

    const queryExecutionId = startQueryResponse.QueryExecutionId;
    
    // Esperar a que la consulta termine
    await checkQueryExecution(queryExecutionId || "");

    // Obtener resultados
    const queryResults = await athenaClient.send(
      new GetQueryResultsCommand({
        QueryExecutionId: queryExecutionId,
      })
    );

    return queryResults.ResultSet?.Rows || [];
  } catch (error) {
    console.error("Error al consultar Athena:", error);
    throw error;
  }
}


function transformQueryResults(rows: any[]): TreeRecord[] {
  if (!rows.length) return [];

  const headers = rows[0].Data?.map((col: any) => col.VarCharValue) || [];

  return rows
    .slice(1)
    .map((row) => {
      const values = row.Data?.map((col: any) => col.VarCharValue ?? null);
      const record = Object.fromEntries(
        headers.map((key: string, index: number) => [key, values[index]])
      );
      return record as TreeRecord;
    })
    .filter((record) => record._id !== null);
}

export async function GET() {
  try {
    const resultados = await queryAthena();
    return NextResponse.json(transformQueryResults(resultados) || []);
  } catch (error) {
    return NextResponse.json(
      { error:  `Error al procesar la consulta: ${error}` },
      { status: 500 }
    );
  }
}

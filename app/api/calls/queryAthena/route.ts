import { NextRequest, NextResponse } from "next/server";
import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  QueryExecutionState,
  StartQueryExecutionCommandInput,
  QueryExecution,
} from "@aws-sdk/client-athena";
import { TreeRecord } from "@/types/records";

// Configuración común
const ATHENA_CONFIG = {
  region: process.env.NEXT_PUBLIC_ATHENA_REGION || "",
  database: process.env.NEXT_PUBLIC_ATHENA_DATABASE || "",
  table: process.env.NEXT_PUBLIC_ATHENA_TABLE || "",
  outputLocation: process.env.NEXT_PUBLIC_ATHENA_OUTPUT_LOCATION || "",
  workGroup: process.env.NEXT_PUBLIC_ATHENA_WORKGROUP || "",
} as const;

const client = new AthenaClient({ region: ATHENA_CONFIG.region });
function validateConfig() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_ATHENA_REGION',
    'NEXT_PUBLIC_ATHENA_DATABASE',
    'NEXT_PUBLIC_ATHENA_TABLE',
    'NEXT_PUBLIC_ATHENA_OUTPUT_LOCATION',
    'NEXT_PUBLIC_ATHENA_WORKGROUP',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    return {
      error: true,
      response: NextResponse.json(
        { 
          error: `Missing required environment variables: ${missingVars.join(', ')}`
        },
        { status: 500 }
      )
    };
  }

  return { error: false };
}

/**
 * Ejecuta una consulta en Athena y espera por los resultados
 * @param input - Parámetros de la consulta
 * @returns Promise con la ejecución de la consulta
 */
async function executeAthenaQuery(
  input: StartQueryExecutionCommandInput
): Promise<QueryExecution> {
  const queryCommand = new StartQueryExecutionCommand(input);
  const { QueryExecutionId: queryExecutionId } = await client.send(
    queryCommand
  );

  if (!queryExecutionId) {
    throw new Error("QueryExecutionId is undefined");
  }

  let retryIn = 0;
  let queryExecution: QueryExecution;

  do {
    // La consulta se ejecuta de forma asíncrona, esperar hasta 1s por intento
    if (retryIn < 1000) {
      retryIn += 250;
    }
    await new Promise((resolve) => setTimeout(resolve, retryIn));

    const statusCommand = new GetQueryExecutionCommand({
      QueryExecutionId: queryExecutionId,
    });
    const response = await client.send(statusCommand);
    queryExecution = response.QueryExecution!;
  } while (
    queryExecution.Status!.State === QueryExecutionState.QUEUED ||
    queryExecution.Status!.State === QueryExecutionState.RUNNING
  );

  return queryExecution;
}

/**
 * Transforma los resultados de Athena en un formato más manejable
 * @param rows - Filas de resultados de Athena
 * @returns Array de objetos con los datos transformados
 */
function transformQueryResults(rows: any[]): TreeRecord[] {
  if (!rows.length) return [];

  const headers = rows[0].Data?.map((col: any) => col.VarCharValue) || [];

  return rows.slice(1).map((row) => {
    const values = row.Data?.map((col: any) => col.VarCharValue ?? null);
    const record = Object.fromEntries(
      headers.map((key: string, index: number) => [key, values[index]])
    );
    return record as TreeRecord;
  });
}

export async function GET(request: NextRequest) {
  const configValidation = validateConfig();
  if (configValidation.error) {
    return configValidation.response;
  }

  // Verificar la conexión con AWS
  if (!client) {
    throw new Error('AWS Athena client not initialized');
  }
  
  try {
    const queryInput = {
      QueryString: `SELECT * FROM "${ATHENA_CONFIG.database}"."${ATHENA_CONFIG.table}" limit 10;`,
      QueryExecutionContext: { Database: ATHENA_CONFIG.database },
      ResultConfiguration: {
        OutputLocation: ATHENA_CONFIG.outputLocation,
      },
      WorkGroup: ATHENA_CONFIG.workGroup,
    };

    const queryExecution = await executeAthenaQuery(queryInput);

    if (queryExecution.Status!.State === QueryExecutionState.FAILED) {
      throw new Error(
        `Query failed: ${queryExecution.Status!.StateChangeReason}`
      );
    }

    if (queryExecution.Status!.State === QueryExecutionState.CANCELLED) {
      throw new Error("Query was cancelled");
    }

    // Obtener resultados
    const resultCommand = new GetQueryResultsCommand({
      QueryExecutionId: queryExecution.QueryExecutionId,
    });
    const results = await client.send(resultCommand);

    return NextResponse.json(
      transformQueryResults(results.ResultSet?.Rows || [])
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Error executing query" },
      { status: 500 }
    );
  }
}

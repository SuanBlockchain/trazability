import { NextRequest, NextResponse } from "next/server";
import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
} from "@aws-sdk/client-athena";

const client = new AthenaClient({ region: "us-east-2" });

export async function GET(request: NextRequest) {
  try {
    // Iniciar la consulta
    const queryCommand = new StartQueryExecutionCommand({
      QueryString: 'SELECT * FROM "trazabilty-db"."kobol-tool-datadata" limit 10;', // Asegúrate de que el nombre de la tabla sea correcto
      QueryExecutionContext: { Database: "trazabilty-db" },
      ResultConfiguration: {
        OutputLocation:
          "s3://suan-workshop-data-lake-delete/customer_review_parquet/results/",
      },
      WorkGroup: "suan-workshop-datalake-workgroup-delte",
    });

    const queryResponse = await client.send(queryCommand);
    const queryExecutionId = queryResponse.QueryExecutionId;

    if (!queryExecutionId) {
      throw new Error("QueryExecutionId is undefined");
    }

    // Esperar a que la consulta termine
    let queryStatus = "QUEUED";
    while (queryStatus === "QUEUED" || queryStatus === "RUNNING") {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos antes de revisar de nuevo

      const statusCommand = new GetQueryExecutionCommand({
        QueryExecutionId: queryExecutionId,
      });

      const statusResponse = await client.send(statusCommand);
      queryStatus = statusResponse.QueryExecution?.Status?.State || "UNKNOWN";

      if (queryStatus === "FAILED" || queryStatus === "CANCELLED") {
        throw new Error(`Query failed or was cancelled: ${queryStatus}`);
      }
    }

    // Obtener resultados una vez la consulta haya finalizado
    const resultCommand = new GetQueryResultsCommand({
      QueryExecutionId: queryExecutionId,
    });
    const results = await client.send(resultCommand);

    return NextResponse.json(results);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Error executing query" },
      { status: 500 }
    );
  }
}

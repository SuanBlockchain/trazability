"use client";

import { DataTable } from "@/components/ui/data-table";
import { useAthenaQuery } from "@/hooks/use-fetch-data";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { TreeRecord, TransformedRecord } from "@/types/records";
import { columns } from "./records-table/columns";
import { Skeleton } from "@/components/ui/skeleton";

const transformData = (data: TreeRecord[]): TransformedRecord[] => {
  return data.map((record) => ({
    id: record._id,
    suanId: record.i_suanid,
    username: record["a_data/a_username"],
    conglomerado: record["a_data/a_conglomerado"],
    fecha: record["a_data/a_submission_date"],
    subparcela: record["a_data/a_subparcela"],
    noIndividuo: record["a_data/a_no_ia_individuo"],
    categoria: record["a_data/a_category"],
    identificacionArbol: record["a_data/a_identificacion_arbol"],
    geopoint: record["a_data/a_geopoint_map"],
    nombreComun: record["b_data/b_nombre_comun"],
    especie: record["b_data/b_especie"],
    familia: record["b_data/b_familia"],
    fotoArbol: record["b_data/b_foto_arbol"],
    fotoTronco: record["b_data/b_foto_tronco"],
    fotoHojas: record["b_data/b_foto_hojas"],
    arbolVivo: record["c_data/c_arbol_vivo"],
    estadoArbol: record["c_data/c_estado_arbol"],
    fotoArbolAfectada: record["c_data/c_foto_arbol_afectada"],
    talloTipo: record["d_data/d_tallo_tipo"],
    equipo1: record["d_data/d_equipo_1"],
    diametroFuste: record["d_data/d_diametro_h_fuste_1"],
    observacion: record["d_data/d_observacion"],
    distancia: record["d_data/d_distancia"],
    equipo2: record["d_data/d_equipo_2"],
    alturaArbol: record["d_data/d_ht_arbol_fuste_1"],
    submissionTime: record._submission_time,
    submittedBy: record._submitted_by,
    geolocation: record._geolocation,
  }));
};

export default function RecordsTable() {
  const { data, isLoading, refetch } = useAthenaQuery();
  const transformedData = transformData(data);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <div className="rounded-md border">
          <div className="h-12 border-b px-4">
            <Skeleton className="h-6 w-full mt-3" />
          </div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="p-4 border-b last:border-none">
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <DataTable columns={columns} data={transformedData} />;
}

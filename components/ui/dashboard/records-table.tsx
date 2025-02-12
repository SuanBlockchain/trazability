import { DataTable } from "@/components/ui/data-table";
import { useAthenaQuery } from "@/hooks/use-fetch-data";
import { ColumnDef } from "@tanstack/react-table";

// Tipo para los datos que llegan de la API
type TreeRecord = {
  _id: string;
  "formhub/uuid": string;
  i_suanid: string;
  "a_data/a_username": string;
  "a_data/a_conglomerado": string;
  "a_data/a_submission_date": string;
  "a_data/a_subparcela": string;
  "a_data/a_no_ia_individuo": string;
  "a_data/a_category": string;
  "a_data/a_identificacion_arbol": string;
  "a_data/a_geopoint_map": string;
  "b_data/b_nombre_comun": string;
  "b_data/b_especie": string;
  "b_data/b_familia": string;
  "b_data/b_foto_arbol": string;
  "b_data/b_foto_tronco": string;
  "b_data/b_foto_hojas": string;
  "c_data/c_arbol_vivo": string;
  "c_data/c_estado_arbol": string;
  "c_data/c_foto_arbol_afectada": string;
  "d_data/d_tallo_tipo": string;
  "d_data/d_equipo_1": string;
  "d_data/d_diametro_h_fuste_1": string;
  "d_data/d_observacion": string;
  "d_data/d_distancia": string;
  "d_data/d_equipo_2": string;
  "d_data/d_ht_arbol_fuste_1": string;
  __version__: string;
  "meta/instanceid": string;
  _xform_id_string: string;
  _uuid: string;
  _attachments: string;
  _status: string;
  _geolocation: string;
  _submission_time: string;
  _tags: string;
  _notes: string;
  _validation_status: string;
  _submitted_by: string;
};

// Tipo para los datos transformados
type TransformedRecord = {
  id: string;
  suanId: string;
  username: string;
  conglomerado: string;
  fecha: string;
  subparcela: string;
  noIndividuo: string;
  categoria: string;
  identificacionArbol: string;
  geopoint: string;
  nombreComun: string;
  especie: string;
  familia: string;
  fotoArbol: string;
  fotoTronco: string;
  fotoHojas: string;
  arbolVivo: string;
  estadoArbol: string;
  fotoArbolAfectada: string;
  talloTipo: string;
  equipo1: string;
  diametroFuste: string;
  observacion: string;
  distancia: string;
  equipo2: string;
  alturaArbol: string;
  submissionTime: string;
  submittedBy: string;
  geolocation: string;
};

// Definición de columnas actualizada
export const columns: ColumnDef<TransformedRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "suanId",
    header: "SUAN ID",
  },
  {
    accessorKey: "username",
    header: "Usuario",
  },
  {
    accessorKey: "conglomerado",
    header: "Conglomerado",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "subparcela",
    header: "Subparcela",
  },
  {
    accessorKey: "noIndividuo",
    header: "No. Individuo",
  },
  {
    accessorKey: "categoria",
    header: "Categoría",
  },
  {
    accessorKey: "identificacionArbol",
    header: "ID Árbol",
  },
  {
    accessorKey: "geopoint",
    header: "Geopoint",
  },
  {
    accessorKey: "nombreComun",
    header: "Nombre Común",
  },
  {
    accessorKey: "especie",
    header: "Especie",
  },
  {
    accessorKey: "familia",
    header: "Familia",
  },
  {
    accessorKey: "fotoArbol",
    header: "Foto Árbol",
  },
  {
    accessorKey: "fotoTronco",
    header: "Foto Tronco",
  },
  {
    accessorKey: "fotoHojas",
    header: "Foto Hojas",
  },
  {
    accessorKey: "arbolVivo",
    header: "Árbol Vivo",
  },
  {
    accessorKey: "estadoArbol",
    header: "Estado",
  },
  {
    accessorKey: "fotoArbolAfectada",
    header: "Foto Árbol Afectada",
  },
  {
    accessorKey: "talloTipo",
    header: "Tipo Tallo",
  },
  {
    accessorKey: "equipo1",
    header: "Equipo 1",
  },
  {
    accessorKey: "diametroFuste",
    header: "Diámetro Fuste",
  },
  {
    accessorKey: "observacion",
    header: "Observación",
  },
  {
    accessorKey: "distancia",
    header: "Distancia",
  },
  {
    accessorKey: "equipo2",
    header: "Equipo 2",
  },
  {
    accessorKey: "alturaArbol",
    header: "Altura Árbol",
  },
  {
    accessorKey: "submissionTime",
    header: "Fecha Envío",
  },
  {
    accessorKey: "submittedBy",
    header: "Enviado Por",
  },
  {
    accessorKey: "geolocation",
    header: "Geolocalización",
  },
];

export default function RecordsTable() {
  const { data: rawData } = useAthenaQuery();

  // Función para transformar los datos
  const transformData = (data: TreeRecord[]): TransformedRecord[] => {
    if (!data) return [];

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

  const transformedData = transformData(rawData);

  return <DataTable columns={columns} data={transformedData} />;
}

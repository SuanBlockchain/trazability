import { TransformedRecord } from "@/types/records";
import { ColumnDef } from "@tanstack/react-table";

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
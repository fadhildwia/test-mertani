export interface SensorInterface {
  id: number | null;
  nama: string;
  idSensor: string;
  faktorKalibrasi: string;
  satuan: string;
  deskripsi: string;
}

export type ModalMode = 'create' | 'edit';
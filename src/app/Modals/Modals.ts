export interface userDataList {
  email: string;
  id: number;
  jenisKelamin: string;
  namaBelakang: string;
  namaDepan: string;
  password: string;
  tanggalLahir?: number; // Menjadikan tanggalLahir menjadi opsional
}

export interface catDataList {
  id: number;
  name: string;
  description: string;
}

export interface prodDataList {
  id: number;
  name: string;
  description: string;
  gambar: string;
  category: string;
  stock: number;
}

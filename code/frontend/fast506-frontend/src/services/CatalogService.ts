import { Catalog } from "../models/Catalog";
import { CategoriesCatalog } from "../models/CategoriesCatalog";
import { UnitGroup } from "../models/UnitGroup";

const API_URL = "http://localhost:8080/api/catalogs";

//fetch con getAll
//puede ser importada en otros archivos
export const getAll = async (): Promise<Catalog[]> => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
  const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
  const data = await res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
  console.log("Data recibida:", data); // para ver qué llega
  return Array.isArray(data) ? data : []; //si es un array lo retorna, si no retorna un array vacío
}

export const getAvailable = async (): Promise<UnitGroup[]> => {
  const res = await fetch(`${API_URL}/available`);
  const data = await res.json();
  console.log("Data recibida: ", data);
  return Array.isArray(data) ? data : [];
};

export const deleteCatalog = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};

export const create = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      body: formData
    }
  );
  const data =+ await response.text();
  if (!response.ok) {
    throw new Error("Error al guardar");
  }
  return data;
};

export const update = async (id: number, formData: FormData) => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    body: formData
  });
  const data =+ await response.text();
  if (!response.ok) {
    throw new Error("Error al actualizar");
}
  return data;
};


export const getCategories = async (): Promise<CategoriesCatalog[]> => {
  const res = await fetch(`${API_URL}/categories`);
  const data = await res.json();
  console.log("Data recibida: ", data);
  return Array.isArray(data) ? data : [];
};

export const getCatalogByBodyWork = async (bodyWork: string): Promise<Catalog[]> => {
  const res = await fetch(`${API_URL}/by-bodywork?bodywork=${bodyWork}`); 
  const data = await res.json();
  console.log("Data recibida: ", data);
  return Array.isArray(data) ? data : [];
};

export const getCatalogById = async (id: number) => {
  const response = await fetch(`${API_URL}/findById/${id}`);
  const data = await response.json();
  return data;
};
import { Catalog } from "../models/Catalog";
const API_URL = "http://localhost:8080/api/catalogs";

//fetch con getAll
//puede ser importada en otros archivos
export const getAll = async (): Promise<Catalog[]> => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
    const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
    const data = await res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
    console.log("Data recibida:", data); // para ver qué llega
    return Array.isArray(data) ? data : []; //si es un array lo retorna, si no retorna un array vacío
}

export const deleteCatalog = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};
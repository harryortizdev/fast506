import { Supplier } from "../models/Supplier";
const API_URL = "http://localhost:8080/api/suppliers";

// fetch con getAll
// puede ser importada en otros archivos
export const getAll = async () => { // async llamada asincrónica que puede tardar tiempo (sin esto no se puede usar await)
    const res = await fetch(`${API_URL}/all`); // hace una petición al http get y await pausa la función hasta que responda el servidor
    return res.json(); // la respuesta se convierte a .json para que react lo pueda utilizar
}

// fetch con add
export const create = async (supplier: Partial<Supplier>) => { // llamada asincrónica
  const res = await fetch(`${API_URL}/create`, { // hace la comunicación al http create
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error("Error del backend:", error);
    throw new Error(`Error creating supplier: ${error}`);
  }
  return res.text();
};

// fetch con delete
export const deleteSupplier = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};

// fetch con update
export const updateSupplier = async (supplier: Supplier) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });
  return res.text();
};
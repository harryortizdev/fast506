import { Sales } from "../models/Sales";
const API_URL = "http://localhost:8080/api/sales";

export const getAll = async () => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
  const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
  return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}

export const create = async (unit: Partial<Sales>) => { //llamada asincronica
  const res = await fetch(`${API_URL}/create`, { //hace la comunicación al http create 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unit),
  });
  return res.text();
};
//fecth con delete
export const deleteSales = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};
//fect con update
export const updateSales = async (sales: Sales) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sales),
  });
  return res.text();
};

export const getUnitsByCatalog = async (idCatalog: number) => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
  const res = await fetch(`${API_URL}/filteredUnitsByCatalog?idCatalog=${idCatalog}`); //hace una petición al http get y await pausa la función hasta que responda el servidor
  return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}

export const getUnitsByColor = async (idCatalog: number, traction: string) => {
  const res = await fetch(`${API_URL}/filteredUnitsByColor?idCatalog=${idCatalog}&traction=${traction}`);
  const data = await res.json();
  console.log("API COLORS:", data);
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data.data)) {
    return data.data;
  }
  if (Array.isArray(data.units)) {
    return data.units;
  }
  return [];
};

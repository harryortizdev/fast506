import { Branch } from "../models/Branch";
const API_URL = "http://localhost:8080/api/branch";


export const getAll = async () => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
    const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
    return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}
//fecth con add
export const create = async (branch: Partial<Branch>) => { //llamada asincronica
  const res = await fetch(`${API_URL}/create`, { //hace la comunicación al http create 
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  return res.text();
};
//fecth con delete
export const deleteBranch = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};
//fect con update
export const updateBranch = async (branch: Branch) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  return res.text();
};
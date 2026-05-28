import { Quotation } from "../models/Quotation";
const API_URL = "http://localhost:8080/api/quotation";
const API_URL_EMAIL= "http://localhost:8080/api/email";


export const getAll = async () => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
    const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
    return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}
//fecth con add
export const create = async (quotation: Partial<Quotation>) => { //llamada asincronica
  const res = await fetch(`${API_URL}/create`, { //hace la comunicación al http create 
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotation),
  });
  return res.text();
  
};

export const sendEmailCreate = async (quotation: Partial<Quotation>) => { //llamada asincronica
  const res = await fetch(`${API_URL_EMAIL}/quotation`, { //hace la comunicación al http create 
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotation),
  });
  return res.text();
};

export const sendEmailUpdate= async (quotation: Quotation) => {
  const res = await fetch(`${API_URL_EMAIL}/quotation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotation),
  });
  return res.text();
};

//fecth con delete
export const deleteQuotation = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};
//fect con update
export const updateQuotation = async (quotation: Quotation) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quotation),
  });
  return res.text();
};


export const getUnitsByCatalog = async (idCatalog: number) => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
    const res = await fetch(`${API_URL}/filteredUnitsByCatalog?idCatalog=${idCatalog}`); //hace una petición al http get y await pausa la función hasta que responda el servidor
    return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}
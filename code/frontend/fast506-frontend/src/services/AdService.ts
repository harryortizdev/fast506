import { Ad } from "../models/Ad"
const API_URL = "http://localhost:8080/api/ad";


export const getAll = async () => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
  const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
  return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}

export const deleteAd = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};

export const create = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Error al guardar el anuncio");
  }


  const data = await response.text();
  return data;
};

export const update = async (id: number, formData: FormData) => {
  const response = await fetch(`${API_URL}/update/${id}`, {
    method: "PUT",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el anuncio");
  }

  const data = await response.text();
  return data;
};
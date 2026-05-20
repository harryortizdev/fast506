import { Testdrive } from "../models/Testdrive";
import { Client } from "../models/Client";
const API_URL = "http://localhost:8080/api/testdrive";


export const getAll = async () => { //async llamada asincronica que puede tardar tiempo (sin esto no se puede usar await)
  const res = await fetch(`${API_URL}/all`); //hace una petición al http get y await pausa la función hasta que responda el servidor
  return res.json(); //la respuesta se convierte a .json para que react lo pueda utilizar
}
//fecth con add
export const create = async (Testdrive: Partial<Testdrive>) => { //llamada asincronica
  const res = await fetch(`${API_URL}/create`, { //hace la comunicación al http create 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Testdrive),
  });
  return res.text();
};
//fecth con delete
export const deleteTestdrive = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });
  return res.text();
};
//fect con update
export const updateTestdrive = async (Testdrive: Testdrive) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Testdrive),
  });
  return res.text();
};

export const getOccupiedHoursByDate = async (date: string): Promise<string[]> => {
  const res = await fetch(`${API_URL}/occupied-hours?date=${date}`); //hace una petición GET enviando la fecha elegida como parámetro de ruta
  if (!res.ok) return []; //si el servidor responde con error, devolvemos un arreglo vacío para evitar caídas en el select
  return res.json(); //retorna el arreglo de strings con las horas ocupadas, por ejemplo: ["12:00", "14:00"]
};

export const getClientById = async (id: number): Promise<Client | null> => {
    try {
        // Pasamos el string de la caja de texto, Spring Boot lo parseará a int en el RequestParam
        const response = await fetch(`${API_URL}/search?id=${id}`);
        
        if (!response.ok) {
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error al conectar con el servidor de clientes:", error);
        return null;
    }
};
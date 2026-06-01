import { Administrator } from "../models/Administrator";
const API_URL = "http://localhost:8080/api/admins";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch(`${API_URL}/all`);
    return res.json();

}

// Fetch add

export const create = async (administrator: Partial<Administrator>) => {
   


    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(administrator),
    });
    if (!res.ok) {
        
        console.error("Respuesta del servidor:", res.status, res.statusText);
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error creating administrator: ${res.statusText}`);
        
    }
    return res.text();

};

// Fetch delete

export const deleteAdministrator = async (id: number) => {

    const res = await fetch(`${API_URL}/delete?id=${id}`, {

        method: "DELETE",

    });

    return res.text();

};

// Fetch update

export const updateAdministrator = async (administrator: Administrator) => {

    console.log("Datos enviados en PUT:", administrator);
    const res = await fetch(`${API_URL}/update`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(administrator),

    });
    console.log("Respuesta del servidor:", res.status, res.statusText);
    if (!res.ok) {
        const errorText = await res.text();
        console.log("Error del servidor:", errorText);
        throw new Error(`Error updating administrator: ${res.statusText}`);
    }

    return res.text();

};

//login Sales
 
export const login = async (email: string, password: string): Promise<Administrator> => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  return res.json();
};
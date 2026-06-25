import { Administrator } from "../models/Administrator";
const API_URL = "http://localhost:8080/api/admins";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch(`${API_URL}/all`);
    return res.json();

}

// Fetch add
export const create = async (formData: FormData) => {
    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
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
export const updateAdministrator = async (formData: FormData) => {
    const res = await fetch(`${API_URL}/update`, {
        method: "PUT",
        body: formData,
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
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

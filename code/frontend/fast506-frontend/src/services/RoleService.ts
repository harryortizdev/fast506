import {Role} from '../models/Role';
const API_URL = "http://localhost:8080/api/roles";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch(`${API_URL}/all`);
    return res.json();

}

// Fetch add

export const create = async (role: Partial<Role>) => {

    const res = await fetch(`${API_URL}/create`, {

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role),
            
    });
    if (!res.ok) {
        console.error("Respuesta del servidor:", res.status, res.statusText);
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error creating role: ${res.statusText}`);
    }
    return res.text();

};

// Fetch delete

export const deleteRole = async (idRole: number) => {

    const res = await fetch(`${API_URL}/delete?idRole=${idRole}`, {

        method: "DELETE",

    });

    if (!res.ok) {
        console.error("Respuesta del servidor:", res.status, res.statusText);
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error deleting role: ${res.statusText}`);
    }

    return res.text();

};

// Fetch update

export const updateRole = async (role: Role) => {

    console.log("Datos enviados en PUT:", role);
    const res = await fetch(`${API_URL}/update`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role),

    });
    console.log("Respuesta del servidor:", res.status, res.statusText);
    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error updating role: ${errorText}`);
    }
    return res.text();

};
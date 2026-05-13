import { Client } from "../models/Client";
const API_URL = "http://localhost:8080/api/clients";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch(`${API_URL}/all`);
    return res.json();

}

// Fetch add

export const create = async (client: Partial<Client>) => {

    const res = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
    });
    if (!res.ok) {
        throw new Error(`Error creating client: ${res.statusText}`);
    }
    return res.text();

};

// Fetch delete

export const deleteClient = async (id: number) => {

    const res = await fetch(`${API_URL}/delete?id=${id}`, {

        method: "DELETE",

    });

    return res.text();

};

// Fetch update

export const updateClient = async (client: Client) => {

    const res = await fetch(`${API_URL}/update`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),

    });
    if (!res.ok) {
        throw new Error(`Error updating client: ${res.statusText}`);
    }

    return res.text();

};
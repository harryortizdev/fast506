import { Administrator } from "../models/Administrator";
const API_URL = "http://localhost:8080/api/administrators";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch('${API_URL}/all');
    return res.json();

}

// Fetch add

export const create = async (administrator: Partial<Administrator>) => {

    const res = await fetch('${API_URL}/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(administrator),
    });
    return res.text();

};

// Fetch delete

export const deleteAdministrator = async (id: number) => {

    const res = await fetch('${API_URL}/delete?id=${id}', {

        method: "DELETE",

    });

    return res.text();

};

// Fetch update

export const updateAdministrator = async (administrator: Administrator) => {

    const res = await fetch('${API_URL}/update', {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(administrator),

    });

    return res.text();

};
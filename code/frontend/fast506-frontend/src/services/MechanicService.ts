import { Mechanic } from "../models/Mechanic";
const API_URL = "http://localhost:8080/api/mechanics";

// Fetch getAll
export const getAll = async () => {

    const res = await fetch('${API_URL}/all');
    return res.json();

}

// Fetch add

export const create = async (mechanic: Partial<Mechanic>) => {

    const res = await fetch('${API_URL}/create', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mechanic),
    });
    return res.text();

};

// Fetch delete

export const deleteMechanic = async (id: number) => {

    const res = await fetch('${API_URL}/delete?id=${id}', {

        method: "DELETE",

    });

    return res.text();

};

// Fetch update

export const updateMechanic = async (mechanic: Mechanic) => {

    const res = await fetch('${API_URL}/update', {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mechanic),

    });

    return res.text();

};
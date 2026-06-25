import { Mechanic } from "../models/Mechanic";
const API_URL = "http://localhost:8080/api/mechanics";

export const getAll = async () => {
    const res = await fetch(`${API_URL}/all`);
    return res.json();
};

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

export const deleteMechanic = async (id: number) => {
    const res = await fetch(`${API_URL}/delete?id=${id}`, {
        method: "DELETE",
    });
    return res.text();
};

export const updateMechanic = async (formData: FormData) => {
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

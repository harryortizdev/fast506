import { WorkshopSchedule } from "../models/WorkshopSchedule";

const API_URL = "http://localhost:8080/api/workshopSchedules";

export const getAll = async () => {
  const res = await fetch(`${API_URL}/all`);
  return res.json();
};

export const create = async (workshopSchedule: Partial<WorkshopSchedule>) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workshopSchedule),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Error del backend:", error);
    throw new Error(`Error creating workshop schedule: ${error}`);
  }

  return res.text();
};

export const deleteWorkshopSchedule = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });

  return res.text();
};

export const updateWorkshopSchedule = async (workshopSchedule: WorkshopSchedule) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workshopSchedule),
  });

  return res.text();
};
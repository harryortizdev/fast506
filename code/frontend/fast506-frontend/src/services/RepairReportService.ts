import { RepairReport } from "../models/RepairReport";

const API_URL = "http://localhost:8080/api/repairReports";

export const getAll = async () => {
  const res = await fetch(`${API_URL}/all`);
  return res.json();
};

export const create = async (repairReport: Partial<RepairReport>) => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repairReport),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Error del backend:", error);
    throw new Error(`Error creating repair report: ${error}`);
  }

  return res.text();
};

export const deleteRepairReport = async (id: number) => {
  const res = await fetch(`${API_URL}/delete?id=${id}`, {
    method: "DELETE",
  });

  return res.text();
};

export const updateRepairReport = async (repairReport: RepairReport) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(repairReport),
  });

  return res.text();
};
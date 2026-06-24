import { User } from "../models/User";
const API_URL = "http://localhost:8080/api/admins";

export const isAuthenticated = async (email: string, password: string):Promise <User>=>{

   const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");

  return res.json();

}
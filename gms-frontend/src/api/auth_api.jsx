import { URL_API } from "./employee_api";

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${URL_API}/auth/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error de autenticación');
        }
        return data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
import { URL_API } from "./employee_api";

export const getMemberships = async () => {
    try {
        const response = await fetch(`${URL_API}/membership-plans/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al obtener los planes de membresia: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al obtener los planes de membresia:', error);
        throw error; 
    }
};

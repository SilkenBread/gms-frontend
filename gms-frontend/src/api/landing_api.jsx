import { URL_API } from "./employee_api";

//Servicios
export const getServices = async () => {
    try {
        const response = await fetch(`${URL_API}/services/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        throw error; 
    }
};

export const addService = async (data) => {
    try {
        const response = await fetch(`${URL_API}/services/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                name: data.nombre,
                description: data.descripcion
            }),
        });

        const json = await response.json(); 
        return json
    } catch (error) {
        console.error('Error al agregar servicio:', error);
    }
};

export const updateService = async (id, data) => {
    try {
        const response = await fetch(`${URL_API}/services/${id}/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                name: data.nombre,
                description: data.descripcion
            }),            
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al actualizar el servicio:', error);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        const response = await fetch(`${URL_API}/services/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Detalles del error:', errorText);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al eliminar el servicio:', error);
        throw error;
    }
};

//Horarios
export const getSchedule = async () => {
    try {
        const response = await fetch(`${URL_API}/schedules/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
        throw error; 
    }
};

export const addSchedule = async (data) => {
    try {
        const response = await fetch(`${URL_API}/schedules/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                start_time: data.inicio,
                end_time: data.fin,
                day: data.dia,
                day_category: data.categoria
            }),
        });

        const json = await response.json(); 
        return json
    } catch (error) {
        console.error('Error al agregar servicio:', error);
    }
};

export const updateSchedule = async (id, data) => {
    try {
        const response = await fetch(`${URL_API}/schedules/${id}/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                start_time: data.inicio,
                end_time: data.fin,
                day: data.dia,
                day_category: data.categoria
            }),            
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al actualizar el horario:', error);
        throw error;
    }
};

export const deleteSchedule = async (id) => {
    try {
        const response = await fetch(`${URL_API}/schedules/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Detalles del error:', errorText);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al eliminar el horario:', error);
        throw error;
    }
};

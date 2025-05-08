export const URL_API = import.meta.env.VITE_API_URL

export const getAttendance = async () => {
    try {
        const response = await fetch(`${URL_API}/attendance/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al obtener asistencia: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error al obtener la asistencia:', error);
        throw error;
    }
}

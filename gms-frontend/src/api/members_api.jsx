export const getMembers = async () => {
    try {
        const response = await fetch('http://localhost:8000/members/list/');
        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.statusText}`);
        }
        const data = await response.json();
        return data; // Devuelve la lista de categorías
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error; // Re-lanza el error para manejarlo en el componente
    }
};
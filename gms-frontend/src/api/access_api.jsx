export const URL_API = import.meta.env.VITE_API_URL;

/**
 * @param {string} memberId 
*/

export const registerAccess = async (memberId) => {
    try {
        const response = await fetch(`${URL_API}/attendance/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ member_id: memberId }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Detalles del error:", errorText);
            throw new Error(`Error al registrar asistencia: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en el registro de asistencia:", error);
        throw error;
    }
};

/**
 * @param {string} memberId 
 */
export const getMemberAttendance = async (memberId) => {
    try {
        const response = await fetch(`${URL_API}/attendance/member/${memberId}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Detalles del error:", errorText);
            throw new Error(`Error al obtener asistencias: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener asistencias del miembro:", error);
        throw error;
    }
};


export const getAttendanceHistory = async () => {
    try {
        const response = await fetch(`${URL_API}/attendance/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Detalles del error:", errorText);
            throw new Error(`Error al obtener historial: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener historial de asistencia:", error);
        throw error;
    }
};
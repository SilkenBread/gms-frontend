import { URL_API } from "./employee_api";

export const addPayment = async (data) => {
    try {
        const response = await fetch(`${URL_API}/payments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                member: data.cedula,
                membership_plan: data.tipoMembresia,
                payment_date: data.fechaPago,
                payment_method: data.tipoPago,
                amount: data.valorPagado,
            }),
        });

        const json = await response.json(); // ✅ Leer body solo una vez

        if (!response.ok) {
            console.error('Detalles del error:', json);
            return { success: false, errors: json }; // devolver errores
        }

        return { success: true, data: json }; // devolver éxito
    } catch (error) {
        console.error('Error al registrar pago:', error);
        return { success: false, errors: { detail: 'Error de red o del servidor' } };
    }
};

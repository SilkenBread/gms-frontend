import { URL_API } from "./employee_api";

export const getMembers = async () => {
    try {
        const response = await fetch(`${URL_API}/members/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al actualizar empleado: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al obtener los miembros:', error);
        throw error; 
    }
};

export const searchMember = async (id) => {
    try {
        const response = await fetch(`${URL_API}/members/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const data = response.json()
        if(response.ok){
            return data
        }
        return false


    } catch (error) {
        console.error('Error al obtener el miembro:', error);
        throw error;  
    }
};


export const addMember = async (user, member) => {
    try {
        const response = await fetch(`${URL_API}/members/`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    surname: user.surname,
                },
                member: {
                    birth_date: member.birth_date,
                    registration_date: member.registration_date,
                    active_membership: member.active_membership,
                    membership_type: member.membership_type,
                    membership_end_date: member.membership_end_date,
                }
            }),            
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al agregar miembro: ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al agregar el miembro:', error);
        throw error;
    }
};

export const updateMember = async (id, data) => {
    try {
        const response = await fetch(`${URL_API}/members/${id}/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    password: data.user.password,
                    name: data.user.name,
                    surname: data.user.surname,
                },
                member: {
                    birth_date: data.member.birth_date,
                    registration_date: data.member.registration_date,
                    active_membership: data.member.active_membership,
                    membership_type: data.member.membership_type,
                    membership_end_date: data.member.membership_end_date,
                }
            }),            
        });

        if (!response.ok) {
            const errorText = await response.text(); // Esto te dará más detalles del error
            console.error('Detalles del error:', errorText);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al actualizar el miembro:', error);
        throw error;
    }
};

export const deleteMember = async (id) => {
    try {
        const response = await fetch(`${URL_API}/members/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); // Esto te dará más detalles del error
            console.error('Detalles del error:', errorText);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al eliminar el miembro:', error);
        throw error;
    }
};
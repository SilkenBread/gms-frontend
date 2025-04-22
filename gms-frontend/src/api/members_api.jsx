export const getMembers = async () => {
    try {
        const response = await fetch('http://localhost:8000/members/list/');
        if (!response.ok) {
            throw new Error(`Error al obtener miembros: ${response.statusText}`);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error al obtener los miembros:', error);
        throw error; 
    }
};

export const addMember = async (user, member) => {
    try {
        const response = await fetch('http://localhost:8000/members/create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            throw new Error(`Error al agregar miembro: ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al agregar el miembro:', error);
        throw error;
    }
};

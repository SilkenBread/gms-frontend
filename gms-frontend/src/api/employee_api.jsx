export const getEmployees = async () => {
    try {
        const response = await fetch('http://localhost:8000/employees/', {
            method: 'GET',
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
        console.error('Error al obtener los empleados:', error);
        throw error; 
    }
};


export const addEmployee = async (employee) => {
    try {
        const response = await fetch('http://localhost:8000/employees/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                user: {
                    id: employee.user.id,
                    email: employee.user.email,
                    password: employee.user.password,
                    name: employee.user.name,
                    surname: employee.user.surname,
                },
                employee: {
                    hire_date: employee.employee.hire_date,
                    salary: employee.employee.salary
                },
                groups: [employee.user.groups]
            }),            
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al agregar empleado: ${response.statusText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error al agregar el empleado:', error);
        throw error;
    }
};

export const updateEmployee = async (employee) => {
    try {
        const response = await fetch(`http://localhost:8000/employees/${employee.user.id}/`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                user: {
                    id: employee.user.id,
                    email: employee.user.email,
                    password: employee.user.password,
                    name: employee.user.name,
                    surname: employee.user.surname,
                },
                employee: {
                    hire_date: employee.employee.hire_date,
                    salary: employee.employee.salary
                },
                groups: employee.employee.groups
            }),     
        });

        if (!response.ok) {
            const errorText = await response.text(); // Esto te dará más detalles del error
            console.error('Detalles del error:', errorText);
            throw new Error(`Error al actualizar empleado: ${response.statusText}`);
        }
        

        return await response.json(); 
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/employees/${id}/`, {
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
        console.error('Error al eliminar el empleado:', error);
        throw error;
    }
};

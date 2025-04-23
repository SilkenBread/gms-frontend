export const getEmployees = async () => {
    try {
        const response = await fetch('http://localhost:8000/employees/');
        if (!response.ok) {
            throw new Error(`Error al obtener empleados: ${response.statusText}`);
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
            headers: { 'Content-Type': 'application/json' },
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
                groups: [employee.groups]
            }),            
        });

        if (!response.ok) {
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
            headers: { 'Content-Type': 'application/json' },
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
                groups: [employee.groups]
            }),      
        });

        if (!response.ok) {
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
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el empleado: ${response.statusText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        throw error;
    }
};
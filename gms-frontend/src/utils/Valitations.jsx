export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correct = regex.test(email);
    if (!correct) {
        return "Correo no válido";
    } 
    return true;
}

export function validateCedula(cedula) {
    const regex = /^\d+$/;
    if (!regex.test(cedula)) {
        return "La cédula solo debe contener números.";
    }
    if (cedula.length < 8 || cedula.length > 10) {
        return "La cédula debe tener entre 8 y 10 dígitos.";
    }
    return true;
}

export function validatePhone(phone) {
    const regex = /^\d{10}$/;
    const correct = regex.test(phone);
    return correct ? true : "Teléfono no válido (debe tener 10 dígitos numéricos)";
}

export function validatePassword(password) {
    if (!password) {
        return "La contraseña es obligatoria";
    }
    else if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }
    return true; 
}



// defino los turnos
let turno1_descripcion = '09 a 11hs';
let turno2_descripcion = '11 a 13hs';
let turno3_descripcion = '13 a 15hs';
let turno4_descripcion = '15 a 17hs';

// defino el estado de los turnos
let turno1_estado = "disponible";
let turno2_estado = "disponible";
let turno3_estado = "disponible";
let turno4_estado = "disponible";

// otras variables
let continuar = 1;


console.log('Bienvenido a la central de turnos'); // Mensaje de bienvenida
let usuario = prompt('CENTRAL DE TURNOS\n------------\n\nBienvenido a la central de turnos\n\nPor favor ingrese su nombre: '); // Ingreso del nombre del usuario


// Creo un ciclo por si el usuario quiere hacer otra reserva
while(continuar == 1) {
    
    let turnoSeleccionado = prompt('CENTRAL DE TURNOS\n------------\n\n1) '+turno1_descripcion+': '+turno1_estado+'\n2) '+turno2_descripcion+': '+turno2_estado+'\n3) '+turno3_descripcion+': '+turno3_estado+'\n4) '+turno4_descripcion+': '+turno4_estado+'\n\nSeleccione un turno para reservar: '); // Ingreso del turno elegido
    
    let confirmacionReserva = reservarTurno(turnoSeleccionado); // Ejecuto la funcion de reservar un turno, si se confirma la reserva devuelve true

    if (confirmacionReserva == true) {
        window.alert(usuario+' su reserva fue realizada con exito'); // La reserva se realizo con exito
        confirmacionReserva == false; // Vuelvo la confirmacion de reserva al estado inicial (false)
    }else{
        window.alert(usuario+' hubo un problema para realizar su reserva') // No se hizo la reserva
    }
    
    // Consulto si quiere continuar o salir
    continuar = parseInt(prompt('CENTRAL DE TURNOS\n------------\n\nPresione (1) para continuar o (0) para salir: '));
}

window.alert(usuario+' muchas gracias por su visita!!')



// Evaluar si el turno seleccionado esta disponible y si es el caso reservarlo
function reservarTurno(turnoSeleccionado) {
    switch(turnoSeleccionado) {
        case '1':
            if(turno1_estado == "disponible"){
                turno1_estado = "reservado";
                return true;
            }
            return false;
            
        case '2':
            if(turno2_estado == "disponible"){
                turno2_estado = "reservado";
                return true;
            }
            return false;
            
        case '3':
            if(turno3_estado == "disponible"){
                turno3_estado = "reservado";
                return true;
            }
            return false;
            
        case '4':
            if(turno4_estado == "disponible"){
                turno4_estado = "reservado";
                return true;
            }
            return false;
            
        default:
            return false;
    }    
}
//Definiciones

let repetirBucle = false;

const turnos = [
    {id: 0, horario: "10/5: de 9:00 a 9:30", disponible: true},
    {id: 1, horario: "10/5: de 9:30 a 10:00", disponible: true},
    {id: 2, horario: "10/5: de 10:00 a 10:30", disponible: false},
    {id: 3, horario: "10/5: de 10:30 a 11:00", disponible: false},
    {id: 4, horario: "10/5: de 11:00 a 11:30", disponible: true},
    {id: 5, horario: "10/5: de 11:30 a 12:00", disponible: true},
];
let turnosDisponibles = [];

let pacientes = [];

class Paciente{
    constructor(nombre, apellido, edad, horario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.horario = horario;
    }
}


//Inicio
console.log("Bienvenidos a la Central de Turnos");

//Ingreso datos paciente
let nombrePaciente = prompt("Por favor ingrese su nombre: ");
let apellidoPaciente = prompt("Por favor ingrese su apellido: ");
let edadPaciente = prompt("Por favor ingrese su edad: ");

//Ciclo se repite mientras repetirBucle = true
do{
    //Filtro los turnos disponibles
    turnosDisponibles = turnos.filter((elemento) => elemento.disponible == true);

    //Si no hay turnos disponiles finalizo
    if(turnosDisponibles.length ==0){
        console.log("No hay turnos disponibles");
        repetirBucle = false;
    }else{
        //Si hay turnos disponibles los muestro
        mostrarDisponibles();
        
        //Seleccion del turno a reservar
        let turnoSeleccionado = prompt("Elija el número del turno que desea reservar: ");

        //Modifico la propiedad disponible a false
        turnos[turnosDisponibles[turnoSeleccionado-1].id].disponible = false;
        
        //Creo un paciente y horario y lo cargo al array pacientes
        const paciente1 = new Paciente(nombrePaciente, apellidoPaciente, edadPaciente, turnosDisponibles[turnoSeleccionado-1].horario);
        pacientes.push(paciente1);
        
        console.log("Turno reservado con exito");
        
        //Reservar otro turno o continuar
        let continuarSalir = prompt("Presione (1) para agendar otro turno o (2) para salir: ")
        if(continuarSalir == 1){
            repetirBucle = true;
        }else{
            repetirBucle = false;
        }
    }
}while(repetirBucle == true);

//Fin
console.log("Gracias por su visita!");
console.log(pacientes);



//Funcion muestra la propiedad horario de cada turno disponible
function mostrarDisponibles(){
    let index = 1;
    for (const turnoDisponible of turnosDisponibles) {
        console.log(index + ") " + turnoDisponible.horario);
        index++;
    }
}
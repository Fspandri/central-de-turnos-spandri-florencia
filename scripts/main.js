//Definiciones
let turnos = JSON.parse(localStorage.getItem("turnosLocal")) || [
    {id: "0", fecha: "10/5", horario: "9:00 a 9:30", disponible: true},
    {id: "1", fecha: "10/5", horario: "9:30 a 10:00", disponible: true},
    {id: "2", fecha: "10/5", horario: "10:00 a 10:30", disponible: true},
    {id: "3", fecha: "10/5", horario: "10:30 a 11:00", disponible: true},
    {id: "4", fecha: "10/5", horario: "11:00 a 11:30", disponible: true},
    {id: "5", fecha: "10/5", horario: "11:30 a 12:00", disponible: true},
];

let turnosDisponibles = [];

let pacientes = JSON.parse(localStorage.getItem("pacientesLocal")) || [];

let pacienteNuevo = [];

class Paciente{
    constructor(nombre, apellido, edad, email, fecha, horario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.fecha = fecha;
        this.horario = horario;
    }
}



//Inicio
mostrarDisponibles();
confirmacionTurno();


//Funcion muestra los turnos disponibles
function mostrarDisponibles(){ 
    
    //Filtro los turnos disponibles
    turnosDisponibles = turnos.filter((elemento) => elemento.disponible == true);

    let dom_turnosDisponibles = document.getElementById("turnosDisponibles");
    
    //Inicializo vacio
    dom_turnosDisponibles.innerHTML = "";

    //Cargo los disponibles o informo que no hay
    if(turnosDisponibles.length == 0){
        dom_turnosDisponibles.innerHTML = `
            <p>No hay turnos disponibles</p>
        `
    }else{
        turnosDisponibles.forEach((turno) => {
            dom_turnosDisponibles.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inputTurnosDisponibles" id="${turno.id}">
                    <label class="form-check-label" for="${turno.id}">
                    ${turno.fecha} - ${turno.horario}
                    </label>
                </div>
            `
        })
    }
};


//Funcion confirmacion de turno
function confirmacionTurno(){
    let dom_botonReservar = document.getElementById("botonReservar");

    dom_botonReservar.onclick = () => {

        let horarioSeleccionado = document.querySelector('input[name="inputTurnosDisponibles"]:checked');
        let nombre = document.getElementById("inputNombre").value;
        let apellido = document.getElementById("inputApellido").value;
        let edad = parseInt(document.getElementById("inputEdad").value);
        let email = document.getElementById("inputEmail").value;
        
        
        if(horarioSeleccionado && nombre!="" && apellido!="" && edad>0 && email!="") {
            //Modifico la propiedad disponible de ese horario a false y lo guardo en local storage
            turnos[horarioSeleccionado.id].disponible = false;
            localStorage.setItem("turnosLocal", JSON.stringify(turnos));

            // Creo un paciente y horario, lo cargo al array pacientes, y guardo en local storage
            pacienteNuevo = new Paciente(nombre, apellido, edad, email, turnos[horarioSeleccionado.id].fecha, turnos[horarioSeleccionado.id].horario);
            pacientes.push(pacienteNuevo);
            localStorage.setItem("pacientesLocal", JSON.stringify(pacientes));

            alert("Turno confirmado");

            // Reseteo el formulario y actualizo la vista de turnos disponibles
            formReserva.reset();
            mostrarDisponibles();
        } else {
            alert('Por favor revise los datos ingresados');
        }
    }
}


//-----------------------------------------------------------------------------------------------------------
//Definiciones
let turnos = [];
let turnosDisponibles = [];
let pacienteNuevo = [];
let profesionalesUnicos = [];
let fechasUnicas = [];

class Paciente{
    constructor(nombre, apellido, telefono, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
    }
}


//-----------------------------------------------------------------------------------------------------------
//Inicio
obtenerDatos();
rellenarInputs()
confirmacionTurno();
cambiosProfesional();
cambiosFecha();


//-----------------------------------------------------------------------------------------------------------
//API - Funcion obtener datos de la API
function obtenerDatos(){

    const URLGET="https://646945ee03bb12ac2089ad7d.mockapi.io/turnos"
    fetch(URLGET)
        .then(resultado => resultado.json())
        .then(listaTurnos => {
            turnos = listaTurnos;
            mostrarDesplegableProfesionales();
            mostrarDesplegableFechas();
            mostrarHorariosDisponibles();
        })
}


//-----------------------------------------------------------------------------------------------------------
//LOCAL STORAGE - Rellenar inputs con paciente cargado en localStorage
function rellenarInputs(){

    let paciente = JSON.parse(localStorage.getItem("paciente")) || 0;

    let inputNombre = document.getElementById("inputNombre");
    let inputApellido = document.getElementById("inputApellido");
    let inputTelefono = document.getElementById("inputTelefono");
    let inputEmail = document.getElementById("inputEmail");

    if(paciente != 0){
        inputNombre.value = paciente.nombre;
        inputApellido.value = paciente.apellido;
        inputTelefono.value = paciente.telefono;
        inputEmail.value = paciente.email;
    }
}


//-----------------------------------------------------------------------------------------------------------
//DOM - Funcion muestra el menu desplegable de profesionales
function mostrarDesplegableProfesionales(){ 

    let dom_desplegableProfesionales = document.getElementById("dom_desplegableProfesionales");

    //Me quedo solo con las fechas (sin repetir) del array "turnos"
    profesionalesUnicos = [...new Set(turnos.map(objeto => objeto.profesional))];

    dom_desplegableProfesionales.innerHTML = `<option selected></option>`;

    profesionalesUnicos.forEach((cadaProfesional, j) => {
        dom_desplegableProfesionales.innerHTML += `
        <option value="${j+1}">${cadaProfesional}</option>`
    });
};


//-----------------------------------------------------------------------------------------------------------
//DOM - Funcion muestra el menu desplegable de fechas
function mostrarDesplegableFechas(){ 

    let dom_desplegableFechas = document.getElementById("dom_desplegableFechas");

    //Me quedo solo con las fechas (sin repetir) del array "turnos"
    fechasUnicas = [...new Set(turnos.map(objeto => objeto.fecha))];

    dom_desplegableFechas.innerHTML = `<option selected></option>`;

    fechasUnicas.forEach((cadaFecha, j) => {
        dom_desplegableFechas.innerHTML += `
        <option value="${j+1}">${cadaFecha}</option>`
    });
};


//-----------------------------------------------------------------------------------------------------------
//EVENTOS - Funcion detectar cambios en fecha
function cambiosProfesional(){
    
    let dom_desplegableProfesionales = document.getElementById("dom_desplegableProfesionales");

    dom_desplegableProfesionales.onchange = (()=>{ 
        mostrarHorariosDisponibles();
    });
}


//-----------------------------------------------------------------------------------------------------------
//EVENTOS - Funcion detectar cambios en fecha
function cambiosFecha(){
    
    let dom_desplegableFechas = document.getElementById("dom_desplegableFechas");

    dom_desplegableFechas.onchange = (()=>{ 
        mostrarHorariosDisponibles();
    });
}


//-----------------------------------------------------------------------------------------------------------
//DOM - Funcion muestra los horarios disponibles
function mostrarHorariosDisponibles(){ 

    let dom_desplegableFechas = document.getElementById("dom_desplegableFechas");
    let dom_desplegableProfesionales = document.getElementById("dom_desplegableProfesionales");

    //Filtro los turnos disponibles
    turnosDisponibles = turnos.filter((elemento) => (elemento.fecha == fechasUnicas[dom_desplegableFechas.selectedIndex - 1] && elemento.profesional == profesionalesUnicos[dom_desplegableProfesionales.selectedIndex - 1] && elemento.disponible == true));
    
    //DOM
    let dom_turnosDisponibles = document.getElementById("dom_turnosDisponibles");
    
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
                    ${turno.fecha} - ${turno.hora} - ${turno.profesional}
                    </label>
                </div>
            `
        })
    }
};


//-----------------------------------------------------------------------------------------------------------
//EVENTOS - Funcion confirmacion de turno
function confirmacionTurno(){
    let dom_botonReservar = document.getElementById("botonReservar");

    dom_botonReservar.onclick = () => {

        let horarioSeleccionado = document.querySelector('input[name="inputTurnosDisponibles"]:checked');
        let nombre = document.getElementById("inputNombre").value;
        let apellido = document.getElementById("inputApellido").value;
        let telefono = parseInt(document.getElementById("inputTelefono").value);
        let email = document.getElementById("inputEmail").value;
        

        //Verifico que todos los campos del formulario esten completos
        if(horarioSeleccionado && nombre!="" && apellido!="" && telefono>0 && email!="") {            

            //Modifico la propiedad disponible de ese horario a false
            turnos[horarioSeleccionado.id].disponible = false;

            //Cargo los datos del paciente que reservo el turno
            pacienteNuevo = new Paciente(nombre, apellido, telefono, email);
            turnos[horarioSeleccionado.id].paciente = pacienteNuevo;
            
            //Guardo el paciente en local storage
            localStorage.setItem("paciente", JSON.stringify(pacienteNuevo));
            
            // alert("Turno confirmado");
            sweetAlert(1,`Tu turno con ${turnos[horarioSeleccionado.id].profesional} el dia ${turnos[horarioSeleccionado.id].fecha} a las ${turnos[horarioSeleccionado.id].hora}hs fue agendado`);

            // Reseteo el formulario y actualizo la vista de turnos disponibles
            formReserva.reset();
            mostrarHorariosDisponibles();

        } else {
            // alert("Revisar los datos ingresados");
            sweetAlert(2,'Por favor revise los datos ingresados');
        }
    }
}

//-----------------------------------------------------------------------------------------------------------
//LIBRERIA - Funcion mostrar alertas
function sweetAlert(tipo, mensaje){

    switch(tipo){
        case 1: 
            //Si el tipo es 1 envio mensaje de confirmacion
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Confirmado',
                text: mensaje,
                showConfirmButton: true,
                // timer: 5000
            });
            break;
        case 2: 
            //Si el tipo es 2 envio mensaje de error
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: mensaje,
            })
            break;
    }
}


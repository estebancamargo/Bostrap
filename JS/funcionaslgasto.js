//VARIABLES DE LOS SELECTORES

const formulario = document.getElementById('agregar-gasto');
const listadogasto = document.querySelector('#gastos ul');


//crear los eventos

EventListener();

function EventListener()
{
    document.addEventListener('DOMContentLoaded', Preguntarpresupuesto);
    formulario.addEventListener('submit', agregarGasto);
    listadogasto.addEventListener('click', eliminarGasto);
}
//clases
class Presupuesto
{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.calcularrestante();
    }
    calcularrestante(){
        const gastado = this.gastos.reduce((total,gasto) => total + gasto.cantidad,0);
        this.restante = this.presupuesto - gastado;
    }
    eliminarGasto(id)
    {
        this.gastos = this.gastos.filter(gasto => gasto.id.toString() !==1);
        this.calcularrestante();
    }
}
class UI
{
    insertarPresupuesto(cantidad){
    document.querySelector('#total').textContent =  cantidad.presupuesto;
    document.querySelector('#restante').textContent = cantidad.restante;
    }
    imprimirAlerta(mensaje,tipo)
{
    //crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert');

    //si es tipo error agregar una clase
    if(tipo === 'error')
    {
        divMensaje.classList.add('alert-danger');
    }else
    {
        divMensaje.classList.add('alert-success');
    }
    //mensaje de error
    divMensaje.textContent = mensaje;

    //insertar en el dom
    document.querySelector('.gastos').insertBefore(divMensaje,formulario);

    //quitar el alerta despues de 5 segundos
    setTimeout(() => {
        document.querySelector('.gastos .alert').remove();
    }, 5000);

}
agregarGastolistado(gasto)
{
    //limpiar el html
    this.limpiarHTML();

    //definir el array para iterar los gastos que van a ingresar
    gasto.forEach(gasto => {
        const{nombre,cantidad,id} = gasto;

        //creamos la lista
        const nuevoGasto = document.createElement('li');
        nuevoGasto.className ='list-group-item d.flex justify-content-between align-items-center';
        nuevoGasto.dataset.id = id;

        //insertamos el gasto en el html
        nuevoGasto.innerHTML = nuevoGasto.innerHTML= `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

        //crear boton para borrar el gasto
        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
        btnBorrar.textContent = 'borrar';
        nuevoGasto.appendChild(btnBorrar);

        //insertar en el html
        listadogasto.appendChild(nuevoGasto);
    });

}

//comprobar el presupuesto restante
actualizarpresupuesto(restante){
    document.querySelector('span#restante').textContent = restante;
}
comprobarpresupuesto(presupuestoobj){
    const {presupuesto,restante} = presupuestoobj;
    const restantediv = document.querySelector('.restante');

    console.log(restante);
    console.log(presupuesto);

    if ((presupuesto/4)>restante){
        restantediv.classList.remove('alert-success','alert-warning');
        restantediv.classList.add('alert-danger');
    }else if((presupuesto/2)>restante){
        restantediv.classList.remove('alert-success');
        restantediv.classList.add('alert-warning');
    }else{
        restantediv.classList.remove('alert-danger','alert-warning');
        restantediv.classList.add('alert-success');
    }
    if(restante<=0){
        ui.imprimirAlerta('El presupuesto esta agotado','error');
        formulario.querySelector('button[type= "submit"]').disabled = True;
    }
}
limpiarHTML(){
    while(listadogasto.firstChild)
    {
        listadogasto.removeChild(listadogasto.firstChild);
    }

}
}
const ui = new UI();
let presupuesto;
function Preguntarpresupuesto(){
    const preguntar = prompt('¿Cual es tu presupuesto?');

    if(preguntar === '' || preguntar === null || isNaN(preguntar) || preguntar <=0)
        {
            window.location.reload();
        }
        presupuesto = new Presupuesto(preguntar);

        console.log(presupuesto)
        ui.insertarPresupuesto(presupuesto);
}
agregarGastolistado(gasto)
{
    //limpiar el html
    this.limpiarHTML();

    //definir el array para iterar los gastos que van a ingresar
      gasto.forEach(gasto => {
        const{nombre,cantidad,id} = gasto;

        //creamos la lista
        const nuevoGasto = document.createElement('li');
        nuevoGasto.className ='list-group-item d.flex justify-content-between align-items-center';
        nuevoGasto.dataset.id = id;

        //insertamos el gasto en el html
        nuevoGasto.innerHTML = nuevoGasto.innerHTML= `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

        //crear boton para borrar el gasto
        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
        btnBorrar.textContent = 'borrar';
        nuevoGasto.appendChild(btnBorrar);

        //insertar en el html
        listadogasto.appendChild(nuevoGasto);
    });

}




imprimirAlerta(mensaje,tipo)
{
    //crear el div
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert');

    //si es tipo error agregar una clase
    if(tipo === 'error')
    {
        divMensaje.classList.add('alert-danger');
    }else
    {
        divMensaje.classList.add('alert-success');
    }
    //mensaje de error
    divMensaje.textContent = mensaje;

    //insertar en el dom
    document.querySelector('.gastos').insertBefore(divMensaje,formulario);

    //quitar el alerta despues de 5 segundos
    setTimeout(() => {
        document.querySelector('.gastos .alert').remove();
    }, 5000);

}

function agregarGasto(e){
    e.preventDefault();
    //leer del formulario agregar-gasto
    const nombre = document.querySelector('#gasto').value;     
    const cantidad = Number(document.querySelector('#cantidad').value);
    
    //comprobamos que los campos no esten vacios
    if(nombre === '' || cantidad === '')
    {
        ui.imprimirAlerta('ambos campos son obligatorios','error');
        //si hay una cantidad negativa o letras
    }else if(cantidad <= 0 || isNaN(cantidad))
        {
            ui.imprimirAlerta('Cantidad  no valida','error')
        }else{
            const gasto = {nombre,cantidad,id:Date.now()};

            //añadir nuevo gasto
            presupuesto.nuevoGasto(gasto);

            ui.imprimirAlerta('correcto','correcto');
            const {gastos} = presupuesto;
            ui.agregarGastolistado(gastos);
            ui.comprobarpresupuesto(presupuesto);
            const {restante} = presupuesto;

            ui.actualizarpresupuesto(restante);

            formulario.reset();
        }
}
function agregarGasto(e) {
    e.preventDefault();
    const nombre = document.querySelector('#gasto').value;     
    const cantidad = Number(document.querySelector('#cantidad').value);
    
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
    } else {
        const gasto = { nombre, cantidad, id: Date.now() };

        presupuesto.nuevoGasto(gasto);

        ui.imprimirAlerta('Correcto', 'correcto');
        const {gastos} = presupuesto;
        ui.agregarGastolistado(gastos);
        ui.comprobarpresupuesto(presupuesto);
        const {restante} = presupuesto;

        ui.actualizarpresupuesto(restante);

        if (gastos.length >= 2) {
            const gastoMasAlto = gastos.reduce((max, gasto) => (max.cantidad > gasto.cantidad) ? max : gasto);
            alert(`El gasto más alto es: ${gastoMasAlto.nombre} - $${gastoMasAlto.cantidad}`);
        }

        formulario.reset();
    }
}

function eliminarGasto(e){
    if(e.target.classList.contains('borrar-gasto')){
        presupuesto.eliminarGasto(id);

        ui.comprobarpresupuesto(presupuesto);
        const {restante} = presupuesto;
        ui.actualizarpresupuesto(restante);

        e.target.parentElement.remove();
    }
}

//implemenatar opcion cual es el gasto mas alto
const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total")
const precioTotalElement = document.getElementById("precio-total")
const granTotalElement = document.getElementById("gran-total")


/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo")
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre")
const inputCantidad = document.getElementById("nombre")
const inputPrecio = document.getElementById("nombre")
const selectCategoria = document.getElementById("nombre")

let indice = 0;
let cantidadTotal = 0
let precioTotal = 0
let granTotal = 0

let currentRow

form.addEventListener("submit", onSubmit);

/**
 *
 *
 * @param {Event} event
 */
function onSubmit(event){
    event.preventDefault()//podemos ejecutar en un evento y previene su funcionamento por defecto
    
    const data = new FormData(form)
    const values = Array.from(data.entries())

    const [frmCodigo, frmNombre, frmCantidad, frmPRecio, frmCategoria] = values

    let codigo    = frmCodigo[1]
    const nombre    = frmNombre[1]
    const cantidad  = frmCantidad[1]
    const precio    = frmPRecio[1]
    const categoria = frmCategoria[1]
    const total     = cantidad*precio
    let tr
    
    if (!codigo){
        indice+=1
        codigo = indice
        tr = document.createElement("tr")
        tbody.appendChild(tr)
    }else{
        tr = currentRow
    }

    
    
    cantidadTotal += parseFloat(cantidad)
    precioTotal+=parseFloat(precio)
    granTotal+= parseFloat(total)

    console.log("cambio para hacer commit")

   
    tr.dataset.categoria = categoria

    tr.innerHTML =
    `
        <td>${indice}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href='' onclick="onEdit(event)">Editar</a> | <a href='#' onclick="onDelete(event)">Eliminar</a></td>
    `

    cantidadTotalElement.innerText = cantidadTotal
    precioTotalElement.innerText = precioTotal
    granTotalElement.innerText = granTotal
     
    

    form.reset()
}

/**
 *
 *
 * @param {Event} event
 */
function onEdit(event){
    event.preventDefault()

    //target:referencia al elemento que disparo el evento
    /** @type {HTMLAnchorElement} */
    const anchor = event.target
    const tr = anchor.parentElement.parentElement //fila a la que se le dio click
    const celdas = tr.getElementsByTagName("td")

    const [tdCodigo, tdNombre, tdCantidad, tdPrecio] = celdas

    inputCodigo.value = tdCodigo.innerText
    inputNombre.value = tdNombre.innerText
    inputCantidad.value = tdCantidad.innerText
    inputPrecio.value = tdPrecio.innerText
    selectCategoria.value = tr.dataset.categoria

    currentRow = tr
    
}

/**
 * 
 * @param {Event} event 
 */
function onDelete(event){
    event.preventDefault()
    
    /** @type {HTMLAnchorElement} */
    const anchor = event.target
    const tr = anchor.parentElement.parentElement //fila a la que se le dio click

    tbody.removeChild(tr)

}





/*
let paragraph = document.getElementsByTagName("p");

if (paragraph.length>0){
    let p_1 = paragraph[0];
    p_1.innerHTML ="Bienvenidos a todos jeje"
    //console.log(paragraph)
}




const numbers = {
    "2" : ["a","b","c"],
    "3" : ["d","e","f"],
    "4" : ["g","h","i"],
    "5" : ["j","k","l"],
    "6" : ["m","n","0"],
    "7" : ["p","q","r","s"],
    "8" : ["t","u","v"],
    "9" : ["w","x","y","z"]
}

function combinations(cadena){

    if (typeof(cadena) !== "string" || cadena.includes("1")  || cadena.length>4 || cadena.length < 0){
        return "error de restricciones"
    }

    var result = ['']
    for(var i=0; i<cadena.length; i++){
        //console.log(numbers[cadena[i]])
        result = result.flatMap(d => numbers[cadena[i]].map(v => d+v))
    }
    return result
}

console.log(combinations("2379"))
*/
const ui = {
    onEliminarClick: (codigo)=>{},
    onEditarClick: (codigo)=>{},
    onFormSubmit : (data) => {},
    renderForm,
    renderTable
    
}

const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total")
const precioTotalElement = document.getElementById("precio-total")
const granTotalElement = document.getElementById("gran-total")


/** @type {HTMLInputElement} */
const inputCodigo = document.getElementById("codigo")
/** @type {HTMLInputElement} */
const inputNombre = document.getElementById("nombre")
/** @type {HTMLInputElement} */
const inputCantidad = document.getElementById("cantidad")
/** @type {HTMLInputElement} */
const inputPrecio = document.getElementById("precio")
/** @type {HTMLInputElement} */
const selectCategoria = document.getElementById("categoria")

form.addEventListener("submit", (event)=> {
    event.preventDefault()

    const data = new FormData(form)
    const values = Array.from(data.entries())

    const [frmCodigo, frmNombre, frmCantidad, frmPRecio, frmCategoria] = values

    let codigo      = parseInt(frmCodigo[1])
    const nombre    = frmNombre[1]
    const cantidad  = parseFloat(frmCantidad[1])
    const precio    = parseFloat(frmPRecio[1])
    const categoria = parseInt(frmCategoria[1])

    ui.onFormSubmit({
        codigo,
        nombre,
        cantidad,
        precio,
        categoria
    })
})


function renderTable(productos)
{
  
const filas = productos.map((item)=> {
        const tr = document.createElement("tr")
        tr.innerHTML =
        `
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
            <td>${item.total}</td>
            <td>
                <div class ="btn-group">
                    <a title="Editar" href="#" onclick="onEdit(event)" class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil-square"></i></a>
                    <a title="Eliminar" href='#' onclick="onDelete(event)" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash3"></i></a>
                </div>
            </td>
        `
        const [editar,eliminar] = tr.getElementsByTagName("a")

        eliminar.addEventListener("click", (event) =>{
            event.preventDefault()
            ui.onEliminarClick(item.codigo)
        })

        editar.addEventListener("click", (event) =>{
            event.preventDefault()
            ui.onEditarClick(item.codigo)
        })

        return tr
    })

    tbody.innerHTML =""

    filas.forEach((item) => {
        tbody.appendChild(item)
    })

    cantidadTotalElement.innerHTML = sum(productos, x => x.cantidad)
    precioTotalElement.innerHTML = sum(productos, x => x.precio)
    granTotalElement.innerHTML = sum(productos,x => x.total)

    function sum(elementos, selector){
        return elementos
                .map(selector)
                .reduce((a,b) => a+b,0)
    }
}


function renderForm(producto){
    inputCodigo.value = producto.codigo || ""
    inputNombre.value = producto.nombre || ""
    inputCantidad.value = producto.cantidad || ""
    inputPrecio.value = producto.precio || ""
    selectCategoria.value = producto.categoria || 1
}

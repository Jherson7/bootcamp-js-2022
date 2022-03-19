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



const preloadedState ={
    producto :{},
    productos: []
}


let indice = 0

const reducer = (state,action) => {

    console.log("viene: ", action.type)

    if(action.type =="producto-agregado"){
        indice++
        const producto = action.payload
        const total = producto.cantidad * producto.precio
        const codigo = indice
        return {
            ...state,
            productos : [
                ...state.productos,
                {
                    ...producto,
                    codigo,
                    total

                }
            ]
        }
    }

    if (action.type =="producto-modificado"){
        const productos = state.productos.slice()//hacemos copia del original
        const producto = action.payload
        const codigo = producto.codigo
        const total = producto.cantidad * producto.precio
        const old = productos.find((item)=> item.codigo == codigo)
        const index = productos.indexOf(old)
        productos[index] = {...producto,total}

        return {
            ...state,
            productos
        }
    }

    if (action.type =="producto-eliminado"){
        const codigo = action.payload.codigo
        const productos = state.productos.filter((item)=> item.codigo!= codigo)
        return {
            ...state,
            productos
        }
    }

    if (action.type =="producto-seleccionado"){
        const codigo = action.payload.codigo
        return (
            {
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {}
            }
        )
    }



    return state
}

const store = Redux.createStore(reducer, preloadedState)

let latestState

const unsuscribe = store.subscribe( () => {
    let currentState = store.getState()
    if(currentState != latestState){
        latestState = currentState
        renderForm(currentState.producto)
        renderTable(currentState.productos)
    }
        
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
            store.dispatch({
                type:"producto-eliminado",
                payload: {
                    codigo: item.codigo
                }
            })
        })

        editar.addEventListener("click", (event) =>{
            event.preventDefault()
            store.dispatch({
                type:"producto-seleccionado",
                payload: {
                    codigo: item.codigo
                }
            })
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

    let codigo      = parseInt(frmCodigo[1])
    const nombre    = frmNombre[1]
    const cantidad  = parseFloat(frmCantidad[1])
    const precio    = parseFloat(frmPRecio[1])
    const categoria = parseInt(frmCategoria[1])
    
    if (codigo){
        store.dispatch({
            type:"producto-modificado",
            payload:{
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        })
    }else{
        store.dispatch({
            type:"producto-agregado",
            payload:{
                codigo,
                nombre,
                cantidad,
                precio,
                categoria
            }
        })
    }

    store.dispatch({
        type:"producto-seleccionado",
        payload: {
            codigo: null
        }
    })
}

store.dispatch({
    type: "producto-agregado",
    payload: {
        codigo:1,
        nombre: "Prueba",
        cantidad: 3,
        precio:10,
        categoria: 2
    }
})


store.dispatch({
    type: "producto-agregado",
    payload: {
        codigo:2 ,
        nombre: "Prueba 2",
        cantidad: 4,
        precio:6,
        categoria: 8
    }
})

//unsuscribe()

store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo:2 ,
        nombre: "Prueba 4",
        cantidad: 7,
        precio:7,
        categoria: 5
    }
})


/*
store.dispatch({
    type: "producto-eliminado",
    payload: {
        codigo:2 
    }
})

*/
const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoOModificado : "producto-agregado-o-modificado"
}



const reducer = (state,action) => {

    console.log("viene: ", action.type)


    switch (action.type){
        case ActionTypes.ProductoAgregado:
            return productoAgregadoreducer(state, action)
            
        case ActionTypes.ProductoModificado:
            return productoModificadoReducer(state, action)
            
        case ActionTypes.ProductoEliminado:
            return productoEliminadoReducer(state, action)
            
        case ActionTypes.ProductoSeleccionado:
            return productoSeleccionadoReducer(state, action)
            
        default:
            return state
    }

    // if(action.type =="producto-agregado"){
    //     const producto = action.payload
    //     const total = producto.cantidad * producto.precio
    //     return {
    //         ...state,
    //         productos : [
    //             ...state.productos,
    //             {
    //                 ...producto,
    //                 total
    //             }
    //         ]
    //     }
    // }

    // if (action.type ==ActionTypes.ProductoModificado){
    //     const productos = state.productos.slice()//hacemos copia del original
    //     const producto = action.payload
    //     const codigo = producto.codigo
    //     const total = producto.cantidad * producto.precio
    //     const old = productos.find((item)=> item.codigo == codigo)
    //     const index = productos.indexOf(old)
    //     productos[index] = {...producto,total}

    //     return {
    //         ...state,
    //         productos
    //     }
    // }

    // if (action.type ==ActionTypes.ProductoEliminado){
    //     const codigo = action.payload.codigo
    //     const productos = state.productos.filter((item)=> item.codigo!= codigo)
    //     return {
    //         ...state,
    //         productos
    //     }
    // }

    // if (action.type == ActionTypes.ProductoSeleccionado){
    //     const codigo = action.payload.codigo
    //     return (
    //         {
    //         ...state,
    //         producto: state.productos.find(x => x.codigo == codigo) || {}
    //         }
    //     )
    // }

    // return state
}

//action builder
const productoSeleccionado = (codigo) => ({
        type:ActionTypes.ProductoSeleccionado,
        payload: {codigo }
})


const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: {codigo }
})


const productoModificado = (payload) => ({
    type:ActionTypes.ProductoModificado,
    payload
})


const productoAgregado = (payload) =>({
    type: ActionTypes.ProductoAgregado,
    payload
})

//Middelware, permite crear una app como si tuviera plugins
//sin cambiar el codigo original

// function loggerMiddleware(store){
//     return function dispatchWrapper(next){
//         return function actionHandler(action){
//             next(action)
//             console.log(store.getState())
//         }
//     }
// }


const loggerMiddleware = store => next => action => 
{
    const result = next(action)
    console.log(store.getState())
    return result

}

const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoOModificado,
    payload
})


const agregarOModificarProductoMiddleware = store => next => action => {

    if (action.type !=ActionTypes.ProductoAgregadoOModificado)
    {
        return next(action)
    }
    else
    {
        const producto = action.payload
        const actionToDispatch = producto.codigo ? productoModificado(producto) : productoAgregado(producto)

        // if (producto.codigo){
        //     actionToDispatch = productoModificado(producto)
        // }else{
        //     actionToDispatch = productoAgregado(producto)
        // }

        store.dispatch(actionToDispatch)
        return store.dispatch(productoSeleccionado(null))
    }
}



const generadorCodigoProductoMiddleware = store => next=> action => {
    if (action.type != ActionTypes.ProductoAgregado){
        return next(action)
    }

    action.payload = {...action.payload, codigo}
}

function productoSeleccionadoReducer(state, action) {
    {
        const codigo = action.payload.codigo
        return (
            {
                ...state,
                producto: state.productos.find(x => x.codigo == codigo) || {}
            }
        )
    }
}

function productoEliminadoReducer(state, action) {
    {
        const codigo = action.payload.codigo
        const productos = state.productos.filter((item) => item.codigo != codigo)
        return {
            ...state,
            productos
        }
    }
}

function productoModificadoReducer(state, action) {
    {
        const productos = state.productos.slice() //hacemos copia del original
        const producto = action.payload
        const codigo = producto.codigo
        const total = producto.cantidad * producto.precio
        const old = productos.find((item) => item.codigo == codigo)
        const index = productos.indexOf(old)
        productos[index] = { ...producto, total }

        return {
            ...state,
            productos
        }
    }
}

function productoAgregadoreducer(state, action) {
    {
        const producto = action.payload
        const total = producto.cantidad * producto.precio
        return {
            ...state,
            productos: [
                ...state.productos,
                {
                    ...producto,
                    total
                }
            ]
        }
    }
}

function generadorCodigoProductoBuilder(codigoInicial){

    let codigo = codigoInicial

    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado){
            return next(action)
        }
    
        codigo++
        const actionToDispatch = {
            ...action,
            payload:{
                ...action.payload,
                codigo
            }
        }
        return next(actionToDispatch)
    }
}
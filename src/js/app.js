
import {applyMiddleware, createStore} from "redux"
import {ui} from "./ui"
import * as $store from "./store"

const preloadedState ={
    producto :{},
    productos: []
}

const middleWares = applyMiddleware(
    $store.loggerMiddleware,
    $store.agregarOModificarProductoMiddleware,
    $store.generadorCodigoProductoBuilder(0)
)

const store = createStore($store.reducer, preloadedState, middleWares)

store.subscribe(dispatchOnChange(store, (state)=> {
    ui.renderForm(state.producto)
    ui.renderTable(state.productos)
}))

// let latestState

// const unsuscribe = store.subscribe( () => {
//     let currentState = store.getState()
//     if(currentState != latestState){
//         latestState = currentState
//         ui.renderForm(currentState.producto)
//         ui.renderTable(currentState.productos)
//     }
        
// })


ui.onFormSubmit = (producto) => store.dispatch($store.agregarOModificarProducto(producto))
  

ui.onEliminarClick = (codigo) => store.dispatch($store.productoEliminado(codigo))


ui.onEditarClick = (codigo) => store.dispatch($store.productoSeleccionado(codigo))


function dispatchOnChange(store, dispatch){
    let latestState

    return function () {
        let currentState = store.getState()
        
        if(currentState != latestState){
            latestState = currentState
            dispatch(currentState)
        }
    }
}

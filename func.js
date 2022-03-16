//programacion funcional

//la logica de nuestra programacion la pongamos dentro de funciones

/*
function mensaje(prefix, formateador)
{
    return function(texto)
    {
        return formateador(prefix,texto)
    }
}
*/


const formatoBienvenida = function(prefijo,texto)
{
    return "!" + prefijo + " " + texto +"¡"
}


/*const formatoDespedida = function(prefijo,texto)
{
    return prefijo + " " + texto + "..("
}*/

const mensaje = (prefijo, format) => (texto) => format(prefijo, texto)


const formatoDespedida = (prefijo, texto) => `${prefijo} ${texto} ..(` //arrow function


const bienvenida = mensaje("hola",formatoBienvenida)
const despedida = mensaje("adios",formatoDespedida)

console.log(bienvenida("mundo"))
console.log(despedida("mundo"))
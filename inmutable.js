// no modifiquemos los valores de nuestros objetos sino creemos nuevos objetos con los valores que queremos

const juan = {
    nombre : "Juan",
    apellido : "Rodriguez",
    edad: 30,
    direccion:{
        departamento:"Guatemala",
        municipio: "San juan"
    }
}

const juan2 = Object.assign({},juan)
const juan3 = Object.assign({},juan, {apellido: "Sazo"})
const juan4 = {... juan, apellido: "Ortiz", tel:"55691853"}


juan5 = {
        ...juan,
        apellido:"Perez",
        telefono:"123456",
        direccion:{
            ...juan.direccion,
            municipio:"San Ray",
            aldea:"Montu"
        }
    }

//console.log(juan2)
//console.log(juan3)
//console.log(juan5)


//arreglos inmutables

const numeros =[1,2,3,4]
const numeros2 = [0,...numeros,5]

const index =numeros.indexOf(2)
const numeros3 = [
    ...numeros.slice(0,index),
    1.5,
    ...numeros.slice(index)
]

const numeros4 = numeros.filter(x => x!=2)

//modificar un valor
const numeros5 = numeros.map(x=> x==2 ? 100 : x)

console.log(numeros)
console.log(numeros2)
console.log(numeros3)
console.log(numeros4)
console.log(numeros5)
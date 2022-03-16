
function palindromo(x){
    let direct = (x.toString()).split("")
    let inverse = [...direct].reverse()


    direct = direct.join("") 
    inverse = inverse.join("")

    if (direct === inverse)
        return true
    else
        return false
}


//console.log(palindromo(123))

function maxWaterWeight(height){

    var areas = []

    for(var i = 0; i< height.length-1; i++){
        var x0 = height[i]
        for(var k = i+1; k < height.length; k++){
            areas.push(Math.min(x0, height[k])*(k-i))
        }
    }

    return Math.max(...areas)
}

console.log(maxWaterWeight([1,8,6,2,5,4,8,3,7]))
console.log(maxWaterWeight([4,3,2,1,4]))
console.log(maxWaterWeight([1,2,1]))


// redux

const price = [1,2,3,4,5]


const returnOrder = price.reduce((total,item)=>{
    return total+item
})


console.log(returnOrder)
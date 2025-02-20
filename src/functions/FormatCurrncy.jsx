const FromatC = new Intl.NumberFormat(undefined , {
    currency: 'USD',
    style : 'currency'
})

const Convert = (number)=>{
    return FromatC.format(number)
}


export default Convert
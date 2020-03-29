const fetch = require('node-fetch')


const previsao = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/72027af95938c7fb799d09c966ffd3ba/${latitude},${longitude}?units=si&lang=pt`
    fetch(url)
    .then((res)=>{
        if(res.ok){
            data = res.json()
            return data
        } else {
            throw new error(res.statusText)
        }
    }).then((data)=>{
        callback(undefined,{
            resumo: data.daily.data[0].summary,
            temperatura: data.currently.temperature,
            precipitacao: data.currently.precipProbability
        })
    }).catch((err)=>{
        callback(err,undefined)
    })
}


module.exports = previsao
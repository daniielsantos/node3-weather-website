const fetch = require('node-fetch')
const request = require('request')

const previsao = (latitude, longitude, callback) =>{
    const url = `https://api.darksky.net/forecast/72027af95938c7fb799d09c966ffd3ba/${latitude},${longitude}?units=si&lang=pt`
    
    
    request({ url, json: true }, (error, {body}={})=>{
        if(error) {
            callback('Não foi possível conectar ao servidor. Por favor, verifique sua conexão.',undefined)
        }else if(body.error) {
            callback('Não foi possível encontrar esta localização',undefined)
        }else {
            const prob = body.currently.precipProbability
            const json = JSON.stringify(prob)
            var chancechuva = json.substring(2, 4)
            
            callback(undefined,`${body.daily.data[0].summary} Atualmente com temperatura de ${body.currently.temperature} °c minima de ${body.daily.data[0].temperatureMin} °c e maxima de ${body.daily.data[0].temperatureMax} °c. Com ${chancechuva} % de chuva.`)
    
        }
    })    
}


module.exports = previsao
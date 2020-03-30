const fetch = require('node-fetch')
const request = require('request')

const geocode = (address, callback) =>{
    const encoded = encodeURIComponent(address) // caso o nome da cidade tenha caracteres especiais
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=pk.eyJ1Ijoibm90aGluNCIsImEiOiJjazhiMDFocmUwM20zM2Vuc2Y0Zmt6aml6In0.jtCFcTt7ZQ0f_ho8zIQpTg`
    
    request({ url, json: true }, (error, {body}={})=>{
        if (error){
            callback('Verifique sua conexão.',undefined)
        }else if(body.query.length < 1){                      
            callback('Localização invalida.',undefined)
        }else {            
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
     
            })
        }
    
    }
)}
 module.exports = geocode
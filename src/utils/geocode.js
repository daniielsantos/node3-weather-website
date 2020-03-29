const fetch = require('node-fetch')


const geocode = (address, callback) =>{
    const encoded = encodeURIComponent(address) // caso o nome da cidade tenha caracteres especiais
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?access_token=pk.eyJ1Ijoibm90aGluNCIsImEiOiJjazhiMDFocmUwM20zM2Vuc2Y0Zmt6aml6In0.jtCFcTt7ZQ0f_ho8zIQpTg`
    fetch(url)
    .then((res)=>{
        if (res.ok){
            data = res.json()
            return data
        }
        else {
            throw new error (res.statusText)
            //callback(err,undefined)
 
        }
    }).then((data)=>{
        callback(undefined,{
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
 
        })
    }).catch((err)=>{                     
        callback(err,undefined)
        
    })
 }

 module.exports = geocode
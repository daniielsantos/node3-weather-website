const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageError = document.querySelector('#message-2')





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading...'
    messageError.textContent = ''

    url = `http://localhost:3000/weather?address=${location}`
    fetch(url)
    .then((res)=>{
        if(!res.ok){
            const data = res.json()
            messageError.textContent = data
            //res.send(data)           
        }
        res.json().then((data)=>{
            const clima = `Hoje em ${data.location}. ${data.forecast} Chance de chuva ${data.rainchance}%`
            messageOne.textContent = clima
        })
    })
    
})
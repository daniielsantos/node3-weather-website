const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageError = document.querySelector('#message-2')





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading...'
    messageError.textContent = ''

    url = `/weather?address=${location}`
    fetch(url)
    .then((res)=>{
        if(res.ok){

            res.json().then((data)=>{                
                if(data.resumo){                    
                    messageOne.textContent = data.resumo            
                }else {
                    messageOne.textContent = ''
                    messageError.textContent = data.error
                }
            })                     
        }else {           
            messageError.textContent = 'erro de conexão'
                       
        }

    })
    
})
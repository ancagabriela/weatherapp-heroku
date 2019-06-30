// console.log('yeah')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

//messageOne.textContent = 'From js'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{
        response.json().then((address) =>{
            if (address.error) {
                messageOne.textContent = address.error
            } else {
                messageOne.textContent = address.location
                messageTwo.textContent = address.forecast
            }
        })
    })
})
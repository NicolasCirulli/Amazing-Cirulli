const input = document.querySelector('input')
const textarea =  document.querySelector('textarea')
const submit = document.querySelector('.bg__btn')

submit.addEventListener( 'click', () => {
    alert(`Thanks ${input.value.slice(0, input.value.indexOf('@'))}`)
    input.value = ''
    textarea.value = ''
} )

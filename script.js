
const route = {
    '/': catalog,
    '/product': product
}

console.log(route["/"])
const root = document.querySelector('#root')
root.innerHTML = route["/"]

// console.log(route[window.location.pathname])

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    root.innerHTML = route[pathname]
}

let catalogPage = document.querySelector('.catalog')

catalogPage.addEventListener('click', () => {
    onNavigate('/product')
    return false
})



fetch('http://localhost:3000/product')
    .then(responce => responce.json()) 
    .then(json => console.log(json))
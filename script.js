
const route = {
    '/': catalog,
    '/product': product
}

// console.log(route["/"])
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
    fetch('http://localhost:3000/product')
        .then(responce => responce.json()) 
        .then(json => {
            // console.log(json.specifications[0].price.count)
            for(let i = 0; i <json.length; i++){
                console.log(json[i].specifications[0].price.count)
                new Product(
                    json[i].id,
                    json[i].specifications.map(e => {
                        return e.name
                    }),
                    json[i].name,
                    json[i].specifications.map(e=>{
                        return e.price.count
                    }),
                    root
                
                ).render()
            }
            
    })
    // new Product(
    //     1,
    //     'M',
    //     'Перчатки',
    //     1000,
    //     root
    
    // ).render()
    return false
})



// fetch('http://localhost:3000/product')
//     .then(responce => responce.json()) 
//     .then(json => console.log(json))


class Product {
    constructor(id, specifications, name, price, parentSelector){
        this.id = id,
        this.specifications = specifications,
        this.name = name,
        this.parent = parentSelector
        this.price = price
    }
    
    render(){
        
            
        const element = document.createElement('div')
        element.innerHTML = `
            <div class="product">
                <div class="product__price">${this.price}</div>
                <div class="product__title">${this.name}</div>
                <div class="product__specifications">${this.specifications}</div>
                <div class="buttons">
                    <button class="minus">-</button>
                    <button class="plus">+</button>
                    
                </div>
            </div>   
        `;
        this.parent.append(element)
    }
}

// new Product(
//     1,
//     'M',
//     'Перчатки',
//     1000,
//     '#root'

// ).render()

// let model = 'db.json'
// console.log(model)
// let pr = new Product(model.product)
// console.log(pr)
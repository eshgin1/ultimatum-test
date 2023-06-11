
const route = {
    '/': catalog,
    '/product': product
}

// console.log(route["/"])
const root = document.querySelector('#root')
root.innerHTML = route["/"]


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
            for(let i = 0; i <json.length; i++){
                new Product(
                    json[i].id,
                    json[i].specifications.map(e => {
                        return e.name
                    }),
                    json[i].name,
                    json[i].specifications.map(e=>{
                        return e.price.count
                    }),
                    root,
                    0
                ).render() 
                
            }
    })
    return false
})

class Product {
    constructor(id, specifications, name, price, parentSelector,count){
        this.id = id,
        this.specifications = specifications,
        this.name = name,
        this.parent = parentSelector,
        this.price = price,
        this.count = count
    }
    
    render(){
        const element = document.createElement('div')

        element.innerHTML =`
            <div class="product">
                <div class="product__price">${this.price}</div>
                <div class="product__title">${this.name}</div>
                <div class="product__specifications">${this.specifications}</div>
                <div class="buttons">
                    <button onClick="${this.addNumbers(this.count)}" class="minus">-</button>
                    <button class="plus">+</button>
                    <div>${this.count}</div>
                </div>
            </div>   
        `
        this.parent.append(element)
    }

    // a(){
    //     return `console.log('+')`
    // }
    addNumbers(num){
        fetch('http://localhost:3000/product')
            .then(responce => responce.json())
            .then(json => {
                for(let i = 0; i<json.length; i++){
                    json[i].specifications.map(e => {
                        e.balance.map(e => {
                            if(num < e.count){
                                num++
                            }
                        })
                    })
                }
            })
    }
    

}

// class Exp {
//     constructor(button){
//         this.button = button
//     }
//     render(){
//         <button> click</button>
//     }
//     clickBtn(){
//         console.log('+')
//     }
// }

// fetch('http://localhost:3000/product')
//     .then(responce => responce.json()) 
//     .then(json => console.log(json))

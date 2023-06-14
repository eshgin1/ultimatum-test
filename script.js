
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
                console.log(json[i])
                const data = {
                    productId: json[i].id,
                    productSpecification: json[i].specifications.map(size => size.name),
                    productName: json[i].name,
                    productPrice: json[i].specifications.map(price=> price.price.count),
                    root: root,
                    count: 0,
                    
                }

                // console.log(data.productName)

                new Product(
                    data
                ).render()
                
            }
    })
    
    return false
})

class Product {
    constructor(data){
        this.id = data.productId,
        this.specifications = data.productSpecification,
        this.name = data.productName,
        // this.parent = parentSelector,
        this.price = data.productName,
        this.root = data.root
        this.count = data.count
    }

    render(){
        const element = document.createElement('div')
        
        element.innerHTML =`
            <div class="product">
                <div class="product__price">${this.price}</div>
                <div class="product__title">${this.name}</div>
                <div class="product__specifications">${this.specifications}</div>
                <div class="buttons">
                    <button class="minus">-</button>
                    <button class="plus">+</button>
                    <div class="count">${this.count}</div>
                </div>
            </div>   
        `
        this.root.append(element)

        const btnMinus = document.querySelectorAll('.minus')
        const counter = document.querySelectorAll('.count')
        // let count = this.count

        for(let i = 0; i< btnMinus.length; i++){
            btnMinus[i].addEventListener('click', () => {
                counter.forEach(e => {
                    this.countPlus(+1, this.count, e)
                    // e.innerHTML = this.count
                })
                
            })
        }
        
    }

    countPlus(num, count, counter){
        fetch('http://localhost:3000/product')
            .then(responce => responce.json())
            .then(json => {
                for(let i = 0; i<json.length; i++){

                    const productBalance = json[i].specifications[i].balance[i].count;

                    if(count <= productBalance){
                        count += num;
                        counter.innerHTML = count
                    }
                }
            })
    }
}
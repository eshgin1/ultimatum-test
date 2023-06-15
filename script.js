
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

// const btn = document.createElement('button')


catalogPage.addEventListener('click', () => {
    onNavigate('/product')
    
    function getObjWithJson(json){
        let obj = {
            
        }
        json.forEach(itemJson => {
            obj.productId = itemJson.id
            obj.productSpecification = itemJson.specifications.map(size => size.name)
            obj.productName= itemJson.name
            obj.productPric=  itemJson.specifications.map(price=> price.price.count)
            obj.root= root
            obj.count =  0
            obj.btn = document.createElement('button')
        })
        
        console.log(obj)
        
        return obj
    }
    
    fetch('http://localhost:3000/product')
        .then(responce => responce.json()) 
        .then(json => {
            
            json.forEach(e => {
                new Product(
                    getObjWithJson(json), // data
                ).render()
                
            })
            
    })

    
})

class Product {
    constructor(data){
        this.id = data.productId,
        this.specifications = data.productSpecification,
        this.name = data.productName,
        // this.parent = parentSelector,
        this.price = data.productName,
        this.root = data.root,
        this.count = data.count
        this.btn = data.btn
        // console.log(this.btn)
    }
    
    render(){
        const element = document.createElement('div')
        // const btn = document.createElement('button')
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

        
        

        // const btn = document.querySelector('.minus')
        // console.log(btn)
        // btn.addEventListener('click', () => console.log('+'))

        const btnBox = document.querySelector('.buttons')
        btnBox.append(this.btn)

        // const btnBox = document.querySelector('.buttons')
        // btnBox.append(this.btn)
        // this.btn.addEventListener('click', () => console.log('+'))

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


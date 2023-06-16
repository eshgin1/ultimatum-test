
const route = {
    '/': catalog,
    '/product': product
}

// // console.log(route["/"])
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
    
    function getObjWithJson(json){
        let obj = {
            
        }
        json.forEach(itemJson => {
            obj.productId = itemJson.id
            obj.productSpecification = itemJson.specifications.map(size => size.name)
            obj.productName= itemJson.name
            obj.productPric=  itemJson.specifications.map(price=> price.price.count)
            obj.root= root
            obj.count = 1
        })
        
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
    }
    
    render(){
        const element = document.createElement('div')

        // cоздаем count
        const countDiv = document.createElement('div')
        countDiv.innerHTML = `<div class="count">0</div>`
        const count = countDiv.querySelector('.count')
        
        element.innerHTML =`
            <div class="product">
                <div class="product__price">${this.price}</div>
                <div class="product__title">${this.name}</div>
                <div class="product__specifications">${this.specifications}</div>
                <div class="buttons">
                    <div class="count">${this.count}</div>
                </div>
            </div>   
        `
        this.root.append(element)
        
        // заапендили cозданные элементы в дом
        const btnWrap = element.querySelector('.buttons')
        btnWrap.append(this.addBtnMinus())
        btnWrap.append(this.addBtnPlus())

        // this.addBtnMinus(btnWrap)
        // this.addBtnPlus(btnWrap)
    }

    addBtnMinus(btnWrap){
        const btnMinusDiv = document.createElement('div')      
        btnMinusDiv.innerHTML = `<button class="minus">-</button>` 
        const btnMinus = btnMinusDiv.querySelector('.minus')
        // btnWrap.append(btnMinus)
        btnMinus.addEventListener('click', () => console.log('-'))
        return btnMinus
    }
    addBtnPlus(btnWrap){
        const btnPlusDiv = document.createElement('div')
        btnPlusDiv.innerHTML = `<button class="plus">+</button>`
        const btnPlus = btnPlusDiv.querySelector('.plus')
        // btnWrap.append(btnPlus)
        btnPlus.addEventListener('click', () => console.log('+'))
        return btnPlus
    }

    // countPlus(num, count, counter){
    //     fetch('http://localhost:3000/product')
    //         .then(responce => responce.json())
    //         .then(json => {
    //             for(let i = 0; i<json.length; i++){

    //                 const productBalance = json[i].specifications[i].balance[i].count;
    //                 console.log(productBalance)
    //                 if(count <= productBalance){
    //                     count += num;
    //                     counter.innerHTML = count
    //                 }
    //             }
    //         })
    // }
    
}


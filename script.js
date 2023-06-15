
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
            // obj.btn = document.createElement('button')
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
    // static btn = document.querySelector('.minus')
    
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
 
        // создаем кнопки
        const btnMinusDiv = document.createElement('div') // создали какой-то элемент        
        btnMinusDiv.innerHTML = `<button class="minus">-</button>` // положили в этот элемент дом
        const btnMinus = btnMinusDiv.querySelector('.minus')

        const btnPlusDiv = document.createElement('div')
        btnPlusDiv.innerHTML = `<button class="plus">+</button>`
        const btnPlus = btnPlusDiv.querySelector('.plus')


        // cоздаем count
        const countDiv = document.createElement('div')
        countDiv.innerHTML = `<div class="count">0</div>`
        const count = countDiv.querySelector('.count')
        // console.log(typeof +count.innerHTML)
        
        //
        btnMinus.addEventListener('click', () => console.log('-'))
        btnPlus.addEventListener('click', () => this.countPlus(+1, +count.innerHTML, count))
        
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
        
        // заапендили элементы в дом
        const btnWrap = element.querySelector('.buttons')
        btnWrap.append(btnPlus)
        btnWrap.append(btnMinus)
        btnWrap.append(count)
        // 

    }

    countPlus(num, count, counter){
        fetch('http://localhost:3000/product')
            .then(responce => responce.json())
            .then(json => {
                for(let i = 0; i<json.length; i++){

                    const productBalance = json[i].specifications[i].balance[i].count;
                    console.log(productBalance)
                    if(count <= productBalance){
                        count += num;
                        counter.innerHTML = count
                    }
                }

                // json.forEach(e => {
                //     const balance = e.specifications.balance.count;
                //     console.log(balance)
                // })
            })
    }
    
}


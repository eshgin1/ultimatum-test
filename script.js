
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
    
    function getObjWithJson(e){
        let obj = {}

        obj.productId = e.id
        obj.productSpecification = e.specifications.map(size => size.name)
        obj.productName= e.name
        obj.productPric=  e.specifications.map(price=> price.price.count)
        obj.root= root
        obj.count = 0
        obj.balance = e.specifications.map(e => e.balance.map(e => e.count))
        obj.sale = e.specifications

        return obj
        
    }
    
    fetch('http://localhost:3000/product')
        .then(responce => responce.json()) 
        .then(json => {
            json.forEach(e => {
                
                new Product(
                    getObjWithJson(e), // data
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
        this.price = data.productPric,
        this.root = data.root,
        this.count = data.count,
        this.balance = data.balance
    }   
    
    
    render(){
        console.log(this.balance)
        const element = document.createElement('div')

        element.innerHTML =`
            <div class="product">
                <div class="product__price">${this.price}</div>
                <div class="product__title">${this.name}</div>
                <select></select>
                <div class="buttons">
                    <div class="count">${this.count}</div>
                </div>
                <div class="sum"></div>
            </div>   
        `
        this.root.append(element)
        
        // заапендили cозданные элементы в дом
        const btnWrap = element.querySelector('.buttons')
        const counter = btnWrap.querySelector('.count') // достали counter

        // 
        this.addBtnMinus(btnWrap, counter)
        this.addBtnPlus(btnWrap, counter)

        // достанем select и кладем в них option-ы с размерами 
        const selectSize = element.querySelector('select')

        for(let i = 0; i < this.specifications.length; i++){
            const itemSize = document.createElement('option')
            itemSize.append(this.specifications[i])
            selectSize.append(itemSize)
        }

        // отобразить сумму в зависимости от размера
        const priceDiv = element.querySelector('.product__price')
        const itemSize = selectSize.querySelectorAll('option')
        priceDiv.innerHTML = this.price[0]

        selectSize.addEventListener('change', (event) => {
            let arrSize = []
            itemSize.forEach(e => {
                arrSize.push(e.innerHTML)
            })
            
            for(let i = 0; i < this.price.length; i++){
                if(arrSize.indexOf(event.target.value) === i){
                    priceDiv.innerHTML = this.price[i]
                }
            }
        })
    }

    addBtnMinus(btnWrap, counter){
        const btnMinusDiv = document.createElement('div')      
        btnMinusDiv.innerHTML = `<button class="minus">-</button>` 
        const btnMinus = btnMinusDiv.querySelector('.minus')
        btnWrap.append(btnMinus)
        btnMinus.addEventListener('click', () => this.countMinus(-1, counter))
        return btnMinus
    }
    addBtnPlus(btnWrap, counter){
        const btnPlusDiv = document.createElement('div')
        btnPlusDiv.innerHTML = `<button class="plus">+</button>`
        const btnPlus = btnPlusDiv.querySelector('.plus')
        btnWrap.append(btnPlus)
        btnPlus.addEventListener('click', () => this.countPlus(+1, counter, this.balance[0][0]))
        return btnPlus
    }
    countPlus(num,counter, balance){
        console.log(balance)
        if(this.count < balance){
            this.count += num;
            counter.innerHTML = this.count;
        }
    }
    countMinus(num, counter){
        if(this.count > 0){
            this.count = this.count - 1
            counter.innerHTML = this.count;
        }
    }
}


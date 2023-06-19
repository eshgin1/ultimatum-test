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
        obj.sale = e.specifications.map(e => e.sale) 
        // console.log(obj.sale)

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
        // console.log(this.balance)
        const element = document.createElement('div')
        
        element.innerHTML =`
            <div class="product">
                <div class="product__price"></div>
                <div class="product__title">${this.name}</div>
                <select>
                    <option>Размеры</option>
                </select>
                <div class="buttons">
                    <button class="plus">+</button>
                    <button class="minus">-</button>
                    <div class="count">${this.count}</div>
                </div>
                <div class="sum"></div>
            </div>   
        `
        this.root.append(element)
        
        // достаем элементы и "dom"
        const btnWrap = element.querySelector('.buttons')
        // const counter = btnWrap.querySelector('.count') // достали counter
        // const btnPlus = btnWrap.querySelector('.plus')
        const btnMinus = btnWrap.querySelector('.minus')
        let count = 0
        // 
        this.countPlus(btnWrap, element, count)
        // this.countMinus(btnMinus)

        // достанем select и кладем в них option-ы с размерами 
        // const selectSize = element.querySelector('select')

        // for(let i = 0; i < this.specifications.length; i++){
        //     const itemSize = document.createElement('option')
        //     itemSize.append(this.specifications[i])
        //     selectSize.append(itemSize)
        // }

        // отобразить сумму в зависимости от размера
        // const priceDiv = element.querySelector('.product__price')
        // const itemSize = selectSize.querySelectorAll('option')
        
        // priceDiv.innerHTML = this.price[0] 
        // let currentBalance = this.balance[0][0]
        let currentSale = 0 //текущая скидка

        // this.countPlus(btnPlus, +1, counter, currentBalance, )
        // this.countMinus(btnMinus, -1, counter, )
        

        // selectSize.addEventListener('change', (event) => {
        //     let arrSize = []
        //     itemSize.forEach(e => {
        //         arrSize.push(e.innerHTML)
        //     })

        //     this.count = 0
        //     counter.innerHTML = this.count
            
        //     for(let i = 0; i < this.price.length; i++){
               
        //         currentBalance = this.balance[i][0]
                
        //         if(arrSize.indexOf(event.target.value) === i+1){

        //             priceDiv.innerHTML = this.price[i] 
        //             currentBalance = this.balance[i][0]

        //             this.countPlus(btnPlus, +1, counter, currentBalance)
        //             this.countMinus(btnMinus, -1, counter)
        //         }
        //         // if(event.target.value === 'Размеры'){
        //         //     priceDiv.innerHTML = 0
        //         // }
        //     }
        // })
    }

    countPlus(btnWrap, element, count){
        const selectSize = element.querySelector('select') // достастали селекс
        const counter = btnWrap.querySelector('.count') 
        const btnPlus = btnWrap.querySelector('.plus')

        for(let i = 0; i < this.specifications.length; i++){ // добавили элементы
            const itemSize = document.createElement('option')
            itemSize.append(this.specifications[i])
            selectSize.append(itemSize)
        }

        const priceDiv = element.querySelector('.product__price') // куда записываем итоговую сумму
        const itemsSize = selectSize.querySelectorAll('option') // достали все размеры 

        priceDiv.innerHTML = 0 
        // let currentBalance = this.balance[0][0] // текущий баланс на активном элементе

        selectSize.addEventListener('change', (event) => {
            let arrSize = []
            itemsSize.forEach(e => {
                arrSize.push(e.innerHTML)
            })

            // let count  = 0
            // counter.innerHTML = 0

            for(let i = 0; i < this.price.length; i++){
                
                if(arrSize.indexOf(event.target.value) === i+1){
                    priceDiv.innerHTML = this.price[i] 
                    console.log(this.balance[i][0])

                    btnPlus.addEventListener('click', () => {
                        if(count < this.balance[i][0]){
                            count += 1
                            counter.innerHTML = count ; 
                            console.log(count)
                            // console.log('+')
                        }
                        // if(this.count < this.balance[i][0]){
                        //     this.count  += 1;
                        //     counter.innerHTML = this.count ;   
                        // }
                    })
    
                } else if(event.target.value === 'Размеры'){
                    priceDiv.innerHTML = 0
                }
                
            }
        })
    }
    countMinus(btnMinus, num, counter, countStart){

        // btnMinus.addEventListener('click', () => {
        //     if(this.count > 0){
        //         this.count = this.count - 1
        //         counter.innerHTML = this.count;
        //     }
        // })

        btnMinus.addEventListener('click', () => {
            if(this.count  > 0){
                this.count  = this.count  - 1
                counter.innerHTML = this.count ;
            }
            
        })


    }
}
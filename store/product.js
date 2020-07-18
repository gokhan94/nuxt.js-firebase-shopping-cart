import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    products: []
})

export const mutations = {
    productAddState(state, payload){
        state.products = payload
    }
}

export const actions = {
    addProduct({commit, dispatch}, payload){
        const image      = payload.image
        const imageName  = payload.image.name
        let imageURL   = payload.imageURL
        
        let productKey = '' // eklenen ürünün key değerini veriyor

        const productData = {
            brand: payload.brand,
            category: payload.category,
            code: payload.code,
            detail: payload.detail,
            imageURL: payload.imageURL,
            name: payload.name,
            price: payload.price,
            status: payload.status,
            stock: payload.stock
        }
        //Product veritabanına ürün ekleniyor
        firebaseApp.database().ref('products').push(productData)
        .then(product => {
            productKey = product.key
            // resim yükleniyor
            return firebaseApp.storage().ref('images').child(imageName).put(image)  
        })
        .then(imageData => {
            // resimin download url adresi alınıyor 
           imageURL = imageData.metadata.downloadURLs[0]
           
           return firebaseApp.database().ref('products').child(productKey).update({ imageURL: imageURL})
        })
        .then(() => {
            //Ürünün hangi kategoriye ekleneceği belirtiliyor
            const productDetail = {
                name:   payload.name,
                price:  payload.price,
                status: payload.status,
                code:   payload.code,
                imageURL: imageURL
            }

            const categoryUpdate = {}
            categoryUpdate[`productCategories/${payload.category[0]}/${productKey}`] = productDetail
            return firebaseApp.database().ref().update(categoryUpdate)
        })
        .then(() => {
            //dispatch('getProducts')
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getProducts({commit}){
        firebaseApp.database().ref('products').once('value')
        .then(snapShot => {

            const products = []
            let item = {}

            snapShot.forEach(product => {
                item = product.val()
                item.key = product.key
                products.push(item)
              })

            commit('productAddState', products)
            
        })
    },
    removeProduct({commit}, payload){
        const imageURL = payload.imageURL
        console.log(imageURL)
    }
}

export const getters = {
    getProduct(state){
        return state.products
    }
}
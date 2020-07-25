import firebaseApp from '@/plugins/firebase'

export const state = () => ({
    products: [],
    product: null,
    cart: {
        items: []
    }
})

export const mutations = {
    productAddState(state, payload){
        state.products = payload
    },
    loadProduct(state, payload){
        state.product = payload
    },
    updateCart(state, payload){
        state.cart.items.push(payload)
    },
    emptyCart(state){
        state.cart.items = []
    },   
    updateQuantity(state, payload){
        state.cart.items[payload.productKey].qauntity = payload.productQuantity
    },
    incQuantity(state, payload){
        state.cart.items[payload].qauntity++
    }
}

export const actions = {
    addProduct({commit, dispatch}, payload){
        const image      = payload.image
        const imageName  = payload.image.name
        let imageURL   = payload.imageURL
        
        let productKey = '' 

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
        // "https://firebasestorage.googleapis.com/v0/b/nuxt-shopping.appspot.com/o/images%2Fssss.jpg?alt=media&token=aee3c90d-0560-465c-8eda-6c494234dc24"
        
        const refUrl   = imageURL.split('?')[0]
        // "https://firebasestorage.googleapis.com/v0/b/nuxt-shopping.appspot.com/o/images%2Fssss.jpg"

        const imageRef = firebaseApp.storage().refFromURL(refUrl)
        imageRef.delete()
        .then(() => {
            return firebaseApp.database().ref('products').child(payload.key).remove()
            .then(() => {
                // Ürün hangi kategoriye aitse ondanda silmem lazım
                return firebaseApp.database().ref('categories').once('value')
                .then(snapShot => {
                    const categoryData = Object.values(snapShot.val())

                    let updated = {}

                  // ilk önce kategoriler çekilir
                  // productCategories tablosunda ilgili kategori ismine denk gelen product id silinir

                    categoryData.forEach(category => {
                        updated[`productCategories/${category.name}/${payload.key}`] = null       
                    })

                    return firebaseApp.database().ref().update(updated)

                })
            })
        })
        return firebaseApp.database().ref('comments').once('value')
        .then(snapShot => {
           const commentData = Object.keys(snapShot.val())

           let updatedData = {}
           commentData.forEach(commentKey => {
               updatedData[`productComments/${payload.key}/${commentKey}`] = null
               if(commentKey == payload.commentKey){
                updatedData[`comments/${commentKey}`] = null  
               }
           })

           return firebaseApp.database().ref().update(updatedData)
        })
    },
    productCategories({commit}, payload){
        console.log(payload)
    },
}

export const getters = {
    getProduct(state){
        return state.products
    },
    getProductEdit(state){
        return state.product
    },
    cart(state){
        return state.cart
    }
}
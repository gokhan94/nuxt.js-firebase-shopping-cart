export default {
    data(){
        return {
          cart: this.$store.getters['product/cart']
        }
    },  
    computed: {
        cartTotal(){
          let totalAmount = 0
          this.cart.items.forEach(item => {
          totalAmount += item.qauntity * parseInt(item.product.price)
          })
          return totalAmount
        }
      },
      methods: {
        productInCart(product){
            const cartItems = this.cart.items
            for(let i = 0; i < cartItems.length; i++){
                if(cartItems[i].product.key === product.key){
                    return i
                }
            }
            return null
      },
      addToCart(product, qauntity){

        const productKey = this.productInCart(product)
        const productQuantity = (!qauntity || qauntity < 1) ? 1 : parseInt(qauntity)
       
       if(productKey === null){
        const productItem = {
          product: product,
          qauntity: productQuantity
        }
        this.$store.commit('product/updateCart', productItem) 
        }else{
            if(!qauntity){
                this.$store.commit('product/incQuantity', productKey)
            }
        this.$store.commit('product/updateQuantity', { productKey, productQuantity }) 
        }
      }
      } 
}
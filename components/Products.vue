<template>
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <nuxt-link :to="{ path: productPath(product.name, product.key) }"><img :src="product.imageURL" alt="Image"></nuxt-link>                
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content has-text-centered">                            
                <p class="subtitle is-6">{{ product.name }}</p>
                <p class="title is-4"> {{ product.price }}</p>
              </div>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <span>
                    <a href="#" @click.prevent="addToCart(product)" class="button is-primary">Add to Cart</a>
                </span>
              </p>
            </footer>
          </div>    
</template>
<script>
import slugify from 'slugify'
import cartMixin from '@/mixins/cartMixin'
export default {
    props: {
      product: {
        type: Object,
        required: false
      }
    },
    mixins: [cartMixin],
    methods: {
      linkSlug(str){
        return slugify(str, {
          replacement: '-',  
          remove: /[$*_+~.()'"!\-:@]/g, 
          lower: true,      
        })
      },
      productPath(name, productKey){
        const slug = this.linkSlug(name) // product-title
        return `/urun/${slug}/${productKey}`
      },
    },
}
</script>
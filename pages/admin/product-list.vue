<template>
  <div>
    <section class="section no-top-pad">  
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h5 class="title is-5">Products</h5>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <nuxt-link class="button is-primary" to="/admin/product-edit">Add</nuxt-link> 
          </div>
        </div>
      </nav>
      <hr>
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Code</th>                      
            <th>Brand</th>
            <th>Stock</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>  
        <tbody>
          <tr v-for="(product, index) in products" :key="product.key">
            <th>{{++index}}</th>

            <td><img :src="product.imageURL" class="image is-48x48" alt="Image"></td>
            <td>{{ product.name }}</td>
            <td> {{ product.category[0] }}</td>                                                                   
            <td> {{ product.code }}</td>
            <td> {{ product.brand }}</td>
            <td> {{ product.stock }}</td>
            <td> {{ product.status }}</td>
            <td><a href="#" @click="removeProduct(product)"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
            <td><a href="#" @click.prevent="editProduct(product)"><span class="icon has-text-success"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
          </tr>                
        </tbody>
      </table>                        
    </section>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('product/getProducts')
  },
  computed: {
    products(){
      return this.$store.getters['product/getProduct']
    }
  },
  methods: {
    removeProduct(product){
      this.$store.dispatch('product/removeProduct', product)
    },
    editProduct(product){
        this.$store.commit('product/loadProduct', product)
        this.$router.push('product-edit')
    }
  }
}
</script>
<template>
  <div>
    <section class="section no-top-pad">  
      <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <h5 class="title is-5">Add Product</h5>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <nuxt-link class="button" to="/admin/product-list">Back</nuxt-link> 
            </div>
          </div>
        </nav>
      <hr>

      <div class="columns">
        <div class="column is-one-third">
          <label class="label">Product image</label>
          <div class="file has-name is-fullwidth">                        
            <label class="file-label">
              <input class="file-input" type="file" name="resume" @change="uploadImage">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                  Upload
                </span>
              </span>
              <span class="file-name">
                product.jpg
              </span>
            </label>
          </div>         
          <br>
          <p class="image is-4by3">
            <img src="https://placehold.it/800x600">
          </p>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Product Name*</label>
            <div class="control">
              <input class="input" type="text" name="name" v-model="product.name">
            </div>
          </div>
          <div class="field">
            <label class="label">Code*</label>
            <div class="control">
              <input class="input" type="text" name="code" v-model="product.code">
            </div>
          </div>
          <div class="field">
            <label class="label">Brand*</label>
            <div class="control">
              <input class="input" type="text" name="brand" v-model="product.brand">
            </div>
          </div>
          <div class="field">
            <label class="label">Price*</label>
            <div class="control">
              <input class="input" type="number" name="price" v-model="product.price">
            </div>
          </div>
          <div class="field">
            <label class="label">Stock*</label>
            <div class="control">
              <input class="input" type="number" name="stock" v-model="product.stock">
            </div>
          </div>
          <div class="field">
            <label class="label">Category Change</label>
            <div class="control">
              <div class="select is-multiple">
                <select multiple size="3" name="category" v-model="product.category">                  
                  <option v-for="category in categories" :key="category.id" :value="category.name">
                    {{ category.name }}
                  </option>
                </select>             
              </div>              
            </div>
          </div> 
          <div class="field">
            <label class="label">Status*</label>
            <div class="control">
              <div class="select">
                <select name="status" v-model="product.status">
                  <option value="0">Available</option>
                  <option value="1">Not Available</option>
                </select>
              </div>
            </div>
          </div>  
          <div class="field">
            <label class="label">Detail</label>
            <div class="control">
              <textarea class="textarea" v-model="product.detail"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="addProduct">Submit</button>
            </div>                    
          </div>
        </div>           
      </div>                        
  </section>
  </div>
</template>

<script>
export default {
  //mounted(){
   // this.$store.dispatch('product/getProducts')
  //},
  data(){
    return {
      product: {
        name: '',
        code: '',
        brand: '',
        price: '',
        stock: '',
        category: [], // [ "-MBxh32QVOY1GSbfbbQT" ]
        status: 1,
        detail: '',
        image: '',
        imageURL: ''
      }
    }
  },
  methods: {
    addProduct(){
      //console.log(this.product.categoryChange)
      this.$store.dispatch('product/addProduct', {...this.product})
    },
    uploadImage(e){
      //const file = e.target.files[0]
      //this.product.image = file
      //console.log(file);

      const file = e.target.files[0];
      this.product.image = file

      const reader = new FileReader();
      reader.onload = () => {
        this.product.imageURL = reader.result
      }
       reader.readAsDataURL(file)
    }
  },
  computed: {
    categories(){
      return this.$store.getters['category/getCategories']
    }
  }
}
</script>
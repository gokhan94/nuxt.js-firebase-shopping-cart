<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">Product categories</h5><hr>

      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">New category</label>
            <div class="control">
                <input class="input" type="text" name="category" v-model="categoryName">
            </div>
          </div>
          <div class="field">
            <div class="control">
                <button class="button is-primary" @click="addCategory">Create</button>
            </div>                    
          </div>
        </div>
        <div v-if="getCategories" class="column">
          <table  class="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>&nbsp;</th>
                <th>Category Key</th>
                <th>&nbsp;</th>
              </tr>
            </thead>  
            <tbody>
              <tr v-for="(categories, index) in getCategories" :key="categories.key">
                  <th>{{ ++index }}</th>
                  <td><a href="#" @click.prevent="selectCategory(categories)">{{ categories.name }}</a></td>
                  <td><a href="#" @click.prevent="removeCategory(categories)"><span class="icon has-text-danger"><i class="fa fa-lg fa-times-circle"></i></span></a></td>
                  <td><a href="#"> {{categories.key}} </a></td>
              </tr>
            </tbody>
          </table>
        </div>               
      </div>                        
    </section>
  </div>
</template>

<script>
export default {
  mounted(){
    this.$store.dispatch('category/getCategories')
  },
  data(){
    return {
      categoryName: ''
    }
  },
  methods: {
    addCategory(){
      this.$store.dispatch('category/addCategory', this.categoryName)
      this.categoryName = ""
    },
    selectCategory(categories){
      console.log(categories)
    },
    removeCategory(categories){
      this.$store.dispatch('category/deleteCategory', categories)
    }
  },
  computed: {
    getCategories(){
      return this.$store.getters['category/getCategories']
    },
  }    
}
</script>
<template>
  <div>
    <section class="section left-right-pad">    
      <div class="columns">
        <div class="column is-6">
          <div class="image is-4by3">
              <img :src='product.imageURL' />
          </div>
        </div>
        <div class="column is-5 is-offset-1">
          <div class="title is-2"> {{product.name}} </div>
          <p class="title is-3 has-text-muted">$ {{product.price}} </p>
          <hr>                             
          <table class="table">
            <tbody>
              <tr>
                <td class="">
                  <strong>Product Code:</strong>
                </td>
                <td>{{product.code}}</td>
              </tr>  
              <tr>
                <td class="">
                  <strong>Brand:</strong>
                </td>
                <td>{{product.brand}}</td>
              </tr>              
              <tr>
                <td class="">
                  <strong>Availability:</strong>
                </td>
                <td> {{product.stock}} </td>
              </tr>
            </tbody>
          </table>
                    
          <div class="field is-grouped is-grouped-multiline">
            <p class="control">
              <input class="input has-text-centered" style="width:50px;" type="number" ref="quantity" name="" value="1">
            </p>
            <p class="control">
              <a class="button is-primary">Add to cart</a>
            </p>
          </div>                    
          
        </div>
      </div>    
    </section>

    <section class="section">
        <h6 class="title is-6">Details</h6>
        <hr size="1">
        <div class="content">
          <p>{{ product.detail }}</p>
        </div>         
    </section> 


          <div class="field">
            <label class="label">Comments</label>
            <div class="control">
              <textarea class="textarea" placeholder="deneme..." v-model="comment"></textarea>
            </div> 
              <p class="card-footer-item">
                <span>
                    <a href="#" @click.prevent="addComment" class="button is-primary">Add Comment</a> 
                </span>
              </p>
          </div>
      
       <Comments  :comments="comments"/>

  </div>  
</template>
<script>
import firebaseApp from '@/plugins/firebase'
import Comments    from '@/components/comments'
export default {
    created(){
      if(this.$store.getters['comment/getComments']){
        this.$store.dispatch('comment/getComment')
      }
    },
    components: {
      Comments
    },
    data(){
        return {
            comment: '',
            id: this.$route.params.id
        }
    },
    asyncData({ params }){
        return firebaseApp.database().ref(`products/${params.id}`).once('value')
        .then(snapShot => {
            let product = snapShot.val()
            product.key = params.id
            return { product }
        })
    },
    methods: {
        addComment(){
          let user = firebaseApp.auth().currentUser

          const commentData = {
            comment:   this.comment,
            productId: this.id,
            userName : user.displayName
          }
          this.$store.dispatch('comment/addComment', commentData)
        }
    },
    computed: {
      comments(){
        return this.$store.getters['comment/getComments']
      }
    }
}
</script>
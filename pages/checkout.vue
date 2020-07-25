<template>
  <div>
    <section class="section no-top-pad">  
      <h5 class="title is-5">Checkout</h5><hr>

      <h5 class="title is-5">
        <span class="icon is-medium has-text-success">
          <i class="fa fa-check-square"></i>
        </span>
        We've received your orders. Thank you so much for shopping with us.
      </h5>    


      <div ref="card"></div>

          <div class="field">
            <div class="control">
                <button class="button is-primary">Purchase</button>
            </div>                    
          </div>

    </section>
  </div>
</template>

<script>
export default {    
 data(){
   return {
     card: null,
     stripe: null
   }
 },
 mounted(){
   this.stripe = Stripe("pk_test_51H8iX9C9OYOUZ0m67jfVwFQ0hWIqerDEDe4rLjcs7BTKMRbpCXZ2BRB5eJBXrO9UojSWT33qIK4wuvj0sLFHM0uz00VRDMSoDz")
   let elements = this.stripe.elements()
   this.card = elements.create("card")
   this.card.mount(this.$refs.card)
 }
}
</script>
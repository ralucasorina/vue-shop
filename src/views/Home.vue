<template>
    <div class="home">
       <navBar></navBar>
       <hero/>
        <products/>
        
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/x.jpg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-primary mr-4">Browse Products</button>
          </div>
        </div>
      </div>

   <login></login>
  </div>
</template>

<script>
// @ is an alias to /src
import hero from "@/components/hero.vue";
import products from "@/sections/products.vue";
import login from "@/components/login.vue";


export default {
  name: "Home",
  components: {
    hero, products, login

  }
};
</script>
<style>
</style>

<template>
  <div class="products">
    <div class="container">
       <h3>products</h3>

       <div class="product-test">
         <div class="form-group">
           <input type="text" placeholder="product name" 
           v-model="product.name" class="form-control">
         </div>

         <div class="form-group">
           <input type="text" placeholder="price" 
           v-model="product.price" class="form-control">
         </div>

         <div class="form-group">
           <button @click="saveData" class="btn btn-primary">Save Data 
           </button>    
         </div>   

         <hr>
         <h3>product list</h3>

         <table>
           <thead>
             <tr>
               <th>name</th>
               <th>price</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="prod in productsAll" :key="prod">
               <td>{{prod.name}}</td>
               <td>{{prod.price}}</td>
             </tr>
           </tbody>
         </table>
       </div>
    </div>
  
  </div>
</template>

<script>

import {fb,db} from '../firebase'

export default {
  name: "products",
  props: {
    msg: String
  },
  data() {
    return {
      productsAll: [],
      product: {
          name:null,
          price:null
      }

    }
  },
  methods: {
    readData() {
      db.collection("products").get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        this.productsAll.push(doc.data());
            });
        });
    },
    saveData() {
      db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },

    reset(){
      //Object.assign(this.$data, this.$options.data.apply(this));
    }
  },

  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.products {
  padding-top:10vh;
}

</style>

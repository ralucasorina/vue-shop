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

         <div class="table-responsive">
           <table class="table">
           <thead>
             <tr>
               <th>name</th>
               <th>price</th>
               <th>modify</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="product in productsAll" :key="product">
               <td>{{product.data().name}}</td>
               <td>{{product.data().price}}</td>
               <td>
                 <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                 <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
               </td>
             </tr>
           </tbody>
         </table> 
         </div>
       </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                <div class="form-group">
              <input type="text" placeholder="product name" 
              v-model="product.name" class="form-control">
            </div>

            <div class="form-group">
              <input type="text" placeholder="price" 
              v-model="product.price" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
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
      },
      activeItem:null

    }
  },
  methods: {
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
         this.products = [];
          querySnapshot.forEach((doc) => {
              this.products.push(doc);
          });
      });

    },
    updateProduct() {
       
        db.collection("products").doc(this.activeItem).update(this.product)
        .then(() => {
            $('#edit').modal('hide');
            this.watcher();
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    },
    editProduct(product) {
      $('#edit').modal('show');
      this.product=product.data();
      this.activeItem=product.id;
    },
    deleteProduct(doc) {
      if( confirm('are you sure?') ) {
        db.collection("products").doc(doc).delete().then(function() {
              console.log("Document successfully deleted!");
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });

      }else {

      }

    },
    readData() {
      db.collection("products").get().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        this.productsAll.push(doc);
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

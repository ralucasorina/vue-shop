<template>
  <div class="products">
    <div class="container">
       <h3>products</h3>
       
       <div class="product-test">
         <h3>product list</h3>
         <button @click="addNew" class="btn btn-primary">Add preparat</button>

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
    <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <text-area>Product Description</text-area>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
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
          description:null,
          price:null,
          tags:[],
          images:[]
      },
      activeItem:null

    }
  },
  firestore() {
    return {
      // Collection
        products: fb.collection('products')
    }

  },
  methods: {
    addNew() {
      $('#product').modal('show');
    },
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
    addProduct() {
      this.$firestore.products.add(this.product);
    }
  },

  created() {
    this.readData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.products {
  padding-top:10vh;
}
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>

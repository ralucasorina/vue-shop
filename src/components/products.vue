<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../assets/img/breakfast.png" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3  class="d-inline-block">Lis1ta preparate</h3>
            <select name="numbers" id="numbers" @change="getAll();">
              <option  value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <button @click="addNew" class="btn btn-primary float-right">Adauga preparat</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Titlu</th>
                      <th>Categorie</th>
                      <th>Modificari</th>
                    </tr>
                  </thead>
                   
                  <tbody>
                      <tr v-for="product in products" :key="product">
                        <td>
                          {{product.ziua}}
                        </td>
                        
                        <td>
                          {{product.categorie}}
                        </td>

                        <td>
                          {{product.titlu}}
                        </td>

                        <td>
                          {{product.ingrediente}}
                        </td>

                        <td>
                          {{product.calorii}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)">Modifica</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Sterge</button>
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
              <h5 class="modal-title" id="editLabel" v-if="modal == 'new'">Adauga preparat nou</h5>
              <h5 class="modal-title" id="editLabel" v-if="modal == 'edit'">Modifica preparat</h5>
              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    
                    <div class="form-group">
                      <input type="text" placeholder="Nume Preparat" v-model="product.titlu" class="form-control">
                    </div>

                    <div class="form-group">
                      <h4 class="display-6">Reteta</h4>
                      <vue-editor v-model="product.reteta"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Detalii Preparat</h4>
                    <hr>
                    <div class="form-group">
                      <h6>Ziua</h6>
                      <input type="text" placeholder="Ziua" v-model="product.ziua" class="form-control">
                    </div>
                    <div class="form-group">
                      <h6>Categorie</h6>
                      <input type="text" placeholder="gustare1/ gustare2/ mic-dejun/ pranz/ cina" v-model="product.categorie" class="form-control">
                    </div>

                    <div class="form-group">
                      <h6>Numar calorii</h6>
                      <input type="text" placeholder="Calorii" v-model="product.calorii" class="form-control">
                    </div>
                    
                    <div class="form-group">
                      <h6>Ingrediente</h6>
                      <input type="text" placeholder="Ingrediente" v-model="product.ingrediente" class="form-control">
                    </div>


                    <div class="form-group">
                      <label for="product_image">Imagine preparat</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1">
                          <div class="img-wrapp">
                              <img :src="product.img" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Inchide</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Adauga Produs</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Modifica Produs</button>
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db} from '../firebase';
export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },
  data(){
    return {
        products: [],
        product: {
          calorii:null,
          categorie:null,
          img:null,
          ingrediente:null,
          meniu:null,
          reteta:null,
          titlu:null,
          ziua:null
        },
        activeItem:null,
        modal: null,
        tag: null
    }
  },
  firestore(){
      return {
        // products: db.collection('meniu1')
      }
  },
  

  methods:{
    async getAll() {
    const all = [];
    let index = $("#numbers").val();
    
      await db.collection('products').doc(`meniu${index}`).collection('preparate').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        all.push(doc.data());
        //all[doc.id] = doc.data();
        });
      });
    
   console.log(all);

},
    deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },
    uploadImage(e){
      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          });
      }
    },
    reset(){
      this.product = {
          calorii:null,
          categorie:null,
          img:null,
          ingrediente:null,
          meniu:null,
          reteta:null,
          titlu:null,
          ziua:null
      }
    },
    addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
    updateProduct(doc){
      console.log(this.product.id);
        this.$firestore.products.doc(this.product.id).update(this.product);
        
          Toast.fire({
            icon: 'success',
            title: 'Preparatul a fost modificat!'
          })
           $('#product').modal('hide');
    },
    editProduct(product){
      this.modal = 'edit';
      this.product = product;
      $('#product').modal('show');
    },
    deleteProduct(doc){
      Swal.fire({
        title: 'Sunteti sigur?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Da, sterge preparatul!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete()
          
         Toast.fire({
            icon: 'success',
            title: 'Preparatul a fost sters!'
          })
        
        }
      })
        
    },
    readData(){
      
     
    },
    addProduct(){
      this.$firestore.products.add(this.product);
          Toast.fire({
            type: 'success',
            title: 'Preparatul a fost adaugat!'
          })
      $('#product').modal('hide');
    }
  
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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


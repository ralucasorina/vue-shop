<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-4">Meniuri</h1>
          <div class="row">

              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Meniu 1</h5>
                            <p class="card-text">
                                nr x calorii, vegan etc etc
                            </p>
                            <a href="#" class="btn btn-primary">Adauga in cos</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product2.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                              <h5 class="card-title">Meniu 2</h5>
                            <p class="card-text">
                                nr x calorii, vegetarian etc etc
                            </p>
                            <a href="#" class="btn btn-primary">Adauga in cos</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item">
                    <img src="/img/products/product3.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                              <h5 class="card-title">Meniu 3</h5>
                            <p class="card-text">
                                nr x calorii, vegan etc etc
                            </p>
                            <a href="#" class="btn btn-primary">Adauga in cos</a>
                        </div>
                    </div>
              </div>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: "products",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>
<template>
  <form class="form form-horizontal column" @submit.prevent="addProduct">
    <div class="form-group">
      <label for="Name">Name</label>
      <input
        type="text"
        class="form-control"
        id
        aria-describedby="emailHelp"
        v-model="nameProduct"
      />
    </div>
    <div class="form-group">
      <label for="ImageURL">Image URL</label>
      <input type="text" class="form-control" v-model="imageProduct" />
    </div>
    <div class="form-group">
      <label for="Stock">Stock</label>
      <input min="0" type="number" class="form-control" v-model="stockProduct" />
    </div>
    <div class="form-group">
      <label for="Price">Price</label>
      <input min="0" type="number" class="form-control" v-model="priceProduct" />
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
    <router-link v-bind:to="{ name: 'Dashboard' }">
      <button type="button" class="btn btn-warning">Cancel</button>
    </router-link>
  </form>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000';
export default {
  name: 'FormAdd',
  data() {
    return {
      nameProduct: '',
      imageProduct: '',
      priceProduct: '',
      stockProduct: '',
      dataProduct: {},
    };
  },
  methods: {
    addProduct() {
      axios({
        method: 'post',
        url: `${baseURL}/products`,
        data: {
          name: this.nameProduct,
          image_url: this.imageProduct,
          price: this.priceProduct,
          stock: this.stockProduct,
        },
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          // console.log(response.data);
          const dataProduct = {
            id: response.data.id,
            name: response.data.name,
            image_url: response.data.image_url,
            stock: response.data.stock,
            price: response.data.price,
          };
          this.nameProduct = '';
          this.imageProduct = '';
          this.priceProduct = '';
          this.stockProduct = '';
          this.$router.push('Dashboard');
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          console.log(error.response);
        });
    },
  },
};
</script>

<style>
input[type="text"] {
  width: 50%;
  margin-left: 25%;
}
input[type="number"] {
  width: 20%;
  margin-left: 40%;
}
</style>

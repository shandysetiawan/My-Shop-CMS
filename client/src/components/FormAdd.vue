<template>
  <div>
    <div class="msgBoxAdd">
      <div class="alert alert-primary" role="alert" v-if="msgAdd">{{this.msgAdd}}</div>
    </div>
    <br />
    <h3>Tambah Produk Baru</h3>
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
      <button type="submit" class="btn btn-success">Create</button>
      <router-link v-bind:to="{ name: 'Dashboard' }">
        <button type="button" class="btn btn-warning">Cancel</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const baseURL = "https://e-commerce-atma.herokuapp.com";
export default {
  name: "FormAdd",
  data() {
    return {
      nameProduct: "",
      imageProduct: "",
      priceProduct: "",
      stockProduct: "",
      dataProduct: {},
      msgAdd: ""
    };
  },
  methods: {
    addProduct() {
      axios({
        method: "post",
        url: `${baseURL}/products`,
        data: {
          name: this.nameProduct,
          image_url: this.imageProduct,
          price: this.priceProduct,
          stock: this.stockProduct
        },
        headers: { access_token: localStorage.token }
      })
        .then(response => {
          // console.log(response.data);
          this.dataProduct = {
            id: response.data.id,
            name: response.data.name,
            image_url: response.data.image_url,
            stock: response.data.stock,
            price: response.data.price
          };
          this.nameProduct = "";
          this.imageProduct = "";
          this.priceProduct = "";
          this.stockProduct = "";
          this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
          // console.log(error.response.data.message);
          if (error.response.data.message == "Internal Server Error!") {
            this.msgAdd =
              "Pastikan Name sudah terisi, stock dan price tidak boleh minus dan harus diisi angka";
          } else {
            this.msgAdd = error.response.data.message;
          }
          setTimeout(() => {
            this.msgAdd = "";
          }, 3000);
          // console.log(error.response);
        });
    }
  }
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

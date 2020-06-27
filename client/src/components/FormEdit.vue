<template>
  <div>
    <div class="msgBoxEdit">
      <div class="alert alert-primary" role="alert" v-if="msgEdit">{{this.msgEdit}}</div>
    </div>
    <form class="form form-horizontal column" @submit.prevent="editProduct">
      <h3>Update Product Detail</h3>
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
      <button type="submit" class="btn btn-success">Update</button>
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
  name: "FormEdit",
  data() {
    return {
      nameProduct: "",
      imageProduct: "",
      priceProduct: "",
      stockProduct: "",
      dataProduct: {},
      msgEdit: ""
    };
  },
  computed: {
    getProducts() {
      // console.log(this.$store.state.products);
      return this.$store.state.updateId;
    }
  },
  created() {
    this.findProduct();
  },
  methods: {
    findProduct() {
      const { id } = this.$route.params;
      axios({
        method: "get",
        url: `${baseURL}/products/${id}`,
        headers: { access_token: localStorage.token }
      })
        .then(response => {
          // console.log(response.data);
          this.nameProduct = response.data.name;
          this.imageProduct = response.data.image_url;
          this.priceProduct = response.data.price;
          this.stockProduct = response.data.stock;
        })
        .catch(error => {
          // console.log(error.response.data.message);
          console.log(error.response);
        });
    },
    editProduct() {
      const { id } = this.$route.params;
      axios({
        method: "put",
        url: `${baseURL}/products/${id}`,
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
          // console.log(error.response);
          if (error.response.data.message == "Internal Server Error!") {
            this.msgEdit =
              "Pastikan Name sudah terisi, stock dan price tidak boleh minus dan harus diisi angka";
          } else {
            this.msgEdit = error.response.data.message;
          }
          setTimeout(() => {
            this.msgEdit = "";
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

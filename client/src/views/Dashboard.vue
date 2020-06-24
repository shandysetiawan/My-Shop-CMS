<template>
  <div class="home">
    <Navbar></Navbar>
    <div style="overflow-x:auto;">
      <h3 style="text-align:left" class="mt-3 mb-3">List Produk</h3>
      <router-link v-bind:to="{ name: 'AddProduct' }">
        <button type="button" class="btn btn-warning btn-lg mt-3 mb-3">Tambah Produk</button>
      </router-link>
      <router-view></router-view>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Gambar</th>
            <th scope="col">Nama Produk</th>
            <th scope="col">Harga</th>
            <th scope="col">Stok</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <ContentDashboard
          v-for="(product, idx) in products"
          :key="idx"
          :product="product"
        ></ContentDashboard>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ContentDashboard from '@/components/ContentDashboard.vue';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export default {
  name: 'Dashboard',
  components: {
    ContentDashboard,
    Navbar,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    fetchProduct() {
      axios({
        method: 'get',
        url: `${baseURL}/products`,
        headers: { access_token: localStorage.token },
      })
        .then((response) => {
          // console.log(response.data.data);
          this.products = response.data;
        })
        .catch((error) => {
          // console.log(error)
          // console.log(error.response.data.message);
        });
    },
  },
  created() {
    if (localStorage.token) {
      this.fetchProduct();
    }
  },
};
</script>

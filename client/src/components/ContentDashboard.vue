<template>
  <tbody style="background-color:#eae7d9">
    <tr style="text-align:center">
      <th scope="row">{{ product.id }}</th>
      <td><img :src="product.image_url" :alt="product.name" style="width:100px;height:100px" /></td>
      <td>{{ product.name }}</td>
      <td>{{ product.stock }}</td>
      <td>{{ product.price }}</td>
      <td class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary mr-2">Edit Produk</button>
        <button type="button" class="btn btn-info">Delete Produk</button>
      </td>
    </tr>
  </tbody>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000';
export default {
  name: 'ContentDashboard',
  data() {
    return {
      products: [],
    };
  },
  props: ['product'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

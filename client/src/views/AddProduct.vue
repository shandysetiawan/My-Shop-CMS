<template>
  <div>
    <Navbar></Navbar>
    <FormAdd></FormAdd>
  </div>
</template>

<script>
import FormAdd from '@/components/FormAdd.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'AddProduct',
  components: { FormAdd, Navbar },
};
</script>

<style></style>

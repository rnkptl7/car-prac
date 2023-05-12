<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<script>
import "sweetalert2/src/sweetalert2.scss";

import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>

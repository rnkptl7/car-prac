<template>
  <div>
    <img src="/images/error_icon.png" alt="" />
    <p>{{ store.error }}</p>
  </div>
</template>

<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<style lang="scss"></style>

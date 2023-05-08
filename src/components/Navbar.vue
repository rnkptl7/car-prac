<template>
  <div class="navbar">
    <div class="navbar-logo">
      <img class="logo" src="/images/logo.png" alt="apnicar logo" />
      <p>apniCar</p>
    </div>
    <div class="navbar-right">
      <button class="btn" @click="isOpenModal(true)">Add Car</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["open-modal"],
  methods: {
    isOpenModal(val) {
      this.$emit("open-modal", val);
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  background: #334756;
  height: 80px;
  color: #fff;
  display: grid;
  place-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 270px;

  .navbar-logo {
    display: flex;
    align-items: center;
    .logo {
      width: 50px;
      border-radius: 30%;
    }

    p {
      font-size: 40px;
      font-weight: 900;
      font-style: italic;
      margin-left: 10px;
    }
  }
}

@media (max-width: 1098px) {
  .navbar {
    padding: 0 100px;
  }
}

@media (max-width: 559px) {
  .navbar {
    padding: 0 10px;

    .navbar-logo p {
      font-size: 35px;
    }
  }
}
</style>

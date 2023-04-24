<template>
  <div class="navbar">
    <div>
      <img class="logo" src="/images/logo.png" alt="apnicar logo" />
      <p>apniCar</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.navbar {
  background: #334756;
  height: 80px;
  color: #fff;
  display: grid;
  place-items: center;

  div {
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
</style>

<template>
  <div id="navigation-mobile">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#navigation-mobile {
  padding: 20px 0 0 0;

  ul {
    list-style: none;
    width: 200px;
    padding-left: 6rem;

    li {
      margin: 1rem 0;
      a {
        color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 20px;
        cursor: pointer;
        text-decoration: none;
      }

      &:hover {
        color: #111;
      }
    }
  }

  .search {
    position: relative;
    width: 240px;
    margin-bottom: 20px;
    padding-left: 20px;

    input {
      border: none;
      outline: none;
      width: 180px;
      padding: 10px 50px 10px 20px;
      margin: 0;
      border-radius: 20px;
      background-color: #efefef;
      font-family: "Segoe UI", Tahoma;
      font-size: 1rem;
    }

    i {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: 1.6rem;
      color: #aaa;
      cursor: pointer;
    }
  }

  .social-media {
    position: absolute;
    left: 40px;
    bottom: 20px;

    i {
      margin: 0 20px 0 0;
      color: #fff;
      font-size: 2rem;
    }
  }
}

@media (max-width: 520px) {
  #navigation-mobile {
    ul {
      padding-left: 1.3rem;
    }
  }
}
</style>

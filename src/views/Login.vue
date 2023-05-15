<template>
  <div class="container">
    <vee-form class="form" :validation-schema="schema" @submit="submitForm">
      <div class="heading">
        <h1 class="heading">Login</h1>
      </div>
      <div class="fields">
        <div class="inputDiv">
          <label>Email:</label>
          <vee-field
            type="email"
            v-model="form.email"
            placeholder="Enter Your Email"
            name="email"
          />
          <ErrorMessage name="email" class="error" />
        </div>
        <div class="inputDiv">
          <label>Password:</label
          ><vee-field
            type="password"
            v-model="form.password"
            placeholder="Enter Your Password"
            name="password"
          />
          <ErrorMessage name="password" class="error" />
        </div>
      </div>
      <div class="buttons block">
        <button type="submit" class="btn">Login</button>
      </div>
    </vee-form>
  </div>
</template>

<script>
import axios from "axios";
import { ErrorMessage } from "vee-validate";

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      schema: {
        email: "required|email",
        password:
          "required|passwordmin:8|passwordmax:12|regex:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$",
      },
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "https://testapi.io/api/dartya//login",
          this.form
        );

        if (response.status === 200) {
          this.$toast.success("Login successfully", {
            position: "top-right",
            duration: 3000,
          });
          this.$router.push("/");
        }
      } catch (error) {
        alert("Incorrect email or password!");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

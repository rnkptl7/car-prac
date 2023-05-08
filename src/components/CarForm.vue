<template>
  <transition>
    <div class="modal">
      <vee-form class="form" :validation-schema="schema" @submit="submitForm">
        <div class="heading">
          <slot name="heading"></slot>
        </div>
        <div class="fields">
          <slot name="fields"></slot>
        </div>
        <div class="buttons block">
          <slot name="buttons"></slot>
        </div>
        <slot></slot>
      </vee-form>
    </div>
  </transition>
</template>

<script>
import { ErrorMessage } from "vee-validate";

export default {
  emits: ["alert-form"],
  components: {
    ErrorMessage,
  },
  data() {
    return {
      schema: {
        name: "required|min:3|max:100",
        details: "required|min:30|max:120",
        url: "required|url",
        price: "required|min_value:50000",
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("alert-form");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  width: 100%;
  height: 100%;

  form {
    color: #fff;
    position: absolute;
    padding: 20px;
    background: #334756;
    border-radius: 10px;
    width: 450px;
    top: 40%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  @media (max-width: 1167px) {
    form {
      top: 23%;
    }
  }

  @media (max-width: 620px) {
    form {
      top: 9%;
    }
  }
  @media (max-width: 502px) {
    form {
      width: 80%;
    }
  }
}
</style>

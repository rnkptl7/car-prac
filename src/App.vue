<template>
  <Navbar @open-modal="isOpenModal"></Navbar>
  <GalleryCard
    @edit-item="editButton"
    @close-modal="closeModal"
    :openModal="openModal"
    :editModal="editModal"
  ></GalleryCard>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import "sweetalert2/src/sweetalert2.scss";

import Navbar from "./components/Navbar.vue";
import GalleryCard from "./components/GalleryCard.vue";

export default {
  components: {
    GalleryCard,
    Navbar,
    ErrorMessage,
  },
  data() {
    return {
      openModal: false,
      editModal: false,
    };
  },
  methods: {
    isOpenModal(val) {
      this.openModal = val;
      window.scrollTo(0, 0);
    },
    closeModal() {
      this.openModal = false;
      this.editModal = false;
    },
    editButton() {
      this.openModal = true;
      this.editModal = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>

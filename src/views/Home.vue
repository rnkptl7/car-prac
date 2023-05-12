<template>
  <div class="menubar">
    <button class="btn" @click="isOpenModal(true)">Add Car</button>
  </div>
  <GalleryCard
    @edit-item="editButton"
    @close-modal="closeModal"
    :openModal="openModal"
    :editModal="editModal"
  ></GalleryCard>
</template>

<script>
import GalleryCard from "@/components/GalleryCard.vue";

export default {
  components: {
    GalleryCard,
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

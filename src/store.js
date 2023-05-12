import { reactive } from "vue";

export const store = reactive({
  count: 0,
  showNav: false,
  loading: true,
  isError: false,
  error: "",
});

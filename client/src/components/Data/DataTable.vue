<template>
  <b-table
    :items="data"
    :fields="['title', 'text']"
    thead-class="hidden_header"
  ></b-table>
</template>

<script>
export default {
  name: "DataTable",
  computed: {
    data() {
      let data = this.$store.state.data.items;
      return data.reverse();
    },
    loggedIn() {
      return this.$store.state.user.isLoggedIn;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/base.scss";
</style>

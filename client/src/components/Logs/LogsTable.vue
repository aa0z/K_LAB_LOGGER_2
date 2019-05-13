<template>
  <b-table
    :items="logs"
    thead-class="hidden_header"
    :fields="['eventType', 'date']"
  ></b-table>
</template>

<script>
export default {
  name: "LogsTable",
  computed: {
    logs() {
      let logs = this.$store.state.logs.items.map(item => {
        item.date = new Date(item.date).toLocaleString();
        return item;
      });
      return logs.reverse();
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

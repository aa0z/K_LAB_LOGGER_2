<template>
  <b-alert class="mt-2" show v-if="show" v-bind:variant="variant">
    {{ message }}
  </b-alert>
</template>

<script>
export default {
  name: "Alert",
  computed: {
    show() {
      return this.$store.state.notifications.alert.show;
    },
    message() {
      return this.$store.state.notifications.alert.message;
    },
    variant() {
      return this.$store.state.notifications.alert.variant;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/base.scss";
</style>

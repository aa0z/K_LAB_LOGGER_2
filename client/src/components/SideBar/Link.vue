<template>
  <b-button block v-bind:variant="variant" @click="onRouteChange(path)">
    {{ title }}
  </b-button>
</template>

<script>
export default {
  name: "Link",
  props: {
    path: {
      type: String
    },
    title: {
      type: String
    },
    variant: {
      type: String,
      default: "link"
    }
  },
  methods: {
    onRouteChange(path) {
      this.$router.push(path);
    }
  }
};
</script>

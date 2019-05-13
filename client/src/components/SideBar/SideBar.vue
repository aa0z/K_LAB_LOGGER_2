<template>
  <div class="">
    <div v-for="link in items" v-bind:key="link.path">
      <Link v-bind="{ ...link }" />
    </div>
  </div>
</template>

<script>
import Link from "@/components/SideBar/Link.vue";

export default {
  name: "SideBar",
  components: {
    Link
  },
  props: {
    items: Array
  }
};
</script>

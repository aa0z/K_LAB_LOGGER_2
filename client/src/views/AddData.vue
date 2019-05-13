<template>
  <b-row>
    <b-col cols="12" sm="4">
      <SideBar v-bind:items="sidebar"></SideBar>
    </b-col>
    <b-col cols="12" sm="8">
      <Alert></Alert>
      <DataForm></DataForm>
    </b-col>
  </b-row>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import DataForm from "@/components/Data/DataForm.vue";
import Alert from "@/components/Notification/Alert.vue";

export default {
  name: "addData",
  components: {
    SideBar,
    DataForm,
    Alert
  },
  data() {
    return {
      sidebar: [
        { path: "/logs", title: "logs" },
        { path: "/data", title: "data" },
        { path: "/addData", title: "addData", variant: "disable" }
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.user.isLoggedIn;
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch("login");
    }
  },
  mounted: async function() {
    if (!this.loggedIn) {
      await this.login();
    }
  }
};
</script>

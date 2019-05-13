<template>
  <b-row>
    <b-col cols="12" sm="4">
      <SideBar v-bind:items="sidebar"></SideBar>
    </b-col>
    <b-col cols="12" sm="8">
      <Alert></Alert>
      <DataTable></DataTable>
    </b-col>
  </b-row>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import DataTable from "@/components/Data/DataTable.vue";
import Alert from "@/components/Notification/Alert.vue";

export default {
  name: "Data",
  components: {
    SideBar,
    DataTable,
    Alert
  },
  data() {
    return {
      sidebar: [
        { path: "/logs", title: "logs" },
        { path: "/data", title: "data", variant: "disable" },
        { path: "/addData", title: "addData" }
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
    },
    getData() {
      this.$store.dispatch("getData");
    }
  },
  mounted: async function() {
    if (!this.loggedIn) {
      await this.login();
    }
    if (this.loggedIn) {
      this.getData();
    }
  }
};
</script>

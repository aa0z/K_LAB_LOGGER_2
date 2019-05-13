<template>
  <b-row>
    <b-col cols="12" sm="4">
      <SideBar v-bind:items="sidebar"></SideBar>
    </b-col>
    <b-col cols="12" sm="8">
      <Alert></Alert>
      <LogsTable></LogsTable>
    </b-col>
  </b-row>
</template>

<script>
import SideBar from "@/components/SideBar/SideBar.vue";
import LogsTable from "@/components/Logs/LogsTable.vue";
import Alert from "@/components/Notification/Alert.vue";

export default {
  name: "Logs",
  components: {
    SideBar,
    LogsTable,
    Alert
  },
  data() {
    return {
      sidebar: [
        { path: "/logs", title: "logs", variant: "disable" },
        { path: "/data", title: "data" },
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
    getLogs() {
      this.$store.dispatch("getLogs");
    }
  },
  mounted: async function() {
    if (!this.loggedIn) {
      await this.login();
    }
    if (this.loggedIn) {
      this.getLogs();
    }
  }
};
</script>

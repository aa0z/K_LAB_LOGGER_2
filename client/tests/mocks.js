const user = {
  loggedIn: {
    isLoggedIn: true
  }
};
const logs = {
  withItems: {
    items: [
      {
        date: "2019-5-12 16:41:52",
        eventType: "EVENT"
      }
    ]
  },
  withInitialState: {
    items: []
  }
};
const data = {
  formInitialState: {
    data: {
      title: "",
      text: ""
    }
  },
  withItems: {
    items: [
      {
        title: "test",
        text: "message"
      }
    ]
  },
  withInitialState: {
    items: []
  }
};
const notifications = {
  withAlert: {
    alert: {
      show: true,
      message: "Test message",
      variant: "info"
    }
  },
  withInitialState: {
    alert: {
      show: false,
      message: "",
      variant: ""
    }
  }
};
const sideBar = [
  { path: "/logs", title: "logs", variant: "disable" },
  { path: "/data", title: "data" },
  { path: "/addData", title: "addData" }
];

module.exports = {
  user,
  sideBar,
  logs,
  data,
  notifications
};

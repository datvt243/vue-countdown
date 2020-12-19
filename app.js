var app = new Vue({
  el: "#app",
  data: {
    date: "2021-02-12"
  },
  computed: {
    showDate() {
      return new Date(this.date);
    }
  },
});
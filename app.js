var app = new Vue({
  el: "#app",
  data: {
    date: "2024-02-01"
  },
  computed: {
    showDate() {
      return new Date(this.date);
    }
  },
});
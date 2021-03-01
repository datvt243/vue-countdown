var app = new Vue({
  el: "#app",
  data: {
    date: "2022-02-01"
  },
  computed: {
    showDate() {
      return new Date(this.date);
    }
  },
});
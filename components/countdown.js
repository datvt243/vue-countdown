Vue.component("countdown", {
  data: function () {
    return {}
  },
  props: ["date"],
  // props: {
  //   year: { type: [String, Number], default: 2021 },
  //   month: { type: [String, Number], default: 1 },
  //   day: { type: [String, Number], default: 1 },
  //   hour: { type: [String, Number], default: 0 },
  //   minute: { type: [String, Number], default: 0 },
  //   second: { type: [String, Number], default: 0 },
  //   millisecond: { type: [String, Number], default: 0 }
  // },
  data() {
    return {
      displayDays: 0,
      displayHours: 0,
      displayMinus: 0,
      displaySeconds: 0,
      loaded: false,
      expired: false
    };
  },
  mounted() {
    this.setCountdown();
  },
  computed: {
    _seconds() {
      return 1000
    },
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
    _end() {
      return new Date(
        this.date
      ).getTime();
    }
  },
  methods: {
    formatNumber(number) {
      return number < 10 ? "0" + number : number;
    },
    setCountdown() {
      const timer = setInterval( () => {
        const dayEnd = this._end;
        const dayNow = new Date().getTime();
        const distance = dayEnd - dayNow;

        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          this.displayDays = this.formatNumber(0);
          this.displayHours = this.formatNumber(0);
          this.displayMinus = this.formatNumber(0);
          this.displaySeconds = this.formatNumber(0);
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);

        this.displayDays = this.formatNumber(days);
        this.displayHours = this.formatNumber(hours);
        this.displayMinus = this.formatNumber(minutes);
        this.displaySeconds = this.formatNumber(seconds);

        this.loaded = true

      }, 1000);
    }
  },
  watch: {
    date() {
      this.setCountdown();
      // this.$forceUpdate()
    }
  },
  template: `
    <div class="countdown-inner" v-if="loaded">
      <div class="clearfix">
        <p v-if="!expired">Thời gian còn</p>
        <p v-else>Time out</p>
      </div>
      <hr />
      <div class="d-flex justify-content-center countdown-time">
        <div class="col-auto">
          <p class="number">{{ displayDays }}</p>
          <p class="text">ngày</p>
        </div>
        <div class="col-auto">
          <p class="number">:</p>
        </div>
        <div class="col-auto">
          <p class="number">{{ displayHours }}</p>
          <p class="text">giờ</p>
        </div>
        <div class="col-auto">
          <p class="number">:</p>
        </div>
        <div class="col-auto">
          <p class="number">{{ displayMinus }}</p>
          <p class="text">phút</p>
        </div>
        <div class="col-auto">
          <p class="number">:</p>
        </div>
        <div class="col-auto">
          <p class="number">{{ displaySeconds }}</p>
          <p class="text">giây</p>
        </div>
      </div>
    </div>
  `
})
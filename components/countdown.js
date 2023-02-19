Vue.component("countdown", {
  data: function () {
    return {}
  },
  props: {
    date: {
      type: String,
      default: "2022-02-01"
    }
  },
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
      if(this.date) {
        return new Date(
          this.date
        ).getTime();
      } else {
        return new Date()
      }
    }
  },
  methods: {
    formatNumber(number) {
      return number < 10 ? "0" + number : number;
    },
    setCountdown() {
      let vm = this;
      vm.expired  = false;
      vm.loaded   = false;
      const timer = setInterval( () => {
        const dayEnd    = vm._end;
        const dayNow    = new Date().getTime();
        const distance  = dayEnd - dayNow;

        if (distance < 0) {
          clearInterval(timer);
          vm.expired          = true;
          vm.displayDays      = vm.formatNumber(0);
          vm.displayHours     = vm.formatNumber(0);
          vm.displayMinus     = vm.formatNumber(0);
          vm.displaySeconds   = vm.formatNumber(0);
          return;
        }

        const days          = Math.floor(distance / vm._days);
        const hours         = Math.floor((distance % vm._days) / vm._hours);
        const minutes       = Math.floor((distance % vm._hours) / vm._minutes);
        const seconds       = Math.floor((distance % vm._minutes) / vm._seconds);

        vm.displayDays      = vm.formatNumber(days);
        vm.displayHours     = vm.formatNumber(hours);
        vm.displayMinus     = vm.formatNumber(minutes);
        vm.displaySeconds   = vm.formatNumber(seconds);

        vm.loaded = true;

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
  <div class="clearfix">
    <transition name="dropdown" mode="out-in">
      <div class="countdown-inner" v-if="loaded">
        <div class="clearfix">
          <p v-if="!expired">Thời gian còn</p>
          <p class="text-danger" v-else>Time out</p>
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
    </transition>
  </div>
  `
})
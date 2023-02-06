<template>
  <div class="visits-page">
    <h1 class="page-title">Dashboard</h1>
    <b-row>
      <b-col xl="4" xs="12">
        <Widget
          title="<h6> USER TRAFFIC </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Overall</h6>
              <p class="value">1298</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Today</h6>
              <p class="value">12</p>
            </div>
            <div class="stat-item">
              <h6 class="name">24h</h6>
              <p class="value">3.38%</p>
            </div>
          </div>
          <b-progress variant="success" :value="60"
                      :max="100" class="progress-xs"/>
          <p>
            <small>
              <span class="circle bg-primary text-white mr-2">
                <i class="la la-angle-up"/>
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;17% higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col xl="4" xs="12">
        <Widget
          title="<h6> TRAFFIC VALUES </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name">Overall Values</h6>
              <p class="value">17 567 318</p>
            </div>
            <div class="stat-item">
              <h6 class="name">Montly</h6>
              <p class="value">55 120</p>
            </div>
            <div class="stat-item">
              <h6 class="name">24h</h6>
              <p class="value">9 695</p>
            </div>
          </div>
          <b-progress variant="danger"
                      :value="60" :max="100" class="progress-xs"/>
          <p>
            <small>
              <span class="circle bg-primary text-white mr-2">
                <i class="la la-angle-down"/>
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8% lower</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
      <b-col xl="4" xs="12">
        <Widget
          title="<h6> RANDOM VALUES </h6>"
          close settings customHeader
        >
          <div class="stats-row">
            <div class="stat-item">
              <h6 class="name fs-sm">Overcome T.</h6>
              <p class="value">104.85%</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">Takeoff Angle</h6>
              <p class="value">14.29&deg;</p>
            </div>
            <div class="stat-item">
              <h6 class="name fs-sm">World Pop.</h6>
              <p class="value">7,211M</p>
            </div>
          </div>
          <b-progress variant="primary" :value="60"
                      :max="100" class="progress-xs"/>
          <p>
            <small>
              <span class="circle bg-primary text-white mr-2">
                <i class="la la-plus"/>
              </span>
            </small>
            <span class="fw-semi-bold">&nbsp;8 734 higher</span>
            &nbsp;than last month
          </p>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="4" xs="12">
        <Widget
          title="<h6>Calendar</h6" bodyClass="p-0"
          settings close customHeader>
          <div class="list-group fs-mini">
            <a href="#" class="list-group-item text-ellipsis">
              <span class="badge badge-pill bg-primary float-right">6:45</span>
              Weed out the flower bed
            </a>
            <a href="#" class="list-group-item text-ellipsis">
              <span class="badge badge-pill badge-success float-right">9:41</span>
              Stop world water pollution
            </a>
            <a href="#" class="list-group-item text-ellipsis">
              <span class="badge badge-pill badge-success float-right">9:41</span>
              Stop world water pollution
            </a>
          </div>
        </Widget>
      </b-col>
      <b-col lg="8" xs="12">
        <Widget
          title="<h6>Project Info</h6" bodyClass="p-0"
          settings close customHeader>
          <div class="list-group fs-mini">
            <a href="#" class="list-group-item text-ellipsis">
              Name:
             <b> {{ project.name }}</b>
            </a>
            <a href="#" class="list-group-item text-ellipsis">
              URL:
              <b> {{ project.url }}</b>
            </a>
            <a class="list-group-item text-ellipsis">
              <b-input type="text" :value="project.token" disabled id="tokenInput"></b-input>
            </a>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import AreaChart from './components/AreaChart/AreaChart';
import AnimatedNumber from "animated-number-vue";

export default {
  name: 'Visits',
  components: {
    Widget, AreaChart, AnimatedNumber
  },
  computed: {
    ...mapGetters({
      project: 'auth/getProject',
    }),
  },
  data() {
    return {
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
    };
  },
  methods: {
    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, 'checkedArr', arr);
    },
    fillData() {
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#1870DC',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: '#F45722',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style src="./Dashboard.scss" lang="scss"/>

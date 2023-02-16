<template>
  <div class="appointments-wrapper">
    <b-row class="appointments-area">
      <b-col md="12" class="appointments-title text-center">
        <h4>{{ schedule.date | moment("dddd, MMMM Do YYYY")  }}</h4>
      </b-col>
      <b-col md="3" class="appointments-item"
             v-for="(appointment, key) in appointments"
             :key="key">
        <div class="appointments-item-inside">
          <p>
            {{ appointment.time }} -
            {{ $moment(appointment.time, 'HH.mm').add(appointment.duration, 'minutes') | moment("HH.mm") }}
          </p>
          <p> {{ appointment.duration }} min</p>
        </div>
      </b-col>

    </b-row>
  </div>
</template>

<script>
export default {
  name: "Appointments",
  props: {
    appointments: {type: Array},
    schedule: {type: Object},
  }
}
</script>

<style lang="scss" scoped>

.appointments-wrapper {
  background-color: #FFF;
  border-radius: 3px;
  padding: 0 20px;
  min-height: 100%;

  .appointments-area {
    padding: 20px;
    .appointments-title {
      h4 {
        color: #000;
      }
    }

    .appointments-item {
      padding: 3px;

      .appointments-item-inside {
        background-color: #333867;
        box-shadow: 0 23px 20px -20px rgba(darken(#333867, 25%), 0.1), 0 0 15px rgba(darken(#333867, 25%), 0.06);
        border-radius: 5px;
        padding: 10px;
        cursor: pointer;

        p {
          margin: 3px;
          font-weight: 600;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
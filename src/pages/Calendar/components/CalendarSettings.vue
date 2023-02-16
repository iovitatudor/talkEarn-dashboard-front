<template>
  <span>
    <b-button variant="default" class="mr-3" size="md" @click="modalShow = !modalShow">
      <b-icon icon="gear-wide-connected"></b-icon>
      Generate Schedule
    </b-button>
    <b-modal v-model="modalShow" title="Generate Schedule" hide-footer>
      <Widget customHeader>
        <form class="mt" @submit.prevent="generateTemplate">
          <label>Week days:</label>
          <b-row class="days-list">
        <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-l"
                 type="checkbox"
                 @change="getScheduleTemplate(0)"
                 v-model="form.weekDays[0]">
          <label for="styled-checkbox-l">S</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-m"
                 type="checkbox"
                 @change="getScheduleTemplate(1)"
                 v-model="form.weekDays[1]">
          <label for="styled-checkbox-m">M</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-m2"
                 type="checkbox"
                 @change="getScheduleTemplate(2)"
                 v-model="form.weekDays[2]">
          <label for="styled-checkbox-m2">T</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-j"
                 type="checkbox"
                 @change="getScheduleTemplate(3)"
                 v-model="form.weekDays[3]">
          <label for="styled-checkbox-j">W</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-v"
                 type="checkbox"
                 @change="getScheduleTemplate(4)"
                 v-model="form.weekDays[4]">
          <label for="styled-checkbox-v">T</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-s"
                 type="checkbox"
                 @change="getScheduleTemplate(5)"
                 v-model="form.weekDays[5]">
          <label for="styled-checkbox-s">F</label>
        </span>
            <span class="flex-center days-checkbox">
          <input class="styled-checkbox"
                 id="styled-checkbox-d"
                 type="checkbox"
                 @change="getScheduleTemplate(6)"
                 v-model="form.weekDays[6]">
          <label for="styled-checkbox-d">S</label>
        </span>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Consultation Duration (min):" label-for="consultationDuration">
                <b-input-group>
                  <input id="consultationDuration"
                         class="form-control input-transparent pl-3"
                         type="number"
                         v-model="form.duration"
                         required/>
                </b-input-group>
              </b-form-group>
              <b-form-group label="Break between consultations (min):" label-for="breakBetweenConsultations">
                <b-input-group>
                  <input id="breakBetweenConsultations"
                         class="form-control input-transparent pl-3"
                         type="number"
                         v-model="form.breakConsultation"
                         required/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="From:" label-for="from">
                <b-input-group>
                  <input id="from"
                         class="form-control input-transparent pl-3"
                         type="time"
                         min="06:00"
                         max="23:00"
                         v-model="form.from"
                         required/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="To:" label-for="to">
                <b-input-group>
                  <input id="to"
                         class="form-control input-transparent pl-3"
                         type="time"
                         min="06:00"
                         max="23:00"
                         v-model="form.to"
                         required/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <div class="flex-center days-checkbox">
                <input class="styled-checkbox"
                       id="styled-checkbox-auto-generate"
                       type="checkbox"
                       v-model="form.autoGenerate">
                <label for="styled-checkbox-auto-generate">Auto Generate</label> <br><br>
              </div>
            </b-col>
            <b-col md="12" class="text-center">
              <b-button type="submit" variant="success" size="md">
                <span class="auth-btn-circle">
                  <i class="la la-save"></i>
                </span>
                Generate
              </b-button>
            </b-col>
          </b-row>
        </form>
      </Widget>
    </b-modal>
  </span>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Widget from '../../../components/Widget/Widget';
import {SetApiError} from "../../../api/errors";
import {ScheduleApi} from "../../../api/ScheduleApi/schedule";

export default {
  name: "CalendarSettings",
  components: {Widget},
  data() {
    return {
      modalShow: false,
      form: {
        weekDays: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
        },
        duration: '',
        breakConsultation: '',
        from: '',
        to: '',
        autoGenerate: true,
      }
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    })
  },
  watch: {
    modalShow() {
      this.resetForm();
    }
  },
  methods: {
    ...mapActions({
      createSchedule: 'schedule/createSchedule',
      onSuccess: 'alert/onSuccess',
    }),
    async getScheduleTemplate(day) {
      if (this.form.weekDays[day]) {
        const result = await ScheduleApi.getScheduleTemplate(day, this.authExpert.id);
        const scheduleTemplate = result.data;
        if (Object.keys(scheduleTemplate).length !== 0) {
          this.form.duration = scheduleTemplate.consultationDuration;
          this.form.breakConsultation = scheduleTemplate.consultationBreak;
          this.form.from = scheduleTemplate.timeStart;
          this.form.to = scheduleTemplate.time_end;
          this.form.autoGenerate = scheduleTemplate.autoGenerate;
        }
      } else {
        // this.resetForm();
      }
    },
    async generateTemplate() {
      const handledWeekDays = Object.keys(this.form.weekDays).filter(x => {
        return this.form.weekDays[x] !== false;
      });

      const data = {};
      data['weekDays'] = handledWeekDays;
      data['duration'] = this.form.duration;
      data['breakConsultation'] = this.form.breakConsultation;
      data['from'] = this.form.from;
      data['to'] = this.form.to;
      data['expertId'] = this.authExpert.id;
      data['autoGenerate'] = this.form.autoGenerate;

      try {
        await this.createSchedule(data).then(result => {
          this.onSuccess('Schedule was successfully generated.');
          this.modalShow = false;
        });
      } catch (e) {
        SetApiError(e);
      }
    },
    resetForm() {
      this.form.weekDays = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
      };
      this.form.duration = '';
      this.form.breakConsultation = '';
      this.form.from = '';
      this.form.to = '';
      this.form.autoGenerate = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.days-list {
  justify-content: center;

  .days-checkbox {
    margin: 10px;
  }
}

</style>
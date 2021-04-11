<template>
  <v-container class="form">
    <v-form>
      <h3>Godziny pracy</h3>
      <div class="form-time-pickers">
        <div>
          <span>Od</span>
          <v-time-picker
            format="24hr"
            landscape
            scrollable
            v-model="timeFrom"
          />
        </div>
        <div>
          <span>Do</span>
          <v-time-picker
              format="24hr"
              landscape
              scrollable
              v-model="timeTo"
              :min="timeFrom"
          />
        </div>
      </div>

      <h3 style="margin-top: 2rem">Spotkania</h3>
      <span>Nowe spotkanie</span>
      <div class="new-meeting">
        <v-menu
          ref="menu"
          max-width="290px"
          min-width="290px"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="timeFrom"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                label="Od"
                v-bind="attrs"
                v-on="on"
                readonly
                prepend-icon="mdi-clock-time-four-outline"
                v-model="newMeeting.timeFrom"
            />
          </template>
          <v-time-picker
            full-width
            format="24hr"
            scrollable
            v-model="newMeeting.timeFrom"
          />
        </v-menu>

        <v-menu
            ref="menu"
            max-width="290px"
            min-width="290px"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="timeFrom"
            transition="scale-transition"
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                label="Od"
                v-bind="attrs"
                v-on="on"
                readonly
                prepend-icon="mdi-clock-time-four-outline"
                v-model="newMeeting.timeTo"
            />
          </template>
          <v-time-picker
              full-width
              format="24hr"
              scrollable
              v-model="newMeeting.timeTo"
              :min="newMeeting.timeFrom"
          />
        </v-menu>
        <v-btn
          plain
          @click="addMeeting"
        >Dodaj</v-btn>
      </div>

      <span>Lista spotkań</span>
      <v-simple-table style="margin-bottom: 1rem">
        <template>
          <thead>
            <tr>
              <th class="text-left">Od</th>
              <th class="text-left">Do</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(meeting, i) in meetings" :key="i">
              <td>{{ meeting.start }}</td>
              <td>{{ meeting.end }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-form>

    <v-btn
      @click="addCalendar"
    >Dodaj kalendarz</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewCalendar',
  data: () => ({
    tableHeaders: [
      {
        text: 'Od',
        sortable: false,
        value: 'from',
      },
      {
        text: 'Do',
        sortable: false,
        value: 'to',
      },
    ],
    meetings: [],
    newMeeting: {
      timeFrom: null,
      timeTo: null,
    },
    timeFrom: null,
    timeTo: null,
  }),
  methods: {
    addMeeting() {
      this.meetings.push({
        start: this.newMeeting.timeFrom,
        end: this.newMeeting.timeTo,
      });
      this.newMeeting.timeFrom = null;
      this.newMeeting.timeTo = null;
    },
    addCalendar() {
      const data = {
        workingHours: {
          start: this.timeFrom,
          end: this.timeTo,
        },
        meetings: this.meetings,
      };

      axios.post('http://localhost:8081/api/v1/calendars', data).then((reponse) => {
        if (reponse.status === 201) {
          this.$router.push('/calendars');
        }
      });
    },
  },
};
</script>

<style scoped>
  .form {

  }

  .form-time-pickers {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .new-meeting {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }
</style>

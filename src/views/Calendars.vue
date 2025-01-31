<template>
  <v-container class="main">
    <div class="calendars-list">
      <h2>Lista kalendarzy</h2>
      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
          <tr>
            <td class="text-left">
              Id
            </td>
            <th class="text-left">
              Początek
            </th>
            <th class="text-left">
              Koniec
            </th>
            <th class="text-left">
              Zaplanowane spotkania
            </th>
            <th>
              Dodaj do planera
            </th>
            <th>
              Usuń kalendarz
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="calendar in calendars"
              :key="calendar.id"
          >
            <td>{{ calendar.id }}</td>
            <td>
              {{
                getTimeString(calendar.workingHours.start.hour, calendar.workingHours.start.minutes)
              }}
            </td>
            <td>
              {{ getTimeString(calendar.workingHours.end.hour, calendar.workingHours.end.minutes) }}
            </td>
            <td>
              <ul>
                <li :key="i" v-for="(meeting, i) in calendar.plannedMeetings">
                  Od: {{ getTimeString(meeting.start.hour, meeting.start.minutes) }}
                  Do: {{ getTimeString(meeting.end.hour, meeting.end.minutes) }}
                </li>
              </ul>
            </td>
            <td>
              <v-checkbox v-model="selectedCalendars" :value="calendar" @change="updateFreeTime">
              </v-checkbox>
            </td>
            <td>
              <v-btn text @click="deleteCalendar(calendar.id)">Usuń</v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div>
        <v-text-field
          type="number"
          label="Oczekiwany czas spotkania"
          suffix="min"
          style="width: 300px"
          v-model="meetingTime"
          :rules="[() => meetingTime > 0]"
          @change="updateFreeTime"
        ></v-text-field>
        <h3>Wolne okna czasowe:</h3>
        <li :key="i" v-for="(item,i) in freeMeetingTime">
          Od: {{ getTimeString(item.startTime.hour, item.startTime.minutes) }}
          Do: {{ getTimeString(item.endTime.hour, item.endTime.minutes) }}
        </li>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Calendars',
  data: () => ({
    selectedCalendars: [],
    calendars: [],
    meetings: [],
    freeMeetingTime: [],
    meetingTime: 30,
  }),
  methods: {
    updateFreeTime() {
      if (this.meetingTime <= 0) {
        this.freeMeetingTime = [];
        return;
      }
      const body = {
        calendarIds: [],
        meetingTime: this.meetingTime,
      };

      this.selectedCalendars.forEach((cal) => body.calendarIds.push(cal.id));
      axios.post('/api/v1/calendars/common', body).then((response) => {
        this.freeMeetingTime = response.data;
      });
    },
    getTimeString(hour, minutes) {
      return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },
    deleteCalendar(id) {
      axios.delete(`api/v1/calendars/${id}`).then(() => this.$router.go());
    },
  },
  beforeCreate() {
    axios.get('/api/v1/calendars')
      .then((response) => {
        response.data.forEach((calendar) => {
          this.calendars.push(calendar);
        });
      });
  },
};
</script>

<style scoped>
  .main {
    display: flex;
  }

  .calendars-list {
    flex: 1;
  }

  @media screen and (max-width: 1290px) {
    .main {
      flex-direction: column;
    }
  }
</style>

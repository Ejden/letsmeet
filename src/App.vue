<template>
  <v-app >
    <v-app-bar
      app
      color="primary"
    >
      <v-container class="app-bar">
        <v-btn to="/" text style="margin-right: 1rem">Kalendarze</v-btn>
        <v-btn to="/new-calendar" text>Dodaj kalendarz</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  .app-bar {
    display: flex;
    justify-content: space-between;
  }
</style>

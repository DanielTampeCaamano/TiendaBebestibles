<template>
  <b-container fluid class="mt-3 px-5">
    <h1>Hola {{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
    <b-row class="mt-4 justify-content-center">
      <b-col lg="7" md="7">
        <profile-edit-card />
      </b-col>
      <b-col lg="5" md="5">
        <profile-avatar />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ currentUser: (state) => state.user }),
  },
};
</script>
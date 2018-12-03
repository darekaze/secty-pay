<template>
<v-toolbar app>
  <v-toolbar-title class="headline">
    <router-link class="custom-link" to="/">Secty</router-link>
    <span class="font-weight-light">Pay</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>

  <v-toolbar-items>
    <v-btn
      v-if="isUserLoggedIn"
      @click="logout"
      color="teal lighten-1"
      flat>
      Log Out
    </v-btn>
    <auth-pop-up v-else/>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'VHeader',
  components: {
    AuthPopUp: () => import('@/components/AuthWindow/AuthDialog.vue'),
  },
  computed: {
    ...mapState({
      isUserLoggedIn: state => state.auth.isUserLoggedIn,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-link {
  text-decoration: none;
  color: #26A69A;
  :hover {
    cursor: pointer;
  }
}
</style>

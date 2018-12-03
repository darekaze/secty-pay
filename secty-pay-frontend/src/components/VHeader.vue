<template>
<v-toolbar app>
  <v-toolbar-title class="headline">
    <router-link class="custom-link" to="/">Secty</router-link>
    <span class="font-weight-light">Pay</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>

  <v-toolbar-items>
    <v-btn
      v-if="isAuthenticated"
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
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/types/actions';

export default {
  name: 'VHeader',
  components: {
    AuthPopUp: () => import('@/components/AuthWindow/AuthDialog.vue'),
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT)
        .then(() => {
          this.$router.push('/');
        });
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

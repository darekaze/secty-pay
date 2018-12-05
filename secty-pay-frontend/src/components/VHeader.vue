<template>
<v-toolbar app>
  <v-toolbar-title class="headline">
    <router-link class="custom-link" to="/">Secty</router-link>
    <span class="font-weight-light">Pay</span>
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items v-if="isAuthenticated">
    <div class="d-flex align-center">
      <v-tooltip bottom allow-overflow>
        <v-btn
          slot="activator"
          to="/"
          color="teal lighten-1"
          flat icon dark>
          <v-icon>store</v-icon>
        </v-btn>
        <span>Home</span>
      </v-tooltip>
      <v-tooltip bottom allow-overflow>
        <v-btn
          slot="activator"
          to="/history"
          color="teal lighten-1"
          flat icon dark>
          <v-icon>history</v-icon>
        </v-btn>
        <span>Purchase History</span>
      </v-tooltip>
      <v-btn
        @click="logout"
        color="teal lighten-1"
        round flat dark>
        <span class="my-2">Log Out</span>
      </v-btn>
    </div>
  </v-toolbar-items>
  <v-toolbar-items v-else>
    <auth-dialog/>
  </v-toolbar-items>
</v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/types/actions';

export default {
  name: 'VHeader',
  components: {
    AuthDialog: () => import('@/components/AuthWindow/AuthDialog.vue'),
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

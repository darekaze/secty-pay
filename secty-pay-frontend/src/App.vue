<template>
<v-app>
  <VHeader/>
  <v-content>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </v-content>
</v-app>
</template>

<script>
// import axios from 'axios';
import VHeader from '@/components/VHeader.vue';
// import { AUTH_LOGOUT } from '@/store/actions/auth';

export default {
  name: 'App',
  components: {
    VHeader,
  },
  // created() {
  //   axios.interceptors.response.use(undefined, (err) => {
  //     return new Promise((resolve, reject) => {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch(AUTH_LOGOUT)
  //         this.$router.push('/');
  //       }
  //       throw err;
  //     });
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

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
import axios from 'axios';
import { LOGOUT } from '@/store/types/actions';
import VHeader from '@/components/VHeader.vue';

export default {
  name: 'App',
  components: {
    VHeader,
  },
  created() {
    axios.interceptors.response.use(undefined, (error) => {
      // Handle expired user token
      if (error.response.status === 401) {
        this.$store.dispatch(LOGOUT);
        this.$router.push('/');
      }
      return error;
    });
  },
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

<template>
<v-layout align-center>
  <v-dialog v-model="dialog" max-width="460px">
    <v-btn
      slot="activator"
      color="teal lighten-1"
      round flat dark>
      <span class="my-2">Login / Sign up</span>
    </v-btn>
    <v-tabs
      color="light-blue darken-3"
      slider-color="yellow"
      dark right>
      <v-tab ripple>
        Login
      </v-tab>
      <v-tab ripple>
        Sign Up
      </v-tab>
      <v-tab-item lazy>
        <login-form @done="dialog = false"/>
      </v-tab-item>
      <v-tab-item lazy>
        <sign-up-form @done="dialog = false"/>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</v-layout>
</template>

<script>
export default {
  name: 'AuthDialog',
  components: {
    LoginForm: () => import('./LoginForm.vue'),
    SignUpForm: () => import('./SignUpForm.vue'),
  },
  data: () => ({
    dialog: false,
  }),
};
</script>

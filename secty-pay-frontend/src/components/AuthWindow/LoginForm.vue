<template>
<v-card>
  <v-img
    height="120px"
    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
    <v-container fill-height fluid>
      <v-layout>
        <v-flex xs12 align-end d-flex>
          <span class="headline white--text">Sign in</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>

  <v-card-text>
    <div class="error" v-html="error" />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="username"
        prepend-icon="person"
        type="text"
        label="Username"
        :rules="nameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        prepend-icon="lock"
        type="password"
        label="Password"
        :rules="passwordRules"
        required
      ></v-text-field>
      <vue-recaptcha
        ref="recaptcha"
        @verify="onVerify"
        :sitekey="sitekey">
      </vue-recaptcha>
    </v-form>
  </v-card-text>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      color="primary"
      :disabled="!valid"
      @click="login">
      Login
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import AuthService from '@/api/app/Auth';

export default {
  data() {
    return {
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
      error: null,
      valid: false,
      recaptchaResponse: null,
      sitekey: '6Lf4G2gUAAAAANVI2ndLFcJUrzGm7qXUGndJbT4r',
    };
  },
  components: {
    VueRecaptcha: () => import('vue-recaptcha'),
  },
  mounted() {
    this.valid = false;
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password,
        }, this.recaptchaResponse);
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$emit('done');
        this.$refs.form.reset();
      } catch (error) {
        this.error = error.response.data.error;
      } finally {
        this.recaptchaResponse = null;
        this.$refs.recaptcha.reset();
      }
    },
    onVerify(response) {
      this.recaptchaResponse = response;
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-size: 1.1em;
  padding-left: 15px;
  text-decoration: none;
}
.error {
  color: white;
  border-radius: 4px;
  padding-left: 4px;
}
</style>

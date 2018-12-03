<template>
<v-card>
  <v-img
    height="120px"
    src="https://cdn.vuetifyjs.com/images/cards/plane.jpg">
    <v-container fill-height fluid>
      <v-layout>
        <v-flex xs12 align-end d-flex>
          <span class="headline white--text">Sign up</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>

  <v-card-text>
    <div class="error" v-html="error" />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="fullname"
        prepend-icon="title"
        type="text"
        label="Full Name"
        :rules="nameRules"
        required
      ></v-text-field>
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
    @click="register">
      Register
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapState } from 'vuex';
import { REGISTER } from '@/store/types/actions';

export default {
  name: 'SignupForm',
  components: {
    VueRecaptcha: () => import('vue-recaptcha'),
  },
  data() {
    return {
      fullname: '',
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
      valid: false,
      recaptchaResponse: null,
      sitekey: '6Lf4G2gUAAAAANVI2ndLFcJUrzGm7qXUGndJbT4r',
    };
  },
  mounted() {
    this.valid = false;
  },
  computed: {
    ...mapState({
      error: state => state.auth.error,
    }),
  },
  methods: {
    register() {
      const payload = {
        credential: {
          fullname: this.fullname,
          username: this.username,
          password: this.password,
        },
        recaptcha: this.recaptchaResponse,
      };

      this.recaptchaResponse = null;
      this.$refs.recaptcha.reset();

      this.$store.dispatch(REGISTER, payload)
        .then(() => {
          this.$refs.form.reset();
          this.$emit('done');
        });
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

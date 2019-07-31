<template>
  <div class="login-registration-background">
    <b-container fluid>
      <b-row align-h="center" class="mt-5">
        <b-card class="p-2">
          <h4>
            Please Enter Your Information
            <hr class="line">
          </h4>

          <b-form @submit.prevent="onSubmit()">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="form.username"
                v-validate="'required'"
                name="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.has('username') }"
              />

              <span v-if="errors.has('username')" class="invalid-feedback">
                {{ errors.first('username') }}
              </span>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="password"
            >
              <b-form-input
                id="password"
                ref="password"
                v-model="form.password"
                v-validate="'required'"
                name="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': errors.has('password') }"
              />

              <span v-if=" errors.has('password')" class="invalid-feedback">
                {{ errors.first('password') }}
              </span>
            </b-form-group>

            <div class="text-center button-padding">
              <b-btn
                class="btn btn-1"
                block
                @click="onSubmit()"
              >Log In
              </b-btn>
            </div>

            <p class="mt-3 text-center">
              Haven't got a
              <b-text class="link-redirect">PentaBee</b-text>
              account?
              <b-link class="link-redirect" to="/registration">Sign Up</b-link>
            </p>
          </b-form>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import LoginService from '@/services/authApi';
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data: () => ({
      form: {
        username: '',
        password: '',
      },
    }),
    methods: {
      ...mapActions('account', ['login', 'logout', 'setUser']),
      ...mapMutations('account', []),
      onSubmit() {
        this.$validator.validate();
        LoginService.login(this.form)
          .then(response => {
            const { token } = response.data;
            window.localStorage.setItem('token', token);
            this.login(token);
            this.$toast.open({
              message: 'You\'ve successfully logged in',
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
            this.$router.push('/');
          })
          .catch(() => {
            this.$toast.open({
              message: 'Invalid username or password',
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
          });
      },
    },
  };
</script>

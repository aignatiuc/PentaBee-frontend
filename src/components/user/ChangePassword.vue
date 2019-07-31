<template>
  <div>
    <b-form class="row" @submit.prevent="change()">
      <b-form-group
        id="input-group-1"
        class="col-md-4"
        label="Old Password:"
        label-for="old_password"
      >
        <b-form-input
          id="old_password"
          v-model="form.old_password"
          v-validate.continues="'required|verify_password'"
          name="old_password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.has('old_password') }"
        />

        <span v-if="errors.has('old_password')" class="invalid-feedback">
          {{ errors.first('old_password') }}
        </span>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        class="col-md-4"
        label="New Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          ref="password"
          v-model="form.password"
          v-validate.continues="'required|verify_password'"
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.has('password') }"
        />
        <span v-if="errors.has('password')" class="invalid-feedback">
          {{ errors.first('password') }}
        </span>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        class="col-md-4"
        label="Repeat New Password:"
        label-for="confirmPassword"
      >
        <b-form-input
          id="confirmPassword"
          v-model="form.confirm_password"
          v-validate="'required|confirmed:password'"
          name="confirm_password"
          type="password"
          class="form-control"
          data-vv-as="password"
          :class="{'is-invalid': errors.has('confirm_password')}"
        />

        <span v-if="errors.has('confirm_password')" class="invalid-feedback">
          {{ errors.first('confirm_password') }}
        </span>
      </b-form-group>
    </b-form>

    <div class="text-center space card-body gradient-buttons">
      <b-btn
        class="float-none d-inline-block btn btn-1"
        @click="change()"
      > Save changes
      </b-btn>
    </div>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    data: () => ({
      form: {
        old_password: '',
        password: '',
        confirm_password: '',
      },
    }),
    computed: {
      ...mapState('account', ['user']),
      ...mapGetters('account', ['userId']),
    },
    methods: {
      ...mapActions('account', ['login', 'logout']),
      change() {
        this.$validator.validate();
        const data = {
          ...this.form,
          id: this.userId,
        };

        UserApi.changePassword(data)
          .then(() => {
            this.$toast.open({
              message: 'Your password has been successfully changed',
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
            this.$router.push('/login');
            window.localStorage.removeItem('token');
          })
          .catch(() => {
            this.$toast.open({
              message: 'Please complete all required fields',
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

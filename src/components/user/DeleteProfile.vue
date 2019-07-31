<template>
  <div>
    <div class="text-center space">
      <b-btn
        class="float-none d-inline-block btn btn-1"
        @click="show()"
      > Delete Account
      </b-btn>
    </div>

    <modal
      name="delete-account"
      transition="nice-modal-fade"
      :min-width="10"
      :min-height="10"
      :delay="100"
      :adaptive="true"
    >
      <button class="float-right mr-2 mt-2" @click="$modal.hide('delete-account')">
        <i class="fas fa-times"/>
      </button>

      <div class="example-modal-content text-center mt-5 ml-2">
        ARE YOU SURE YOU WANT TO PERMANENTLY DELETE YOUR ACCOUNT?
        <p class="mt-4 ml-4">
          This account will no longer be available and all data in the account <br>
          will be permanently deleted.</p>
      </div>

      <div class="row mt-5">
        <b-button class="col-5 ml-5" variant="dark" @click="cancel">No</b-button>
        <b-button class="col-5 mx-auto btn btn-1" @click="onclick()">Yes</b-button>
      </div>
    </modal>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapState('account', ['user']),
      ...mapGetters('account', ['userId']),
    },
    methods: {
      ...mapActions('account', ['login', 'logout']),

      show() {
        this.$modal.show('delete-account');

      },
      cancel() {
        this.$modal.hide('delete-account');
        this.edit = false;
        return this.edit;
      },
      onclick() {
        const data = {
          ...this.form,
          id: this.userId,
        };
        UserApi.delete(data)
          .then(() => {
            this.$toast.open({
              message: 'Your account has been successfully deleted!',
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
            window.localStorage.removeItem('token');
            this.$router.push('/login');
          })
          .catch(error => {
            return console.log(error);
          });
      },
    },
  };
</script>

<template>
  <div class="col home-content">
    <b-alert show class="text-center" variant="warning" dismissible fade>
      <b>Well done!</b> Welcome <b>{{ form.username }}</b>
    </b-alert>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';
  import { mapGetters } from 'vuex';

  export default {
    data: () => ({
      form: {},
    }),
    computed: {
      ...mapGetters('account', ['userId']),
    },
    mounted() {
      UserApi.userInfo(this.userId).then((response) => {
        this.form = response.data;
      });
    },
  };
</script>

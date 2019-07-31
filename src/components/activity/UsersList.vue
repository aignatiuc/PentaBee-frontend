<template>
  <div>
    <b-form>
      <b-form-group class="col-md-12" label="Users:" label-for="users">
        <multiselect
          v-model="form.results.id"
          placeholder="Search an user"
          label="name"
          track-by="id"
          :options="form.results"
          :multiple="true"
          :taggable="true"
        />
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';

  export default {
    data: () => ({
      form: {},
    }),
    mounted() {
      UserApi.userList(this.form)
        .then((response) => {
          this.form = response.data;
        });
    },
  };
</script>
<!--setApplicants() {-->
<!--ActivityService.inviteUser(this.$route.params.activityId);-->
<!--},-->

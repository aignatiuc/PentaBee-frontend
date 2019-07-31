<template>
  <div>
    <b-form class="row" @submit.prevent="edit()">
      <b-form-group
        class="col-md-6"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="form.username"
          name="username"
          type="text"
          class="form-control"
          disabled
        />
      </b-form-group>

      <b-form-group
        class="col-md-6"
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="form.email"
          name="email"
          type="email"
          class="form-control"
          disabled
        />
      </b-form-group>

      <b-form-group
        id="input-group-3"
        class="col-md-6"
        label="First Name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="form.name"
          v-validate.continues="'required|min:3|max:20'"
          name="name"
          type="text"
          class="form-control text-capitalize"
          :class="{ 'is-invalid': errors.has('name') }"
        />

        <span v-if="errors.has('name')" class="invalid-feedback">
          {{ errors.first('name') }}
        </span>
      </b-form-group>

      <b-form-group
        class="col-md-6"
        label="Last Name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="form.surname"
          v-validate.continues="'required|min:3|max:20'"
          name="surname"
          type="text"
          class="form-control text-capitalize"
          :class="{ 'is-invalid': errors.has('surname') }"
        />

        <span v-if="errors.has('surname')" class="invalid-feedback">
          {{ errors.first('surname') }}
        </span>
      </b-form-group>

      <b-form-group
        class="col-md-4"
        label="Position:"
        label-for="position"
      >
        <b-form-input
          id="position"
          v-model="form.position"
          name="position"
          type="text"
          class="form-control"
        />
      </b-form-group>

      <b-form-group
        class="col-md-4"
        label="Seniority:"
        label-for="seniority"
      >
        <b-form-select v-model="form.seniority" :options="options">
          <template slot="first">
            <option :value="null" disabled>-- Please select your seniority --</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        class="col-md-4"
        label="Location:"
        label-for="location"
      >
        <b-form-select v-model="form.location" :options="option">
          <template slot="first">
            <option :value="null" disabled>-- Please select your location --</option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group
        class="col-md-12"
        label="Skills:"
        label-for="technologies"
      >
        <multiselect
          v-model="form.technologies"
          placeholder="Search a technology"
          label="name" track-by="id"
          :options="formTechnologies"
          :multiple="true"
          :taggable="true"
        />
      </b-form-group>

      <b-form-group
        class="col-md-12"
        label="About me:"
        label-for="biography"
      >
        <b-form-textarea
          id="textarea-state"
          v-model="form.biography"
          placeholder="Enter at least 10 characters"
          rows="3"
        />
      </b-form-group>
    </b-form>

    <div class="text-center space">
      <b-btn
        class="float-none d-inline-block btn btn-1"
        @click="edit()"
      >Save changes
      </b-btn>
      <!--      <b-btn-->
      <!--        class="col-md-5 float-none d-inline-block btn btn-1"-->
      <!--        block-->
      <!--        @click="edit()"-->
      <!--      > Save Changes-->
      <!--      </b-btn>-->
    </div>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';
  import { mapActions, mapState, mapGetters } from 'vuex';

  export default {
    data: () => ({
      form: {
        id: null,
        username: '',
        email: '',
        position: '',
        seniority: null,
        name: '',
        surname: '',
        biography: '',
        location: '',
        technologies: [
          {
            id: null,
          },
        ],
      },
      loginError: '',
      formTechnologies: [],
      options: [
        { value: '0', text: 'JUNIOR' },
        { value: '1', text: 'MIDDLE' },
        { value: '2', text: 'SENIOR' },
      ],
      option: [
        { value: 'CHI', text: 'CHI' },
        { value: 'NYC', text: 'NYC' },
        { value: 'BOS', text: 'BOS' },
        { value: 'FRA', text: 'FRA' },
        { value: 'PAR', text: 'PAR' },
        { value: 'ORL', text: 'ORL' },
        { value: 'BUC', text: 'BUC' },
        { value: 'BRA', text: 'BRA' },
        { value: 'CLU', text: 'CLU' },
        { value: 'IAS', text: 'IAS' },
        { value: 'HAN', text: 'HAN' },
        { value: 'GUA', text: 'GUA' },
        { value: 'LYO', text: 'LYO' },
      ],
    }),
    computed: {
      ...mapState('account', ['user']),
      ...mapGetters('account', ['userId']),
    },
    mounted() {
      UserApi.userInfo(this.userId).then((response) => {
        this.form = response.data;
      }).catch(error => {
        console.log(error);
      });
      UserApi.getTechnologies(this.userId).then((response) => {
        this.formTechnologies = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      ...mapActions('account', ['login', 'logout']),
      edit() {
        const data = {
          ...this.form,
          id: this.userId,
        };
        UserApi.editUser(data)
          .then(() => {
            this.$toast.open({
              message: 'You\'ve successfully updated your profile!',
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
            this.$router.push({name: 'profile'});
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

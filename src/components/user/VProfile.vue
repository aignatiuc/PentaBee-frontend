<template>
  <div class="edit profileCard home-content row">
    <div class="col-lg-6 col-md-6 col-xs-12">
      <h2 class="text-center pl-4 my-4 mb-5">Profile</h2>
      <section id="card-outline" class="ml-4 mr-2 mb-1 text-center">
        <b-card border-variant="warning">
          <div class="text-right">
            <b-link @click="$router.push({ name: 'edit', params: { userId: form.id } })">
              <i v-b-tooltip.hover title="Edit profile" class="icon-size fas fa-edit"/>
            </b-link>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-center h-100">
              <div class="image-out-container">
                <div class="greenIcon"/>

                <div class="image-in-container">
                  <b-img :src="require('../../../public/img/person1.png')"/>
                </div>
              </div>
            </div>

            <h3 class="mt-1">{{ form.name }} {{ form.surname }}</h3>
            <h6 class="seniorityText mt-2" style="text-transform:uppercase">{{ form.position }} {{ seniorityList[form.seniority] }}</h6>
            <hr class="line">
            <p>{{ form.biography }}</p>
            <h5 class="text-center">Skills:</h5>
            <div class="text-left row">
              <b-list-group v-for="item in form.technologies" :key="item.id" horizontal class="text-left">
                <div class="box text-left">{{ item.name }}</div>
              </b-list-group>
            </div>
            <div class="text-center my-3 row">
              <div class="mb-2">
                <i class="ml-4 fas fa-envelope"/>
                <b-link class="ml-2">{{ form.email }}</b-link>
              </div>
              <div class="mb-2">
                <i class="ml-4 fas fa-map-marker-alt"/>
                <b-link class="ml-2">{{ form.location }}</b-link>
              </div>
            </div>
          </div>
        </b-card>
      </section>
    </div>
    <activities/>
  </div>
</template>

<script>
  import UserApi from '@/services/userDetailsApi';
  import { mapState, mapGetters } from 'vuex';
  import Activities from './UserActivities';

  export default {
    components: { Activities },
    data: () => ({
      form: {
        id: null,
        email: '',
        position: '',
        seniority: '',
        name: '',
        surname: '',
        biography: '',
        location: '',
        technologies: [
          {
            id: null,
            name: '',
          },
        ],
      },
    }),
    computed: {
      seniorityList: () => ['JUNIOR', 'MIDDLE', 'SENIOR'],
      ...mapState('account', ['user']),
      ...mapGetters('account', ['userId']),
    },
    mounted() {
      UserApi.userInfo(this.userId).then((response) => {
        this.form = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
  };
</script>

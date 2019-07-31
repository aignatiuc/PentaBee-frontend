<!--          <div class="text-center">-->
<!--            <b-btn-->
<!--              v-if="userId !== activity.owner.id"-->
<!--              variant="warning"-->
<!--              class="btn btn-1 col-3"-->
<!--              pill-->
<!--              @click="apply(activity.id)"-->
<!--            >-->
<!--              Apply-->
<!--            </b-btn>-->
<!--            <b-btn-->
<!--              variant="warning"-->
<!--              class="btn btn-1 col-3"-->
<!--              pill-->
<!--              to="/invite"-->
<!--            >-->
<!--              Invite-->
<!--            </b-btn>-->

<!--            <b-btn-->
<!--              variant="warning"-->
<!--              class="btn btn-1 col-3"-->
<!--              pill-->
<!--            >-->
<!--              Edit-->
<!--            </b-btn>-->

<!--            <b-btn-->
<!--              v-if="userId === activity.owner.id"-->
<!--              variant="warning"-->
<!--              class="btn btn-1 col-3 btn-delete"-->
<!--              pill-->
<!--              @click="deleteActivity"-->
<!--            >-->
<!--              Delete activity-->
<!--            </b-btn>-->
<!--          </div>-->
<!--        </b-card>-->
<!--      </section>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="activity-list">
    <div class="pt-2 mb-5 pb-5">
      <section class="SectionStyle">
        <b-container>
          <b-card class="mx-auto border-warning">
            <div class="row">
              <div class="col-md-3">
                <img src="../../assets/images/combs.jpg" class="round-image" alt="avatar"></div>
              <div class="col-md-9">
                <div class="row">
                  <b-card-title class="col-md-8 mx-auto row">
                    {{ activity.name }}
                  </b-card-title>
                  <b-card-text class="col-md-4 text-right text-capitalize">
                    <img v-b-tooltip.hover :title="activity.owner.name + ' ' + activity.owner.surname"
                         src="../../assets/images/user-image.png" class="user-image" alt="avatar"
                    >
                  </b-card-text>
                </div>

                <hr class="line">

                <div>
                  <h5 class="font-weight-bold">Description: </h5>
                  <p class="ml-1 description-styles">{{ activity.description }}</p>
                </div>

                <div class="row">
                  <div class="col">
                    <h5 class="font-weight-bold">Technologies:</h5>

                    <ul v-for="item in activity.technologies" :key="item.id">
                      <li class="technology-name ml-3">{{ item.name }}</li>
                    </ul>
                  </div>

                  <div class="col">
                    <h5 class="font-weight-bold">Types:</h5>
                    <ul v-for="item in activity.types" :key="item.id">
                      <li class="technology-name ml-3">{{ item.name }}</li>
                    </ul>
                  </div>
                </div>

                <div class="row">
                  <h5 class="font-weight-bold col">Application till:
                    <p class="col-md-4 ml-4 application-deadline">
                      Date: {{ activity.application_deadline | formatDate }}
                    </p>
                    <p class="col-md-4  ml-4 application-deadline">Time: {{ activity.application_deadline | formatTime
                    }}</p>
                  </h5>

                  <h5 class="font-weight-bold col">
                    Activity deadline:
                    <p class="col-md-4 ml-4 deadline">Date: {{ activity.final_deadline | formatDate }}</p>
                    <p class="col-md-4 ml-4 deadline">Time: {{ activity.final_deadline | formatTime }}</p>
                  </h5>
                </div>

                <div class="text-center">
                  <b-btn
                    v-if="userId !== activity.owner.id"
                    variant="warning"
                    class="btn btn-1 col-3"
                    pill
                    @click="apply(activity.id)"
                  >
                    Apply
                  </b-btn>
                  <b-btn
                    variant="warning"
                    class="btn btn-1 col-3"
                    pill
                    to="/invite"
                  >
                    Invite
                  </b-btn>

                  <b-btn
                    v-if="userId === activity.owner.id"
                    class="btn-success col-md-3 float-right ml-2 mr-2"
                    @click="setActivityEditId"
                  >
                    Edit
                  </b-btn>

                  <b-btn
                    v-if="userId === activity.owner.id"
                    class="btn-danger col-md-3 float-right ml-2 mr-2"
                    @click="showDeleteModal"
                  >
                    Delete activity
                  </b-btn>
                </div>

                <modal
                  name="delete-activity"
                  transition="nice-modal-fade"
                  :min-width="100"
                  :min-height="100"
                  :max-width="300"
                  :max-height="200"
                  :delay="100"
                  :adaptive="true"
                >
                  <div class="example-modal-content text-center mt-5">
                    Do you want to delete activity?
                  </div>
                  <div class="row mt-5 ml-3">
                    <b-button class="col-md-5" variant="dark" @click="cancel">Cancel</b-button>
                    <b-button class="col-md-5 ml-3" variant="warning" @click="deleteActivity()">Yes</b-button>
                  </div>
                </modal>
              </div>
            </div>
          </b-card>
        </b-container>
      </section>
    </div>
  </div>
</template>

<script>
  import ActivityService from '../../services/activityApi';
  import { mapState, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        activity: {
          owner: {},
        },
      };
    },
    computed: {
      ...mapState('account', ['user', 'setUser']),
      ...mapGetters('account', ['userId']),
    },
    created() {
      ActivityService.getActivityDetails(this.$route.params.activityId).then((response) => {
        this.activity = response.data;
      })
        .catch(error => {
          console.log(error);
        });
    },
    methods: {
      apply(id) {
        ActivityService.applyActivity(id)
          .then(() => {
            this.$toast.open({
              message: 'You\'ve successfully applied!',
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((error) => {
            let message = error.response.data.message;
            this.$toast.open({
              message: message,
              type: 'error',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
          });
      },
      setActivityEditId () {
        this.$router.push ({name: 'activityEdit', params: {activityEditId: this.activity.id}});
      },
      showDeleteModal(){
        this.$modal.show('delete-activity');
      },
      cancel () {
        this.$modal.hide('delete-activity');
        return 0
      },
      deleteActivity() {
        ActivityService.deleteActivity(this.$route.params.activityId)
          .then(() => {
          alert('Deleted successful!');
          this.$router.push('/activity-list');
        })
      .catch (() => {
          alert ("You d'ont have permission")
        })
      },
    },
  };
</script>

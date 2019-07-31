<template>
  <div class="edit pt-2">
    <div class="profileCard home-content">
      <section id="card-outline">
        <b-container>
          <b-card-group deck>
            <b-card
              border-variant="warning"
              header-bg-variant="transparent"
            >
              <div class="text-right">
                <b-link
                  v-b-tooltip.hover.left
                  title="View profile"
                  @click="$router.push({ name: 'profile', params: { userId: id } })"
                >
                  <i class="fas fa-user-circle"/>
                </b-link>
              </div>

              <h4 class="text-center">
                Edit Profile
              </h4>
              <hr class="line">

              <b-alert
                show
                class="text-center"
                variant="warning"
                dismissible
                fade
              >
                <i class="fas fa-smile-wink"/>
                Add more information about yourself
              </b-alert>
              <b-tabs
                active-nav-item-class="font-weight-bold text-uppercase text-warning"
                active-tab-class="font-weight-bold"
                content-class="mt-3"
              >
                <b-tab title="General" active>
                  <br>
                  <user-details/>
                </b-tab>
                <b-tab title="Change password">
                  <br>
                  <change-password/>
                </b-tab>
                <b-tab title="Delete account">
                  <br>
                  <delete-profile/>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-card-group>
        </b-container>
      </section>
    </div>
  </div>
</template>

<script>
  import UserDetails from '../components/user/UserDetails';
  import ChangePassword from '../components/user/ChangePassword';
  import DeleteProfile from '../components/user/DeleteProfile';

  export default {
    components: {
      UserDetails,
      ChangePassword,
      DeleteProfile
    }
  };
</script>

<template>
  <div>
    <b-form-group>
      <label class="typo__label ml-3 text-color-activity">Types</label>
      <multiselect
        v-model="types"
        placeholder="Search a type"
        label="name" track-by="id"
        :options="formTypes"
        :multiple="true"
        :taggable="true"
        class="row col"
        @input="updateTypes($event)"
      />
    </b-form-group>
  </div>
</template>

<script>
  import ActivityService from '../../services/activityApi';

  export default {
    model: {
      prop: 'types',
      event: 'changeTypesList',
    },
    props: {
      types: Array,
    },
    data() {
      return {
        formTypes: [],
        selectedTypes: [],
      };
    },
    mounted() {
      this.selectedTypes = this.types;
      ActivityService.getTypes().then((response) => {
        this.formTypes = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      updateTypes(types) {
        this.$emit('changeTypesList', types);
      },
    },
  };
</script>

<template>
  <div class="select-container">
    <div class="select-content">
      <InputWithTitle>
        <template #title>Select Unit</template>

        <template #input>
          <CustomSelect
            v-if="me.units"
            :options="me.units"
            select-by="name"
            :selected-item="me.selectedUnit"
            :error="selectError"
            @input="selectUnit"
          />

          <span v-else
            >The user isn't the location manager of any location yet. Please
            reach admin to add you as location manager</span
          >
        </template>
      </InputWithTitle>

      <div class="button-area">
        <DefaultButton button-color-gamma="red" @event="submitEvent">
          Submit
        </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import DefaultButton from './DefaultButton.vue'
import SelectUnit from '~/graphql/mutations/unit/selectUnit'
import Me from '~/graphql/queries/me.query.gql'
// import Units from '~/graphql/queries/units.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'SelectUnitContent',
  components: { InputWithTitle, CustomSelect, DefaultButton },
  mixins: [mutationMixin],
  apollo: {
    me: {
      query: Me,
    },
    // units: {
    //   query: Units,
    // },
  },
  data() {
    return {
      unit: '',
      selectError: false,
    }
  },
  methods: {
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
    }),
    submitEvent() {
      if (!this.unit) {
        this.selectError = true
      }

      const { id } = this.unit

      this.mutationAction(
        SelectUnit,
        { id },
        Me,
        'Select Unit Success',
        'select unit error'
      )
    },
    selectUnit(unit) {
      this.unit = unit
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &-content {
    width: 100%;
    max-width: 240px;
  }
}

.button-area {
  margin-top: 17px;
}
</style>

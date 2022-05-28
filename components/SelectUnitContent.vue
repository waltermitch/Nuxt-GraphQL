<template>
  <div class="select-container">
    <div class="select-content">
      <InputWithTitle>
        <template #title>Select Unit</template>

        <template #input>

          <CustomSelect
            v-if="me"
            :options="me.units"
            select-by="name"
            select-by-second="id"
            :selected-item="selectedUnit"
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
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
import DefaultButton from './DefaultButton.vue'
import SelectUnit from '~/graphql/mutations/unit/selectUnit'
import Me from '~/graphql/queries/me.query.gql'
import { mutationMixin } from '~/mixins/mutationMixin'
import { meMixin } from '~/mixins/meMixin'
export default {
  name: 'SelectUnitContent',
  components: { InputWithTitle, CustomSelect, DefaultButton },
  mixins: [mutationMixin, meMixin],
  data() {
    return {
      unit: '',
      selectError: false,
    }
  },
  methods: {
    async submitEvent() {
      if (!this.unit) {
        this.selectError = true
      }

      const { id } = this.unit

      await this.mutationAction(
        SelectUnit,
        { id },
        Me,
        'Select Unit Success',
        'select unit error'
      )

      this.$router.push('/home/close-register')
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

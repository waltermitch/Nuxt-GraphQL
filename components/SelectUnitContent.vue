<template>
  <div class="select-container">
    <div class="select-content">
      <InputWithTitle>
        <template #title>Select Unit</template>

        <template #input>
          <CustomSelect
            :options="mockedList"
            :error="selectError"
            @input="selectUnit"
          />
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
export default {
  name: 'SelectUnitContent',
  components: { InputWithTitle, CustomSelect, DefaultButton },
  data() {
    return {
      unit: '',
      selectError: false,
      // TODO remove when API would be available
      mockedList: [
        {
          id: 1,
          name: 'Register #2',
        },
        {
          id: 2,
          name: 'Register #3',
        },
      ],
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

      if (this.unit) {
        this.setShowMessage(true)
        this.setMessageType('success')
      } else {
        this.setShowMessage(true)
        this.setMessageType('error')
      }

      setTimeout(() => {
        this.setShowMessage(false)
      }, 4000)
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

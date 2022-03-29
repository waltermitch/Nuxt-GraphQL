<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title>Ship To Name</template>

          <template #input>
            <CustomInput v-model="shipToName" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To Name</template>

          <template #input>
            <CustomInput v-model="billToName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ship To Address</template>

          <template #input>
            <CustomInput v-model="shipToAddress" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To Address</template>

          <template #input>
            <CustomInput v-model="billToAddress" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ship To City</template>

          <template #input>
            <CustomInput v-model="shipToCity" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To City</template>

          <template #input>
            <CustomInput v-model="billToCity" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ship To State</template>

          <template #input>
            <CustomInput v-model="shipToState" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To State</template>

          <template #input>
            <CustomInput v-model="billToState" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title>Ship To Zip Code</template>

          <template #input>
            <CustomInput v-model="shipToZipCode" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Bill To Zip Code</template>

          <template #input>
            <CustomInput v-model="billToZipCode" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEvent">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'CateringSalesShipAndBillTo',
  components: { InputRow, InputWithTitle, CustomInput, ValidationObserver },
  data() {
    return {
      shipToName: '',
      billToName: '',
      shipToAddress: '',
      billToAddress: '',
      shipToCity: '',
      billToCity: '',
      shipToState: '',
      billToState: '',
      shipToZipCode: '',
      billToZipCode: '',
    }
  },
  methods: {
    ...mapActions({
      setShowMessage: 'formSubmissionMessage/setShowMessage',
      setMessageType: 'formSubmissionMessage/setMessageType',
    }),
    saveEvent() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.setShowMessage(true)
          this.setMessageType('success')
        } else {
          this.setShowMessage(true)
          this.setMessageType('error')
        }

        setTimeout(() => {
          this.setShowMessage(false)
        }, 4000)
      })
    },
    cancelEvent() {
      this.$refs.form.reset()
      Object.assign(this.$data, this.$options.data.apply(this))
      this.setShowMessage(false)
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons-area {
  display: flex;
  margin-top: 30px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>

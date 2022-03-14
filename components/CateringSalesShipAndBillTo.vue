<template>
  <div>
    <InputRow>
      <InputWithTitle>
        <template #title>Ship To Name</template>

        <template #input>
          <CustomInput v-model="shipToName" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Bill To Name</template>

        <template #input>
          <CustomInput v-model="billToName" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Ship To Address</template>

        <template #input>
          <CustomInput v-model="shipToAddress" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Bill To Address</template>

        <template #input>
          <CustomInput v-model="billToAddress" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Ship To City</template>

        <template #input>
          <CustomInput v-model="shipToCity" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Bill To City</template>

        <template #input>
          <CustomInput v-model="billToCity" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Ship To State</template>

        <template #input>
          <CustomInput v-model="shipToState" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Bill To State</template>

        <template #input>
          <CustomInput v-model="billToState" />
        </template>
      </InputWithTitle>
    </InputRow>

    <InputRow>
      <InputWithTitle>
        <template #title>Ship To Zip Code</template>

        <template #input>
          <CustomInput v-model="shipToZipCode" />
        </template>
      </InputWithTitle>

      <InputWithTitle>
        <template #title>Bill To Zip Code</template>

        <template #input>
          <CustomInput v-model="billToZipCode" />
        </template>
      </InputWithTitle>
    </InputRow>

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
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'CateringSalesShipAndBillTo',
  components: { InputRow, InputWithTitle, CustomInput },
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
    saveEvent() {
      console.log('save')
    },
    cancelEvent() {
      Object.assign(this.$data, this.$options.data.apply(this))
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

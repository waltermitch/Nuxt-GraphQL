<template>
  <div>
    <ValidationObserver ref="form">
      <InputRow>
        <InputWithTitle>
          <template #title> Unit </template>

          <template #input>
            <CustomInput v-model="unit" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Street Address </template>

          <template #input>
            <CustomInput v-model="streetAddress" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Name </template>

          <template #input>
            <CustomInput v-model="name" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> City </template>

          <template #input>
            <CustomSelect
              v-if="state"
              :options="state.cities"
              select-by="name"
              @input="selectCity"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> District </template>

          <template #input>
            <CustomSelect
              v-if="districts"
              :options="districts.data"
              select-by="name"
              @input="selectDistrict"
            />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> County </template>

          <template #input>
            <CustomSelect
              v-if="state"
              :options="state.counties"
              select-by="name"
              @input="selectCounty"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Population </template>

          <template #input>
            <CustomInput v-model="population" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> State </template>

          <template #input>
            <CustomSelect
              v-if="states"
              :options="states.data"
              select-by="code"
              @input="selectState"
            />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Mgr First Name </template>

          <template #input>
            <CustomInput v-model="mgrFirstName" rules="required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Zip Code </template>

          <template #input>
            <CustomInput v-model="zipCode" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Mgr Last Name </template>

          <template #input>
            <CustomInput v-model="mgrLastName" rules="required" />
          </template>
        </InputWithTitle>
      </InputRow>

      <InputRow>
        <InputWithTitle>
          <template #title> Password </template>

          <template #input>
            <CustomInput v-model="password" rules="required" type="password" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title> Email </template>

          <template #input>
            <CustomInput v-model="email" rules="email|required" type="email" />
          </template>
        </InputWithTitle>
      </InputRow>
    </ValidationObserver>

    <div class="buttons-area">
      <DefaultButton button-color-gamma="red" @event="saveEvent">
        Save
      </DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancel">
        Cancel
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import { unitMaintenanceMixin } from '../mixins/unitMaintenanceMixin'
import Districts from '../graphql/queries/districts.gql'
import States from '../graphql/queries/states.gql'
import InputRow from './InputRow.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
export default {
  name: 'HQUnitMaintenanceDetails',
  components: {
    ValidationObserver,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomSelect,
  },
  mixins: [formMixin, unitMaintenanceMixin],
  apollo: {
    districts: {
      query: Districts,
    },
    states: {
      query: States,
    },
  },
  data() {
    return {
      unit: '',
      streetAddress: '',
      name: '',
      city: '',
      district: '',
      county: '',
      population: '',
      state: '',
      mgrFirstName: '',
      zipCode: '',
      mgrLastName: '',
      password: '',
      email: '',
    }
  },
  methods: {
    selectDistrict(district) {
      this.district = district
    },
    selectCounty(county) {
      this.county = county
    },
    selectState(state) {
      this.state = state
    },
    selectCity(city) {
      this.city = city
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>

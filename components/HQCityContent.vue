<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <CustomTable class="table">
        <template #header>
          <div class="table-row">
            <span> State </span>

            <span> City </span>

            <span> City Sales Tax </span>
          </div>
        </template>

        <template v-if="cities" #content>
          <CustomTableRow
            v-for="city in cities.data"
            :key="city.id"
            class="table-row"
          >
            <CustomSelect
              v-if="isEdit === city.id"
              :options="states.data"
              :selected-item="city.state"
              select-by="code"
              @input="selectState"
            />
            <span v-else>
              {{ city.state.code }}
            </span>

            <CustomInput
              v-if="isEdit === city.id"
              v-model="city.name"
              rules="required"
            />
            <span v-else>
              {{ city.name }}
            </span>

            <CustomInput
              v-if="isEdit === city.id"
              v-model.number="city.tax"
              rules="required|double"
            />
            <span v-else>
              {{ addPercentSign(city.tax) }}
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === city.id"
              :is-delete-active="isDelete === city.id"
              @edit="edit(city.id)"
              @delete="deleteItem(city.id)"
              @cancel="cancelEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(city)"
              @confirm-delete="confirmDelete(city.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomSelect
              :options="states.data"
              select-by="code"
              @input="selectState"
            />

            <CustomInput v-model="cityNew.name" rules="required" />

            <CustomInput
              v-model.number="cityNew.tax"
              type="number"
              rules="required|double"
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addCity"> Add City </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Cities from '../graphql/queries/cities.gql'
import States from '../graphql/queries/states.gql'
import CreateCity from '../graphql/mutations/city/createCity.gql'
import UpdateCity from '../graphql/mutations/city/updateCity.gql'
import DeleteCity from '../graphql/mutations/city/deleteCity.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomSelect from './CustomSelect.vue'
import CustomInput from './CustomInput.vue'
import DefaultButton from './DefaultButton.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQCityContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomSelect,
    CustomInput,
    DefaultButton,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    cities: {
      query: Cities,
    },
    states: {
      query: States,
    },
  },
  data() {
    return {
      cityNew: {
        name: '',
        state: null,
        tax: '',
      },
    }
  },
  methods: {
    selectState(state) {
      this.cityNew.state = state
    },
    addCity() {
      this.mutationAction(
        CreateCity,
        {
          cityInput: {
            name: this.cityNew.name,
            state: {
              connect: Number(this.cityNew.state.id),
            },
            tax: this.cityNew.tax,
          },
        },
        Cities,
        'Add city success',
        'Add city error'
      )
    },
    confirmEdit(city) {
      const editedCity = {
        id: city.id,
        name: city.name,
        state: {
          connect: this.cityNew.state.id,
        },
        tax: city.tax,
      }

      this.mutationAction(
        UpdateCity,
        { cityInput: editedCity },
        Cities,
        'Edit city success',
        'Edit city error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteCity,
        { id },
        Cities,
        'Delete state success',
        'Delete state error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
}

.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 100px 250px 150px 60px;
  column-gap: 30px;
}

.icon {
  cursor: pointer;

  &--add {
    grid-column: 4;
    justify-self: end;
  }
}

.buttons-area {
  margin-top: 25px;
}
</style>

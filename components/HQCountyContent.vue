<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />

      <CustomTable v-else :w-table="520">
        <template #header>
          <div class="table-row">
            <span>State</span>

            <span>County</span>

            <span>Tax</span>
          </div>
        </template>

        <template v-if="counties" #content>
          <CustomTableRow
            v-for="county in counties"
            :key="county.id"
            class="table-row"
          >
            <CustomSelect
              v-if="isEdit === county.id"
              :options="states"
              :selected-item="county.state"
              select-by="code"
              @input="selectState"
            />
            <span v-else>
              {{ county.state && county.state.code }}
            </span>

            <CustomInput
              v-if="isEdit === county.id"
              v-model="county.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>
              {{ county.name }}
            </span>

            <CustomInput
              v-if="isEdit === county.id"
              v-model.number="county.tax"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
            <span v-else>
              {{ county.tax }}
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === county.id"
              :is-delete-active="isDelete === county.id"
              @edit="edit(county.id)"
              @delete="deleteItem(county.id)"
              @cancel="cancelCountyEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(county)"
              @confirm-delete="confirmDelete(county.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomSelect
              :options="states"
              select-by="code"
              @input="selectState"
            />

            <CustomInput
              v-model="countyNew.name"
              rules="required"
              do-not-show-error-message
            />

            <CustomInput
              v-model.number="countyNew.tax"
              type="number"
              rules="required|double"
              do-not-show-error-message
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addCounty"> Add County </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import States from '../graphql/queries/states.gql'
import Counties from '../graphql/queries/counties.gql'
import CreateCounty from '../graphql/mutations/county/createCounty.gql'
import UpdateCounty from '../graphql/mutations/county/updateCounty.gql'
import DeleteCounty from '../graphql/mutations/county/deleteCounty.gql'
import CustomInput from './CustomInput.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQCountyContent',
  components: {
    ValidationObserver,
    CustomInput,
    CustomSelect,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    states: {
      query: States,
    },
    counties: {
      query: Counties,
    },
  },
  data() {
    return {
      countyNew: {
        state: null,
        name: '',
        tax: '',
      },
    }
  },
  watch: {
    async isEdit(oldVal, newVal) {
      this.counties = await this.fetchData()
    },
  },
  async destroyed() {
    this.counties = await this.fetchData()
  },
  methods: {
    async fetchData() {
      const {
        data: { counties },
      } = await this.$apollo.query({
        query: Counties,
        fetchPolicy: 'no-cache',
      })

      return counties
    },
    selectState(state) {
      this.countyNew.state = state
    },
    addCounty() {
      this.mutationAction(
        CreateCounty,
        {
          countyInput: {
            name: this.countyNew.name,
            state: {
              connect: Number(this.countyNew.state.id),
            },
            tax: this.countyNew.tax,
          },
        },
        Counties,
        'Add county success',
        'Add county error'
      )
    },
    confirmEdit(county) {
      const editedCounty = {
        id: county.id,
        name: county.name,
        state: {
          connect: this.countyNew.state.id,
        },
        tax: county.tax,
      }

      this.mutationAction(
        UpdateCounty,
        { countyInput: editedCounty },
        Counties,
        'Edit county success',
        'Edit county error'
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteCounty,
        { id },
        Counties,
        'Delete unit success',
        'Delete unit error'
      )
    },
    async cancelCountyEdit() {
      this.counties = await this.fetchData()
      this.cancelEdit()
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 30px;
  @media screen and (min-width: $md) {
    grid-template-columns: 100px 250px 150px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px 120px auto;
  }
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

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

        <template v-if="queryData.data" #content>
          <CustomTableRow
            v-for="county in queryData.data"
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
              v-model="countyNew.name"
              rules="required"
              do-not-show-error-message
            />
            <span v-else>
              {{ county.name }}
            </span>

            <CustomInput
              v-if="isEdit === county.id"
              v-model="countyNew.tax"
              type="number"
              rules="required|double"
              do-not-show-error-message
              is-float="true"
              @change="onChangeFloatValue('tax')"
            />
            <span v-else>
              {{ parseFloat(county.tax).toFixed(2) }}%
            </span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === county.id"
              :is-delete-active="isDelete === county.id"
              @edit="isAdd ? null : editCounty(county)"
              @delete="isAdd ? null : deleteItem(county.id)"
              @cancel="cancelCountyEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(county)"
              @confirm-delete="confirmDelete(county.id)"
            />
          </CustomTableRow>



          <!-- pagination -->
          <PaginationRow v-if="queryData.data.length">
            <div :class="(!isHide || isAdd ? 'show' : 'hide') + ' button-bar'">
              <PaginationButton
                :disabled="currentPage == 1"
                @event="firstPage"
              > << </PaginationButton>
              <PaginationButton
                :disabled="currentPage == 1"
                @event="prevPage"
              > < </PaginationButton>
              <PaginationInput
                v-model="page"
                @event="goToPage"
                >
              </PaginationInput>
              <PaginationButton
                :disabled="currentPage >= queryData.paginatorInfo.lastPage"
                @event="nextPage"
              > > </PaginationButton>
              <PaginationButton
                :disabled="currentPage >= queryData.paginatorInfo.lastPage"
                @event="lastPage"
              > >> </PaginationButton>
            </div>
            <div class='description-bar'>
              Showing {{queryData.paginatorInfo.firstItem}}~{{queryData.paginatorInfo.lastItem}} of {{queryData.paginatorInfo.total}}
            </div>
          </PaginationRow>




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
              v-model="countyNew.tax"
              type="number"
              rules="required|double"
              do-not-show-error-message
              is-float="true"
              @change="onChangeFloatValue('tax')"
            />
          </CustomTableRow>

          <CustomTableRow class="table-row add-row">
            <CustomTableAddIcon :is-hide="isHide" @add-row="addCountyRow" />
          </CustomTableRow>
        </template>
      </CustomTable>
    </ValidationObserver>

    <div v-if="isAdd" class="buttons-area">
      <DefaultButton @event="addCounty">+ Add County </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import States from '../graphql/queries/states.gql'
import CountyList from '../graphql/queries/countyList.gql'
import CreateCounty from '../graphql/mutations/county/createCounty.gql'
import UpdateCounty from '../graphql/mutations/county/updateCounty.gql'
import DeleteCounty from '../graphql/mutations/county/deleteCounty.gql'
import CustomInput from './CustomInput.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'



// pagination
import PaginationRow from './PaginationRow.vue'
import PaginationButton from './PaginationButton.vue'
import PaginationInput from './PaginationInput.vue'




import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { paginatorMixin } from '~/mixins/paginatorMixin'

export default {
  name: 'HQCountyContent',
  components: {
    ValidationObserver,
    CustomInput,
    CustomSelect,
    CustomTableAddIcon,

    // pagination
    PaginationRow,
    PaginationButton,
    PaginationInput,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin, paginatorMixin],
  data() {
    return {


      // pagination
      query: CountyList,
      queryName: "countyList",
      currentPage: 1,
      queryData: {},



      countyNew: {
        state: null,
        name: '',
        tax: '',
      },
    }
  },
  computed: {



    // pagination
    page: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.currentPage = parseInt(Math.max(1, Math.min(value, this.queryData.paginatorInfo.lastPage)));
        console.log('set page input value', this.currentPage);
      },
    },



  },
  apollo: {
    states: {
      query: States,
    },
  },
  beforeMount(){
    this.fetchData();
  },
  methods: {
    onChangeFloatValue(stateProp) {
      this.countyNew[stateProp] = parseFloat(this.countyNew[stateProp] !== '' ? this.countyNew[stateProp] : 0).toFixed(2)
    },
    editCounty(county) {
      this.countyNew = Object.assign({}, county)
      this.edit(county.id)
    },
    selectState(state) {
      this.countyNew.state = state
    },
    addCountyRow() {
      this.countyNew = {
        state: null,
        name: '',
        tax: '',
      }
      this.addRow()
    },
    async addCounty() {
      const newCounty = {
        name: this.countyNew.name,
        state: {
          connect: Number(this.countyNew.state.id),
        },
        tax: +this.countyNew.tax,
      }

      const res = await this.mutationAction(
        CreateCounty,
        { countyInput: newCounty },
        null,
        'Add county success',
        'Add county error',
        null,
        true
      )

      // pagination
      this.clearTableActionState();
      res !== false && this.goToPage((this.queryData.paginatorInfo.total === this.queryData.paginatorInfo.perPage * this.queryData.paginatorInfo.lastPage) ? this.queryData.paginatorInfo.lastPage + 1 : this.queryData.paginatorInfo.lastPage)
    },
    async confirmEdit(county) {
      const editedCounty = {
        id: county.id,
        name: this.countyNew.name,
        state: {
          connect: this.countyNew.state.id,
        },
        tax: +this.countyNew.tax,
      }

      await this.mutationAction(
        UpdateCounty,
        { countyInput: editedCounty },
        null,
        'Edit county success',
        'Edit county error',
        null,
        true
      )

      // pagination
      this.clearTableActionState();
      this.goToPage();
    },
    async confirmDelete(id) {
      const res = await this.mutationAction(
        DeleteCounty,
        { id },
        null,
        'Delete unit success',
        'Delete unit error',
        null,
        true
      )

      // pagination
      this.clearTableActionState();
      res !== false && this.goToPage((this.currentPage > 1 && this.queryData.paginatorInfo.count === 1) ? this.currentPage - 1 : null);
    },
    cancelCountyEdit() {
      this.cancelEdit();
    },
  },
}
</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  align-items: center;
  column-gap: 30px;
  padding: 12px 0;
  @media screen and (min-width: $md) {
    grid-template-columns: 100px 250px 150px auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px 120px auto;
  }
}

.row {
  padding: 16.5px 10px;
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

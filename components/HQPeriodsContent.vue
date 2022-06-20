<template>
  <PageContentWrapper>
    <ValidationObserver ref="form">
      <LoadingBar v-if="$apollo.loading" />
      <CustomTable v-else :w-table="780">
        <template #header>
          <div class="table-row">
            <span> Period end </span>

            <span class="text-center"> Year number </span>

            <span class="text-center"> Month number </span>

            <span class="text-center"> Week number </span>
          </div>
        </template>

        <template v-if="periods" #content>
          <CustomTableRow
            v-for="period in mutablePeriods"
            :key="period.id"
            class="table-row"
          >
            <CustomInput
              v-if="isEdit === period.id"
              v-model="periodEdit.periodEnd"
              rules="required|date"
              placeholder="mm/dd/yyyy"
              do-not-show-error-message
            />
            <span v-else>{{ period.periodEnd }}</span>

            <CustomInput
              v-if="isEdit === period.id"
              v-model="periodEdit.year"
              rules="required|numeric"
              type="number"
              do-not-show-error-message
            />
            <span v-else class="text-center">{{ period.year }}</span>

            <CustomInput
              v-if="isEdit === period.id"
              v-model="periodEdit.month"
              rules="required|numeric"
              type="number"
              do-not-show-error-message
            />
            <span v-else class="text-center">{{ period.month }}</span>

            <CustomInput
              v-if="isEdit === period.id"
              v-model="periodEdit.week"
              rules="required|numeric"
              type="number"
              do-not-show-error-message
            />
            <span v-else class="text-center">{{ period.week }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === period.id"
              :is-delete-active="isDelete === period.id"
              @edit="editPeriod(period)"
              @delete="deleteItem(period.id)"
              @cancel="cancelPeriodEdit"
              @cancel-delete="cancelDelete"
              @confirm-edit="confirmEdit(period)"
              @confirm-delete="confirmDelete(period.id)"
            />
          </CustomTableRow>

          <CustomTableRow v-if="isAdd" class="table-row">
            <CustomInput
              v-model="periodNew.periodEnd"
              rules="required|date"
              placeholder="mm/dd/yyyy"
              do-not-show-error-message
            />

            <CustomInput
              v-model="periodNew.year"
              rules="required|numeric"
              type="number"
              do-not-show-error-message
            />

            <CustomInput
              v-model="periodNew.month"
              rules="required|numeric"
              type="number"
              do-not-show-error-message
            />

            <CustomInput
              v-model="periodNew.week"
              rules="required|numeric"
              type="number"
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
      <DefaultButton @event="addPeriod">+ Add Period </DefaultButton>

      <DefaultButton @event="cancelAdd"> Cancel </DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import Periods from '../graphql/queries/periods.gql'
import CreatePeriod from '../graphql/mutations/periods/createPeriod.gql'
import UpdatePeriod from '../graphql/mutations/periods/updatePeriod.gql'
import DeletePeriod from '../graphql/mutations/periods/deletePeriod.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomInput from './CustomInput.vue'
import CustomTableAddIcon from './CustomTableAddIcon.vue'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { formMixin } from '~/mixins/formMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import {formatDateFromAPI, formatDate} from "~/helpers/helpers";
export default {
  name: 'HQPeriodsContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomInput,
    CustomTableAddIcon,
  },
  mixins: [submitMessagesMixin, formMixin, mutationMixin, tableActionsMixin],
  apollo: {
    periods: {
      query: Periods,
      variables: {
        hasUnits: false,
      },
    },
  },
  data() {
    return {
      mutablePeriods: [],
      periodNew: {
        periodEnd: '',
        year: null,
        month: null,
        week: null,
      },
      periodEdit: {},
    }
  },
  computed: {
    formattedPeriods() {
      return this.periods.map((period) => {
        return {
          ...period,
          periodEnd: this.formatDateFromAPI(period.periodEnd),
        }
      })
    },
  },
  watch: {
    periods() {
      if (this.periods)
        this.mutablePeriods = Object.assign({}, this.formattedPeriods);
    },
  },
  mounted() {
    if (this.periods)
      this.mutablePeriods = Object.assign({}, this.formattedPeriods);
  },
  methods: {
    formatDate,
    formatDateFromAPI,
    editPeriod(period) {
      this.periodEdit = Object.assign({}, period)
      this.edit(period.id)
    },
    addPeriod() {
      this.mutationAction(
        CreatePeriod,
        {
          periodInput: {
            periodEnd: this.formatDate(this.periodNew.periodEnd),
            year: Number(this.periodNew.year),
            month: Number(this.periodNew.month),
            week: Number(this.periodNew.week),
          },
        },
        Periods,
        'Add period success',
        'Add period error',
        {
          hasUnits: false,
        }
      )
    },
    confirmEdit(period) {
      const editedPeriod = {
        id: period.id,
        periodEnd: this.formatDate(this.periodEdit.periodEnd),
        year: Number(this.periodEdit.year),
        month: Number(this.periodEdit.month),
        week: Number(this.periodEdit.week),
      }

      this.mutationAction(
        UpdatePeriod,
        {
          periodInput: editedPeriod,
        },
        Periods,
        'Edit period success',
        'Edit period error',
        {
          hasUnits: false,
        }
      )
    },
    confirmDelete(id) {
      this.mutationAction(
        DeletePeriod,
        { id },
        Periods,
        'Delete period success',
        'Delete period error',
        {
          hasUnits: false,
        }
      )
    },
    cancelPeriodEdit() {
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
  padding: 12px 0;
  @media screen and (min-width: $lg) {
    grid-template-columns: 20% 10% 10% 10% auto;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 100px 60px 60px 60px auto;
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

.text-center {
  text-align: center;
}

.icon--add {
  grid-column: 5;
}
</style>

<template>
  <PageContentWrapper>
    <LoadingBar v-if="$apollo.loading" />
    <CustomTable v-else :w-table="620">
      <template #header>
        <div class="table-row">
          <span>Unit Number</span>

          <span>Name</span>

          <span>City</span>

          <span>State</span>
        </div>
      </template>

      <template v-if="units" #content>
        <CustomTableRow v-for="unit in units" :key="unit.id" class="table-row">
          <span>
            {{ unit.code }}
          </span>

          <span>
            {{ unit.name }}
          </span>

          <span v-if="unit.city">
            {{ unit.city.name }}
          </span>
          <span v-else>-</span>

          <span v-if="unit.city">
            {{ unit.city.state.code }}
          </span>
          <span v-else>-</span>

          <CustomTableIconsColumn
            :is-delete-active="isDelete === unit.id"
            @edit="editUnit(unit)"
            @delete="deleteItem(unit.id)"
            @cancel-delete="cancelDelete"
            @confirm-delete="confirmDelete(unit.id)"
          />
        </CustomTableRow>
      </template>
    </CustomTable>
  </PageContentWrapper>
</template>

<script>
import Units from '../graphql/queries/units.gql'
import DeleteUnit from '../graphql/mutations/unit/deleteUnit.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow'
import CustomTableIconsColumn from './CustomTableIconsColumn'
import { unitMaintenanceMixin } from '~/mixins/unitMaintenanceMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
export default {
  name: 'HQUnitsTableContent',
  components: {
    PageContentWrapper,
    CustomTable,
    CustomTableRow,
    CustomTableIconsColumn,
  },
  mixins: [unitMaintenanceMixin, tableActionsMixin, mutationMixin],
  props: {
    search: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      units: {},
      queryVariable: {
        search: '',
      },
      timeout: null
    }
  },
  watch: {
    search() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => this.fetchData(), 500)
    }
  },
  beforeMount() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      if(this.search !== '') this.queryVariable.search = '%' + this.search + '%';
      else this.queryVariable.search = '%';

      const queryData = await this.$apollo.query({
          query: Units,
          fetchPolicy: 'network-only',
          variables: this.queryVariable,
      });
      this.units = queryData.data.units
    },
    editUnit(unit) {
      const propertyList = ['administrativeAmount', 'administrativePercent', 'benefitsAmount', 'benefitsPercent', 'businessInsuranceAmount', 'commissionAmount', 'commissionPercent', 'managementAmount', 'managementPercent', 'payrollTaxPercent', 'supportAmount', 'supportPercent', 'vacationAmount', 'vendingIncome'];
      for ( const property of propertyList ) {
        unit[property] = Number(unit[property]).toFixed(2);
      }

      this.setUnit(unit)
      this.setUnitID(unit.id)
      this.showAddUnit()
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteUnit,
        { id },
        Units,
        'Delete unit success',
        'Delete unit error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>

.table-content {
  .header {
    padding: 6px 10px;

    .table-row {
      padding: 0;
    }
  }
}

.table-row {
  display: grid;
  align-items: center;
  padding: 6px 10px;
  //grid-template-columns: 160px 340px 200px 160px auto;
  column-gap: 30px;
  @media screen and (min-width: $md) {
    grid-template-columns: 17% 30% 16% 15% auto;
  }
  @media screen and (max-width: $md) {
    grid-template-columns: 100px 120px 120px 70px auto;
  }

  span {
    height: 40px;
    display: flex;
    align-items: center;
  }
}
</style>

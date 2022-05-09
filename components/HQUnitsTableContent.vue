<template>
  <PageContentWrapper>
    <CustomTable>
      <template #header>
        <div class="table-row">
          <span>Unit</span>

          <span>Name</span>

          <span>City</span>

          <span>State</span>
        </div>
      </template>

      <template v-if="units" #content>
        <CustomTableRow
          v-for="unit in units.data"
          :key="unit.id"
          class="table-row"
        >
          <span>
            {{ unit.code }}
          </span>

          <span>
            {{ unit.name }}
          </span>

          <span>
            {{ unit.city.name }}
          </span>

          <span>
            {{ unit.city.state.code }}
          </span>

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
  apollo: {
    units: {
      query: Units,
    },
  },
  methods: {
    editUnit(unit) {
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
.table-row {
  display: grid;
  align-items: center;
  grid-template-columns: 160px 340px 200px 160px 60px;
  column-gap: 30px;
}
</style>

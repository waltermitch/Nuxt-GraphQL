<template>
  <PageContentWrapper>
    <InputRow>
      <InputWithTitle>
        <template #title> Unit </template>

        <template #input>
          <CustomSelect
            v-if="units"
            :options="units"
            select-by="name"
            select-by-second="code"
            @input="selectUnit"
          />
        </template>
      </InputWithTitle>

      <InputWithTitle v-if="unit">
        <template #title> Name </template>

        <template #input>
          <CustomInput v-model="unit.name" readonly />
        </template>
      </InputWithTitle>
    </InputRow>

    <LoadingBar v-if="$apollo.loading" />
    <CustomTablesArea v-else>
      <CustomTable v-if="vendors" class="table table--left" :w-table="580">
        <template #header>
          <div class="table-row">
            <span> Vendor ID </span>

            <span> Vendor Name </span>

            <span> Vendor Term</span>

            <span> Add Vendor to Unit </span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="vendor in vendors"
            :key="vendor.id"
            class="table-row"
          >
            <span>
              {{ vendor.id }}
            </span>

            <span>
              {{ vendor.name }}
            </span>

            <span>
              {{ vendor.term.name }}
            </span>

            <DefaultButton
              @event="
                unit.vendors.find((item) => item.id === vendor.id)
                  ? removeVendorFromUnit(vendor)
                  : addVendorToUnit(vendor)
              "
            >
              {{
                unit.vendors &&
                unit.vendors.find((item) => item.id === vendor.id)
                  ? 'Remove Vendor From Unit'
                  : 'Add Vendor to Unit'
              }}
            </DefaultButton>
          </CustomTableRow>
        </template>
      </CustomTable>

      <CustomTable
        v-if="unit && unit.vendors"
        class="table table--right"
        :w-table="350"
      >
        <template #header>
          <div class="table-row table-row--unit">
            <span> Vendor ID </span>

            <span> Vendor Name </span>

            <span> Vendor Term</span>
          </div>
        </template>

        <template #content>
          <CustomTableRow
            v-for="vendor in unit.vendors"
            :key="vendor.id"
            class="table-row table-row--unit"
          >
            <span>
              {{ vendor.id }}
            </span>

            <span>
              {{ vendor.name }}
            </span>

            <span>
              {{ vendor.term.name }}
            </span>
          </CustomTableRow>
        </template>
      </CustomTable>
    </CustomTablesArea>
  </PageContentWrapper>
</template>

<script>
import Vendors from '../graphql/queries/vendors.gql'
import Units from '../graphql/queries/units.gql'
import UpdateUnit from '../graphql/mutations/unit/updateUnit.gql'
import PageContentWrapper from './PageContentWrapper.vue'
import DefaultButton from './DefaultButton.vue'
import CustomTablesArea from './CustomTablesArea.vue'
import { mutationMixin } from '~/mixins/mutationMixin'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
export default {
  name: 'HQUnitVendorContent',
  components: { PageContentWrapper, DefaultButton, CustomTablesArea },
  apollo: {
    vendors: {
      query: Vendors,
    },
    units: {
      query: Units,
    },
  },
  mixins: [mutationMixin, tableActionsMixin],
  data() {
    return {
      unit: '',
    }
  },
  methods: {
    selectUnit(item) {
      this.unit = item
    },
    async addVendorToUnit(vendor) {
      const unit = this.unit
      const { id } = this.unit

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            vendors: {
              sync: [
                ...this.unit.vendors.map((vendor) => vendor.id),
                vendor.id,
              ],
            },
          },
        },
        Units,
        'Add vendor to unit success',
        'Add vendor to unit error'
      )

      this.unit = unit
    },
    async removeVendorFromUnit(vendor) {
      const unit = this.unit
      const { id } = this.unit

      await this.mutationAction(
        UpdateUnit,
        {
          unitInput: {
            id,
            vendors: {
              disconnect: [Number(vendor.id)],
            },
          },
        },
        Units,
        'Remove vendor from unit success',
        'Remove vendor from unit error'
      )

      this.unit = unit
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: fit-content;
  margin-bottom: 20px;
}

.table-row {
  display: grid;
  align-items: center;

  @media screen and (min-width: $lg) {
    grid-template-columns: 80px repeat(2, 100px) 220px;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 80px repeat(2, 26%) auto;
  }
  column-gap: 20px;

  &--unit {
    @media screen and (min-width: $lg) {
      grid-template-columns: 80px repeat(2, 100px);
    }
    @media screen and (max-width: $lg) {
      grid-template-columns: 80px repeat(2, 26%);
    }
  }
}

.table {
  &--right {
    @media screen and (min-width: $xl) {
      width: 50% !important;
    }
    @media screen and (max-width: $xl) {
      width: 100% !important;
    }
  }
  &--left {
    @media screen and (min-width: $xl) {
      width: 70% !important;
    }
    @media screen and (max-width: $xl) {
      width: 100% !important;
      margin: 0 !important;
    }
  }
}
</style>

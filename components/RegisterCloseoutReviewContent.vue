<template>
  <PageContentWrapper>
    <LoadingBar v-if="$apollo.loading" />
    <div v-else class="table table-full">
      <CustomTable :w-table="750">
        <template #header>
          <div class="table-row">
            <span> id </span>

            <span>Close Date</span>

            <span> Unit id </span>

            <span> Register id </span>
          </div>
        </template>

        <template v-if="registerCloseouts" #content>
          <CustomTableRow
            v-for="registerCloseout in registerCloseouts"
            :key="registerCloseout.id"
            class="table-row table-content-row"
          >
            <span>{{ registerCloseout.id }}</span>

            <span>{{ registerCloseout.createdAt }}</span>

            <span v-if="registerCloseout.unit">{{
              registerCloseout.unit.id
            }}</span>

            <span v-if="registerCloseout.register">{{
              registerCloseout.register.id
            }}</span>

            <CustomTableIconsColumn
              :is-edit-active="isEdit === registerCloseout.id"
              :is-delete-active="isDelete === registerCloseout.id"
              @edit="editRegisterCloseoutOrder(registerCloseout)"
              @delete="deleteItem(registerCloseout.id)"
              @cancel-delete="cancelDelete"
              @confirm-delete="confirmDelete(registerCloseout.id)"
            />
          </CustomTableRow>
        </template>
      </CustomTable>
    </div>
  </PageContentWrapper>
</template>

<script>
import CustomTable from './CustomTable.vue'
import CustomTableRow from './CustomTableRow.vue'
import CustomTableIconsColumn from './CustomTableIconsColumn.vue'
import RegisterCloseouts from '~/graphql/queries/registerCloseouts'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import { formatDateFromAPI } from '~/helpers/helpers'
import DeleteRegisterCloseout from '~/graphql/mutations/registerCloseout/deleteRegisterCloseout'
export default {
  name: 'RegisterCloseoutReviewContent',
  components: {
    CustomTable,
    CustomTableRow,
    CustomTableIconsColumn,
  },
  apollo: {
    registerCloseouts: {
      query: RegisterCloseouts,
    },
  },
  mixins: [tableActionsMixin, mutationMixin],
  methods: {
    formatDateFromAPI,
    selectPeriodEndDate(item) {
      this.periodEndDate = item
    },
    editRegisterCloseoutOrder(closeRegister) {
      this.$store.commit('closeRegister/SET_CLOSE_REGISTER', {
        ...closeRegister,
      })
      this.$store.commit('closeRegister/SET_IS_EDIT', true)
      this.$router.push('/home/close-register')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteRegisterCloseout,
        { id },
        RegisterCloseouts,
        'Delete Register Closeout success',
        'Delete Register Closeout error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  margin-top: 30px;
}

.table-row {
  display: grid;
  align-items: center;
  column-gap: 20px;
  @media screen and (min-width: $lg) {
    grid-template-columns: 8% 42% 20% 10% 10%;
  }
  @media screen and (max-width: $lg) {
    grid-template-columns: 80px 220px 120px 120px 90px 68px;
  }
}

.table-full {
  @media screen and (min-width: $lg) and (max-width: $xxl) {
    width: calc(100vw - 280px);
  }
}

.table-content-row {
  height: 60px;
}

.icon {
  margin-right: 15px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
}
</style>

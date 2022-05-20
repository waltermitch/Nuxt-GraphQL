<template>
  <PageContentWrapper>
    <InputWithTitle>
      <template #title> Period End Date </template>

      <template #input>
        <CustomSelect :options="mockedList" @input="selectPeriodEndDate" />
      </template>
    </InputWithTitle>

    <div class="table">
      <CustomTable>
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
            v-for="registerCloseout in registerCloseouts.data"
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
import InputWithTitle from './InputWithTitle.vue'
import CustomSelect from './CustomSelect.vue'
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
    InputWithTitle,
    CustomSelect,
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
  data() {
    return {
      mockedList: [
        {
          id: 1,
          name: '22/02/2022',
        },
        {
          id: 2,
          name: '22/04/2022',
        },
      ],
      periodEndDate: null,
    }
  },
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
  grid-template-columns: 166px 326px 144px 170px 90px 68px;
  column-gap: 20px;
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

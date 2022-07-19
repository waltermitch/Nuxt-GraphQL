<template>
  <PageContentWrapper>
    <div class="tables-wrapper">
      <table class="tables">
        <thead class="tables__thead">
          <tr>
            <th width="50">ID</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="tables__body">
          <tr v-for="(role, i) in roles" :key="i">
            <td width="50">{{ role.id }}</td>
            <td class="nowrap">{{ role.name }}</td>
            <td>
              <CustomTableIconsColumn
                :is-delete-active="isDelete === role.id"
                @edit="editUnit(role)"
                @delete="deleteItem(role.id)"
                @cancel-delete="cancelDelete"
                @confirm-delete="confirmDelete(role.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import PageContentWrapper from '../PageContentWrapper.vue'
import Roles from '../../graphql/queries/roles.gql'
import CustomTableIconsColumn from '../CustomTableIconsColumn'
import DeleteRole from '~/graphql/mutations/roles/deleteRole.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'

export default {
  name: 'HQRoles',
  components: {
    CustomTableIconsColumn,
    PageContentWrapper,
  },
  mixins: [tableActionsMixin, mutationMixin],
  apollo: {
    roles: {
      query: Roles,
    },
  },
  methods: {
    ...mapActions({
      setUpdateRole: 'roles/setUpdateRole',
      setShowAddRole: 'roles/setShowAddRole',
    }),
    editUnit(role) {
      this.setUpdateRole(role)
      this.setShowAddRole('HQRolesEdit')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteRole,
        { id },
        Roles,
        'Delete role success',
        'Delete role error'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.tables {
  border-collapse: separate;
  border-spacing: 0;
  &-wrapper {
    border-radius: 8px;
    border: 1px solid #efefef;
    overflow: auto;
  }

  tr {
    vertical-align: top;
  }

  &__thead {
    th {
      background: #f7f7f7;
      color: #303030;
      font-size: 14px;
      font-weight: 600;
      line-height: 13px;
      padding: 19.5px 10px;
      border-bottom: 1px solid #efefef;
      white-space: nowrap;
      text-align: left;
    }
  }

  &__body {
    tr {
      &:not(:last-child) {
        td {
          border-bottom: 1px solid #efefef;
        }
      }
    }

    td {
      padding: 16.5px 10px;
      background: #fff;
      font-size: 14px;
    }
  }

  &__col-5 {
    min-width: 200px;
  }
}

.nowrap {
  white-space: nowrap;
}

.text-center {
  text-align: center;
}

@media screen and (min-width: $lg) and (max-width: $xxl) {
  .tables {
    &-wrapper {
      width: calc(100vw - 280px);
    }
  }
}
</style>

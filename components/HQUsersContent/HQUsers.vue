<template>
  <PageContentWrapper>
    <div class="tables-wrapper">
      <table class="tables">
        <thead class="tables__thead">
          <tr>
            <th width="50">ID</th>
            <th>First Name</th>
            <th>Lats Name</th>
            <th>Email</th>
            <th class="tables__col-5">Units</th>
            <th class="text-center">Is Admin</th>
            <th class="text-center">Is Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="tables__body">
          <tr v-for="(user, i) in users" :key="i">
            <td width="50">{{ user.id }}</td>
            <td class="nowrap">{{ user.firstName }}</td>
            <td class="nowrap">{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td class="tables__col-5">
              <span>
                {{ user.units.map((unit) => unit.name).join(', ') }}
              </span>
            </td>
            <td class="text-center">
              <span v-if="user.isAdmin">+</span><span v-else>-</span>
            </td>
            <td class="text-center">
              <span v-if="user.isActive">+</span><span v-else>-</span>
            </td>
            <td>
              <CustomTableIconsColumn
                :is-delete-active="isDelete === user.id"
                @edit="editUnit(user)"
                @delete="deleteItem(user.id)"
                @cancel-delete="cancelDelete"
                @confirm-delete="confirmDelete(user.id)"
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
import Users from '../../graphql/queries/users.gql'
import CustomTableIconsColumn from '../CustomTableIconsColumn'
import DeleteUser from '~/graphql/mutations/users/deleteUser.gql'
import { tableActionsMixin } from '~/mixins/tableActionsMixin'
import { mutationMixin } from '~/mixins/mutationMixin'

export default {
  name: 'HQUsers',
  components: {
    CustomTableIconsColumn,
    PageContentWrapper,
  },
  mixins: [tableActionsMixin, mutationMixin],
  apollo: {
    users: {
      query: Users,
    },
  },
  methods: {
    ...mapActions({
      setUpdateUser: 'users/setUpdateUser',
      setShowAddUser: 'users/setShowAddUser',
    }),
    editUnit(user) {
      this.setUpdateUser(user)
      this.setShowAddUser('HQUsersEdit')
    },
    confirmDelete(id) {
      this.mutationAction(
        DeleteUser,
        { id },
        Users,
        'Delete user success',
        'Delete user error'
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

<template>
  <PageContentWrapper>
    <div class="input-row input-row--offset mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> Role Name</template>

          <template #input>
            <CustomInput v-model="roleName" />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row input-row--offset mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> Permissions</template>
        </InputWithTitle>

        <table class="permissions-table">
          <thead class="permissions-table__thead">
          <tr>
            <th width="50">Name</th>
            <th width="50">View</th>
            <th width="50">Create</th>
            <th width="50">Modify</th>
          </tr>
          </thead>
          <tbody class="permissions-table__body">
            <tr v-for="(permission, i) in permissions" :key="i">
              <td>{{ permissionNames[i] }}</td>
              <td>
                <div class="checkbox-hld">
                  <CustomCheckbox
                    :value="{menuNum: i, actionType: 'isView', checked: permission.isView}"
                    @update-checkbox="updateCheckbox"
                  />
                </div>
              </td>
              <td>
                <div class="checkbox-hld">
                  <CustomCheckbox
                    :value="{menuNum: i, actionType: 'isCreate', checked: permission.isCreate}"
                    @update-checkbox="updateCheckbox"
                  />
                </div>
              </td>
              <td>
                <div class="checkbox-hld">
                  <CustomCheckbox
                    :value="{menuNum: i, actionType: 'isModify', checked: permission.isModify}"
                    @update-checkbox="updateCheckbox"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="buttons-area">
      <DefaultButton @event="editRole">Edit Role</DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEdit">
        Cancel</DefaultButton
      >
    </div>
  </PageContentWrapper>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PageContentWrapper from '../PageContentWrapper.vue'
import Role from '../../graphql/queries/roles.gql'
import Menus from '../../graphql/queries/menus.gql'
import UpdateRole from '../../graphql/mutations/roles/updateRoles.gql'
import CustomInput from '../CustomInput.vue'
import InputWithTitle from '../InputWithTitle.vue'
import DefaultButton from '../DefaultButton'
import { mutationMixin } from '~/mixins/mutationMixin'

export default {
  name: 'HQRolesEdit',
  components: {
    CustomInput,
    InputWithTitle,
    PageContentWrapper,
    DefaultButton,
  },
  mixins: [mutationMixin],
  apollo: {
    menus: {
      query: Menus,
    },
  },
  data() {
    return {
      permissions: {},
      permissionNames: {},
    }
  },
  computed: {
    roleName: {
      get() {
        return this.getUpdateRole.roleName
      },
      set(value) {
        this.$store.commit('roles/SET_UPDATE_ROLE_NAME', value)
      },
    },
    rolePermissions: {
      get() {
        return this.getUpdateRole.permissions
      },
      set(value) {
        this.$store.commit('roles/SET_UPDATE_ROLE_PERMISSIONS', value)
      },
    },
    ...mapGetters({
      getUpdateRole: 'roles/getUpdateRole',
    }),
  },
  watch: {
    menus() {
      this.setupPermissions();
    }
  },
  methods: {
    ...mapActions({
      setShowAddRole: 'roles/setShowAddRole',
    }),
    updateCheckbox(checkboxValue) {
      const obj = this.permissions[checkboxValue.menuNum];

      obj[checkboxValue.actionType] = !checkboxValue.checked

      this.$set(this.permissions, checkboxValue.menuNum, obj);
    },
    editRole() {
      const obj = {
        roleID: this.getUpdateRole.id,
        roleName: this.roleName,
        permissions: this.permissions,
      }

      this.mutationAction(
        UpdateRole,
        {
          roleInput: obj,
        },
        Role,
        'Add role success',
        'Add role error'
      ).then((data) => {
        if (data.data.updateRole.status === true) {
          setTimeout(() => {
            this.setShowAddRole('HQRoles')
          }, 2000)
        }
      })
    },
    cancelEdit() {
      this.setShowAddRole('HQRoles')
    },
    setupPermissions() {
      this.permissions = [];

      if (!this.menus || !this.rolePermissions)
        return;

      this.menus.forEach((item, i) => {
        const permissionFilter = this.rolePermissions.filter((rolePermission) => {
          return item.id === rolePermission.menu.id;
        });

        const currentPermission = permissionFilter ? permissionFilter[0] : null;

        this.permissions[i] = {
          menuID: item.id,
          isView: currentPermission ? currentPermission.isView : true,
          isCreate: currentPermission ? currentPermission.isCreate : true,
          isModify: currentPermission ? currentPermission.isModify : true,
        }

        this.permissionNames[i] = item.name;
      });
    },
  },
}
</script>
<style lang="scss">
.input {
  &-row--offset {
    display: flex;
    margin: 0 -15px;
  }

  &-col {
    max-width: 480px;
    min-width: 240px;
    padding: 0 15px;
  }
}

.mb-20 {
  margin-bottom: 20px;
}

.permissions-table {
  border-collapse: separate;
  border-spacing: 0;

  .permissions-table-wrapper {
    border-radius: 8px;
    border: 1px solid #efefef;
    overflow: auto;
  }

  tr {
    vertical-align: top;
  }

  .permissions-table__thead {
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

  .permissions-table__body {
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

    td:first-child {
      width: 400px;
    }
  }

  td:not(:first-child),
  th:not(:first-child) {
    text-align: center;
  }

  td:not(:first-child) .checkbox-hld {
    display: flex;
    align-items: center;
    justify-content: center;

    .caption {
      display: none;
    }
  }

  .permissions-table__col-5 {
    min-width: 200px;
  }
}
</style>

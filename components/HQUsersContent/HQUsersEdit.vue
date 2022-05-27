<template>
  <PageContentWrapper>
    <div class="input-row mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> First Name</template>

          <template #input>
            <CustomInput
              v-model="firstName"
            />
          </template>
        </InputWithTitle>
      </div>
      <div class="input-col">
        <InputWithTitle>
          <template #title> Last Name</template>

          <template #input>
            <CustomInput
              v-model="lastName"
            />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> Email</template>

          <template #input>
            <CustomInput
              v-model="email"
            />
          </template>
        </InputWithTitle>
      </div>
      <div class="input-col">
        <InputWithTitle>
          <template #title> Password</template>

          <template #input>
            <CustomInput
              v-model="password"
            />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row mb-20">
      <div class="input-col mb-20">
        <InputWithTitle class="mb-20">
          <template #title> Is Admin</template>
          <template #input>
            <CustomRadioButton
              :is-active="isAdmin"
              @set-is-active="setIsAdmin"
            />
          </template>
        </InputWithTitle>
        <InputWithTitle>
          <template #title> Is Active</template>
          <template #input>
            <CustomRadioButton
              :is-active="isActive"
              @set-is-active="setIsActive"
            />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row mb-20" v-if="!isAdmin">
      <div class="input-col">
        <multiselect v-if="units && !isAdmin" v-model="unit" :options="units" :multiple="true" :close-on-select="false"
                     :clear-on-select="false"
                     :preserve-search="true" placeholder="Pick some" label="name" track-by="name"
                     :preselect-first="false">
        </multiselect>
      </div>
    </div>

    <div class="buttons-area">
      <DefaultButton @event="addUser"> Edit User</DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelEdit"> Cancel</DefaultButton>
    </div>
  </PageContentWrapper>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Multiselect from 'vue-multiselect'
import Units from '../../graphql/queries/units.gql'
import UpdateUser from "~/graphql/mutations/users/updateUsers.gql";
import User from "~/graphql/queries/users.gql";
import {mutationMixin} from '~/mixins/mutationMixin'

export default {
  name: "HQUsersContent",
  components: {
    Multiselect
  },
  mixins: [mutationMixin],
  apollo: {
    units: {
      query: Units,
    },
  },
  computed: {
    firstName: {
      get() {
        return this.getUpdateUser.firstName
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_FIRSTNAME', value)
      },
    },
    lastName: {
      get() {
        return this.getUpdateUser.lastName
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_LASTNAME', value)
      },
    },
    email: {
      get() {
        return this.getUpdateUser.email
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_EMAIL', value)
      },
    },
    unit: {
      get() {
        return this.getUpdateUser.unit
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_UNIT', value)
      },
    },
    password: {
      get() {
        return this.getUpdateUser.password
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_PASSWORD', value)
      },
    },
    isAdmin: {
      get() {
        return this.getUpdateUser.isAdmin
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_IS_ADMIN', value)
      },
    },
    isActive: {
      get() {
        return this.getUpdateUser.isActive
      },
      set(value) {
        this.$store.commit('users/SET_UPDATE_USER_IS_ACTIVE', value)
      },
    },
    ...mapGetters({
      getUpdateUser: 'users/getUpdateUser',
    })
  },
  methods: {
    ...mapActions({
      setShowAddUser: 'users/setShowAddUser',
    }),
    setIsAdmin(isCheck) {
      if (isCheck) {
        isCheck.isAdmin = !isCheck.isAdmin
      } else {
        this.isAdmin = !this.isAdmin
      }
    },
    setIsActive(isCheck) {
      if (isCheck) {
        isCheck.isActive = !isCheck.isActive
      } else {
        this.isActive = !this.isActive
      }
    },
    addUser() {
      this.mutationAction(
        UpdateUser,
        {
          userInput: {
            id: this.getUpdateUser.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            //    password: this.password,
            isAdmin: this.isAdmin,
            isActive: this.isActive,
            units: {
              sync: this.unit.map((unit) => unit.id)
            },
          },
        },
        User,
        'Add user success',
        'Add user error'
      ).then((data) => {
        if (data.data.updateUser.status === "UPDATED") {
          setTimeout(() => {
            this.setShowAddUser('HQUsers')
          }, 2000)
        }
      })
    },
    cancelEdit() {
      this.setShowAddUser('HQUsers')
    }
  }
}
</script>

<style scoped>

</style>

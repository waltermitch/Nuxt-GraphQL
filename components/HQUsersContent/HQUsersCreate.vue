<template>
  <PageContentWrapper>
    <div class="input-row input-row--offset mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> First Name</template>

          <template #input>
            <CustomInput v-model="firstName" />
          </template>
        </InputWithTitle>
      </div>
      <div class="input-col">
        <InputWithTitle>
          <template #title> Last Name</template>

          <template #input>
            <CustomInput v-model="lastName" />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row input-row--offset mb-20">
      <div class="input-col">
        <InputWithTitle>
          <template #title> Email</template>

          <template #input>
            <CustomInput v-model="email" />
          </template>
        </InputWithTitle>
      </div>
      <div class="input-col">
        <InputWithTitle>
          <template #title> Password</template>

          <template #input>
            <CustomInput v-model="password" />
          </template>
        </InputWithTitle>
      </div>
    </div>
    <div class="input-row input-row--offset mb-20">
      <div class="input-col">
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
    <div class="input-row input-row--offset mb-20">
      <div class="input-col multiselects">
        <multiselect
          v-if="units && !isAdmin"
          v-model="unit"
          :options="units"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :show-labels="false"
          :custom-label="nameWithId"
          :preserve-search="true"
          placeholder="Pick some"
          label="name"
          track-by="name"
          :preselect-first="false"
        >
        </multiselect>
      </div>
    </div>
    <div class="buttons-area">
      <DefaultButton @event="addUser"> Add User</DefaultButton>

      <DefaultButton button-color-gamma="white" @event="cancelAdd">
        Cancel</DefaultButton
      >
    </div>
  </PageContentWrapper>
</template>

<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
import PageContentWrapper from '../PageContentWrapper.vue'
import CreateUser from '../../graphql/mutations/users/createUsers.gql'
import User from '../../graphql/queries/users.gql'
import Units from '../../graphql/queries/units.gql'
import CustomInput from '../CustomInput.vue'
import CustomRadioButton from '../CustomRadioButton.vue'
import InputWithTitle from '../InputWithTitle.vue'
import DefaultButton from '../DefaultButton'
import { mutationMixin } from '~/mixins/mutationMixin'

export default {
  name: 'HQUsersCreate',
  components: {
    CustomInput,
    CustomRadioButton,
    InputWithTitle,
    Multiselect,
    PageContentWrapper,
    DefaultButton,
  },
  mixins: [mutationMixin],
  apollo: {
    units: {
      query: Units,
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      unit: '',
      password: '',
      isAdmin: false,
      isActive: false,
    }
  },
  methods: {
    ...mapActions({
      setShowAddUser: 'users/setShowAddUser',
    }),
    nameWithId({ name, id }) {
      return `${id} — ${name}`
    },
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
        CreateUser,
        {
          userInput: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            units: {
              sync: this.unit.map((unit) => unit.id),
            },
            password: this.password,
            isAdmin: this.isAdmin,
            isActive: this.isActive,
          },
        },
        User,
        'Add user success',
        'Add user error'
      ).then((data) => {
        if (data.data.createUser.status === 'CREATED') {
          setTimeout(() => {
            this.setShowAddUser('HQUsers')
          }, 2000)
        }
      })
    },
    cancelAdd() {
      this.setShowAddUser('HQUsers')
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.input {
  &-row--offset {
    display: flex;
    margin: 0 -15px;
  }

  &-col {
    min-width: 240px;
    padding: 0 15px;
  }
}

.mb-20 {
  margin-bottom: 20px;
}

.multiselect__tags {
  border: 1px solid gainsboro;
  border-radius: 3px;
}

.multiselect__option {
  padding: 10px 16px 10px 8px;
  color: #000;
  font-size: 14px;
  background: #fff;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  color: #fff;
  background-color: #b01d22;
}
.multiselect__option--selected.multiselect__option--highlight {
  background: rgba(#b01d22, 0.6);
}

.multiselect__tag {
  background-color: #b01d22;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background-color: #b01d22;
}

.multiselect__tag-icon:after {
  color: #fff;
}

.multiselect__select:before {
  border: none;
  width: 24px;
  height: 24px;
  background: url(assets/images/icons/chevron-down.svg);
  display: block;
  top: 0;
}
</style>

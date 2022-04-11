<template>
  <div class="password">
    <ValidationObserver ref="form">
      <InputWithTitle>
        <template #title>Email</template>

        <template #input>
          <CustomInput v-model="email" type="email" rules="email|required" />
        </template>
      </InputWithTitle>

      <DefaultButton button-color-gamma="red" class="reset" @event="reset">
        Reset
      </DefaultButton>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import ForgotPassword from '~/graphql/mutations/forgotPassword.mutation.gql'
import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import CustomInput from '~/components/CustomInput.vue'
export default {
  name: 'PasswordForgot',
  components: { CustomInput, ValidationObserver },
  mixins: [submitMessagesMixin],
  layout: 'login',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async reset() {
      const forgotPasswordInput = {
        email: this.email,
        resetPasswordUrl:
          'https://brock.staging.insanelab.com/login/reset-password?email=__EMAIL__&token=__TOKEN__',
      }
      const formValidated = await this.$refs.form.validate()

      if (formValidated) {
        try {
          const forgotPasswordResult = await this.$apollo.mutate({
            mutation: ForgotPassword,
            variables: forgotPasswordInput,
          })
          console.log(forgotPasswordResult, 'forgotPasswordResult')
        } catch (error) {
          this.showSubmitMessage(error.message, 'error')
          this.$refs.form.setErrors({
            email: error.message,
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.password {
  width: 240px;
}

.reset {
  margin-top: 25px;
}
</style>

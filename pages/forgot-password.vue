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
import CustomInput from '~/components/CustomInput.vue'
export default {
  name: 'PasswordForgot',
  components: { CustomInput, ValidationObserver },
  layout: 'login',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    reset() {
      this.$refs.form.validate()
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

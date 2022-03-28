<template>
  <div class="content">
    <div class="login">
      <ValidationObserver ref="form">
        <InputWithTitle>
          <template #title>Email</template>

          <template #input>
            <CustomInput v-model="email" type="email" rules="email|required" />
          </template>
        </InputWithTitle>

        <InputWithTitle>
          <template #title>Password</template>

          <template #input>
            <CustomInput v-model="password" type="password" rules="required" />
          </template>
        </InputWithTitle>
      </ValidationObserver>

      <span class="text"> FORGOT PASSWORD? </span>

      <DefaultButton button-color-gamma="red" @event="login">
        Sign in
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import InputWithTitle from '~/components/InputWithTitle.vue'
import CustomInput from '~/components/CustomInput.vue'
import DefaultButton from '~/components/DefaultButton.vue'
export default {
  name: 'LoginPage',
  components: {
    InputWithTitle,
    CustomInput,
    DefaultButton,
    ValidationObserver,
  },
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$refs.form.validate()
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.login {
  width: 240px;
  div.container {
    margin-bottom: 16px;
  }
}

.text {
  display: block;
  margin-bottom: 25px;
  color: $brown;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
}
</style>

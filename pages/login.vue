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

      <NuxtLink to="forgot-password">
        <span class="text"> FORGOT PASSWORD? </span>
      </NuxtLink>

      <DefaultButton button-color-gamma="red" @event="login">
        Sign in
      </DefaultButton>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
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
    ...mapActions({
      setRole: 'auth/setRole',
    }),
    login() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.setRole('user')
          this.$router.push('/')
        }
      })
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
  cursor: pointer;
}
</style>

<template>
  <ValidationProvider v-slot="{ errors }" mode="eager" :rules="rules">
    <input
      class="input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="setValue($event.target.value)"
    />
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'CustomInput',
  components: { ValidationProvider },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: String,
      default: '',
    },
  },
  methods: {
    setValue(inputValue) {
      this.$emit('input', inputValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 10px 8px;
  font-size: $font-s;
  line-height: 20px;
  color: #000;
  border: 1px solid gainsboro;
  border-radius: 3px;
  outline: none;

  &:focus {
    border: 1px solid $firebrick;
  }

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
}

.error {
  font-size: 12px;
  color: #f2494e;
}
</style>

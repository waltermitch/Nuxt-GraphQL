<template>
  <ValidationProvider v-slot="{ errors, classes }" mode="eager" :rules="rules">
    <textarea
      name=""
      :value="value"
      class="textarea"
      :class="classes"
      :style="{ width, height }"
      @input="setValue($event.target.value)"
    ></textarea>
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'CustomTextarea',
  components: { ValidationProvider },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '80px',
    },
    rules: {
      type: String,
      default: '',
    },
  },
  methods: {
    setValue(textareaValue) {
      this.$emit('input', textareaValue)
    },
  },
}
</script>

<style lang="scss" scoped>
.textarea {
  background: #fff;
  border: 1px solid $gainsboro;
  border-radius: 3px;
  resize: none;
}

.error {
  font-size: 12px;
  color: $firebrick;
}

.invalid {
  border: 1px solid $firebrick;
}
</style>

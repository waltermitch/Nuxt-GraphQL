<template>
  <input
    class="input"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    @input="setValue($event.target.value)"
  />
</template>

<script>
export default {
  name: 'CustomInput',
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
  max-width: 240px;
  padding: 10px 8px;
  font-size: $font-s;
  line-height: 20px;
  color: #000;
  border: 1px solid gainsboro;
  border-radius: 3px;
  outline: none;
}
</style>

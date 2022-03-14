<template>
  <textarea
    name=""
    class="textarea"
    :style="{ width, height }"
    @input="textareaValue($event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: 'CustomTextarea',
  props: {
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
</style>

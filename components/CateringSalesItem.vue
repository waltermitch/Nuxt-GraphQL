<template>
  <div>
    <CustomInput
      v-model="itemCopy.quantity"
      do-not-show-error-message
      rules="required|numeric"
    />

    <CustomInput
      v-model="itemCopy.menuItem"
      do-not-show-error-message
      rules="required"
    />

    <CustomInput
      v-model="itemCopy.price"
      rules="required|currency"
      do-not-show-error-message
      placeholder="$0.00"
    />

    <CustomInput
      v-model="itemCopy.ext"
      rules="required|currency"
      do-not-show-error-message
      placeholder="$0.00"
    />
  </div>
</template>

<script>
export default {
  name: 'CateringSalesItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      itemCopy: this.item,
    }
  },
}
</script>

<style lang="scss" scoped></style>

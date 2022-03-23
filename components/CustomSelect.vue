<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{
        'selected--opened': open,
      }"
      @click="open = !open"
    >
      <span>
        {{ selected && selected.name }}
      </span>

      <img src="~assets/images/icons/chevron-down.svg" class="icon" />
    </div>

    <div v-show="open" class="options">
      <div
        v-for="(option, i) of options"
        :key="i"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false,
    }
  },
  mounted() {
    this.$emit('input', this.selected)
  },
  methods: {
    selectOption(option) {
      this.selected = option
      this.open = false
      this.$emit('input', option)
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  outline: none;
}

.selected {
  padding: 10px 16px 10px 8px;
  background: #fff;
  cursor: pointer;
  border: 1px solid gainsboro;
  border-radius: 3px;

  &--opened {
    border-radius: 3px 3px 0px 0px;
  }
}

.icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.options {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  color: #fff;
  border-radius: 0px 0px 3px 3px;
  border-right: 1px solid gainsboro;
  border-left: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  overflow: hidden;
}

.option {
  padding: 10px 16px 10px 8px;
  color: #000;
  background: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: $firebrick;
  }
}
</style>

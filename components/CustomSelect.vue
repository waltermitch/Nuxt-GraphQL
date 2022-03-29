<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{
        'selected--opened': open,
        'selected--error': error,
      }"
      @click="toggleSelect"
    >
      <span>
        {{ selected && selected.name }}
      </span>

      <img
        src="~assets/images/icons/chevron-down.svg"
        class="icon"
        :class="{
          'icon--opened': open,
        }"
      />
    </div>

    <div
      v-show="open"
      class="options"
      :class="{
        'options--opened': open,
      }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        class="option"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>

    <span v-if="error" class="error"> The field is required </span>
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
    error: {
      type: Boolean,
      default: false,
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
    toggleSelect() {
      if (this.options.length) {
        this.open = !this.open
      }
    },
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
  height: 40px;
  outline: none;
}

.selected {
  height: 100%;
  padding: 10px 16px 10px 8px;
  background: #fff;
  cursor: pointer;
  border: 1px solid gainsboro;
  border-radius: 3px;

  &--opened {
    border-radius: 3px 3px 0px 0px;
    border-color: $firebrick;
  }

  &--error {
    border-color: $firebrick;
  }

  &:active {
    border-color: $firebrick;
  }
}

.icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);

  &--opened {
    transform: translateY(-50%) rotate(0.5turn);
  }
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

  &--opened {
    border-color: $firebrick;
  }
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

.error {
  font-size: 12px;
  color: $firebrick;
}
</style>

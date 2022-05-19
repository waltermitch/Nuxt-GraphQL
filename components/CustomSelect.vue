<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{
        'selected--opened': open,
        'selected--error': error,
        disabled: disabled,
      }"
      @click="disabled ? null : toggleSelect()"
    >
      <span v-if="disabled"></span>
      <span v-else-if="multiSelect">
        {{ selectedOptions }}
      </span>
      <span v-else>
        {{ selected && selected[selectBy] }}
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
        {{ option[selectBy] }}
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
    selectBy: {
      type: String,
      default: 'name',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: [Object, String],
      default: null,
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    doNotPreselect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.doNotPreselect
        ? null
        : this.selectedItem
        ? this.selectedItem
        : this.options.length > 0
        ? this.options[0]
        : null,
      selectedList: [],
      open: false,
    }
  },
  computed: {
    selectedOptions() {
      return this.selectedList.map((item) => item[this.selectBy]).join(', ')
    },
  },
  watch: {
    options() {
      this.selected = this.options[0]
      if (!this.doNotPreselect) {
        this.$emit('input', this.selected)
      }
    },
    selectedItem: {
      handler(newValue, oldValue) {
        this.selected = newValue
      },
      deep: true,
    },
  },
  mounted() {
    if (!this.doNotPreselect) {
      this.$emit('input', this.selected)
    }
  },
  methods: {
    toggleSelect() {
      if (this.options.length) {
        this.open = !this.open
      }
    },
    selectOption(option) {
      if (this.multiSelect) {
        if (this.selectedList.find((item) => item.id === option.id)) {
          this.selectedList = this.selectedList.filter(
            (item) => item.id !== option.id
          )
        } else {
          this.selectedList.push(option)
        }
      }

      if (
        this.doNotPreselect &&
        this.selected &&
        option.id === this.selected.id
      ) {
        this.selected = null
        this.open = false
        this.$emit('input', option)
        return
      }

      this.selected = option
      if (this.open) {
        this.$emit('input', option)
      }
      this.open = false
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  height: 40px;
  font-size: $font-s;
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
  max-height: 500px;
  color: #fff;
  border-radius: 0px 0px 3px 3px;
  border-right: 1px solid gainsboro;
  border-left: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  overflow: auto;

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

.disabled {
  background: transparent;
  cursor: not-allowed;
}
</style>

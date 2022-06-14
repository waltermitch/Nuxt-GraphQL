<template>
  <div class="custom-select" :tabindex="tabindex">
    <div
      class="selected"
      :class="{
        'selected--opened': open,
        'selected--error': error,
        'selected--above': isAbove,
        disabled: disabled,
      }"
      @click="disabled ? null : toggleSelect()"
    >
      <span v-if="doNotPreselect && !selected && !selectedOptions"
        >Select some</span
      >
      <span v-if="disabled">{{ selected && selected[selectBy] }}</span>
      <span v-else-if="multiSelect">
        {{ selectedOptions }}
      </span>
      <span v-else>
        {{
          selected && selectBySecond
            ? `${selected[selectBySecond]} - ${selected[selectBy]}`
            : selected && selected[selectBy]
        }}
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
        'options--above': isAbove,
      }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        class="option"
        @click="selectOption(option)"
      >
        {{
          selectBySecond
            ? `${option[selectBySecond]} - ${option[selectBy]}`
            : option[selectBy]
        }}
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
    selectBySecond: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectedItem: {
      type: [Object, String],
      default: null,
    },
    selectedItems: {
      type: Array,
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
    localTemp: {
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
      selectedList: this.selectedItems ? this.selectedItems : [],
      open: false,
      isAbove: false,
      parentIsTable: false,
    }
  },
  computed: {
    selectedOptions() {
      return this.selectedList.map((item) => item[this.selectBy]).join(', ')
    },
    tempId: {
      get() {
        return this.$store.getters['customSelect/getTempId']
      },
      set(value) {
        this.$store.commit('customSelect/SET_TEMP_ID', value)
      },
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
  beforeMount() {
    document.addEventListener('click', this.detectClickOutside)
  },
  mounted() {
    if (!this.doNotPreselect) {
      this.$emit('input', this.selected)
    }

    if (this.localTemp) {
      this.tmpId = 'tmp'
    }

    this.adjustPosition()
  },
  destroyed() {
    document.removeEventListener('click', this.detectClickOutside)
    this.open = false
  },
  methods: {
    adjustPosition() {
      if (typeof window === 'undefined') return

      const parentElement = this.$el.parentElement
      const parentElementIsTable = parentElement.className.includes('table-row')
      const spaceAbove = this.$el.getBoundingClientRect().top
      const spaceBelow =
        window.innerHeight - this.$el.getBoundingClientRect().bottom
      const hasEnoughSpaceBelow = spaceBelow > 300

      if (!hasEnoughSpaceBelow && spaceAbove) {
        this.isAbove = true
      } else {
        this.isAbove = false
      }

      if (parentElementIsTable) {
        this.parentIsTable = true
        const rect = this.$el.getBoundingClientRect()
        const scrollToTop = document.documentElement.scrollTop
        const options = this.$el.querySelector('.options')
        const temp = this.localTemp
          ? document.getElementById('temp')
          : document.getElementById(this.tempId)

        if (temp) {
          this.tempId = Math.random().toFixed(2)
          temp.remove()
        }

        options.style.top = this.isAbove
          ? `${rect.top + scrollToTop - 300}px`
          : `${rect.top + 40 + scrollToTop}px`
        options.style.left = `${rect.left}px`
        options.style.width = `${rect.width}px`
        this.localTemp
          ? options.setAttribute('id', 'temp')
          : options.setAttribute('id', this.tempId)
        document.body.appendChild(options)
      }
    },
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
    detectClickOutside(event) {
      if (!(this.$el === event.target || this.$el.contains(event.target))) {
        this.open = false
      }
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

  &--above {
    border-radius: 0px 0px 3px 3px;
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
  max-height: 300px;
  width: 100%;
  color: #fff;
  border-radius: 0px 0px 3px 3px;
  border-right: 1px solid gainsboro;
  border-left: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  overflow: auto;

  &--above {
    bottom: 100%;
    border-top: 1px solid gainsboro;
    border-bottom: none;
    border-radius: 3px 3px 0px 0px;
  }

  &--opened {
    height: fit-content;
    border-color: $firebrick;
  }
}

.option {
  padding: 10px 16px 10px 8px;
  color: #000;
  background: #fff;
  z-index: 2;
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

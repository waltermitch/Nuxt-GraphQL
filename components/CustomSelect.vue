<template>
  <div class="custom-select" :tabindex="tabindex">
    <div
      class="selected"
      :class="{
        'selected--opened': open,
        'selected--error': error,
        'selected--above': isAbove,
        'selected--input': inputSelect,
        disabled: disabled,
      }"
      @click="disabled ? null : toggleSelect()"
    >
      <span v-if="doNotPreselect && !selected && !selectedOptions"
        >-- Select --</span
      >
      <span v-if="disabled">{{ selected && selected[selectBy] }}</span>
      <span v-else-if="multiSelect">
        {{ selectedOptions }}
      </span>
      <input 
        v-else-if="inputSelect"
        v-model="searchValue"
        class="input"
        @keyup.enter="onNext()"
        @input="onChangeInputValue($event.target.value)"
      />
      <span v-else>
        {{
          selected && selectBySecond
            ? selectByGlAccount
            ? `${getNameWithGLAccount(selected)}`
            : `${selected[selectBySecond]} — ${selected[selectBy]}`
            : selected && formatIfDate(selected[selectBy])
        }}
      </span>
      <span v-if="showActivePeriodend" class="right">
        {{
          selected.activePeriod ? `${selected.activePeriod.periodEnd}` : ''
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
        :class="{
          'selectedOption': optionIndex === i
        }"
        @dblclick="selectOption(option,'dbl')"
        @click="selectOption(option)"
      >
        <div v-if="inputSelect">
          {{ `${option[selectBy]}` }}
          <span v-if="selectBySecond" class="right">
            {{
              selectByGlAccount && `${getItemIdWithGLAccount(option)}`
            }}
          </span>
        </div>
        <div v-else>
          {{
            selectBySecond
              ? selectByGlAccount
              ? `${getNameWithGLAccount(option)}`
              : `${option[selectBySecond]} — ${option[selectBy]}`
              : formatIfDate(option[selectBy])
          }}
          <span v-if="showActivePeriodend" class="right">
            {{
              option.activePeriod ? `${option.activePeriod.periodEnd}` : ''
            }}
          </span>
        </div>
      </div>
    </div>

    <span v-if="error" class="error"> The field is required </span>
  </div>
</template>

<script>
import { glAccountMixin } from '~/mixins/glAccountMixin'
export default {
  name: 'CustomSelect',
  mixins: [ glAccountMixin ],
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
    selectByGlAccount: {
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
    inputSelect: {
      type: Boolean,
      default: false,
    },
    doNotPreselect: {
      type: Boolean,
      default: false,
    },
    showActivePeriodend: {
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
      selectedList: this.selectedItems ? [...this.selectedItems] : [],
      open: false,
      isAbove: false,
      parentIsTable: false,
      optionIndex: 0,
      searchValue: '',
      isNonSearchResult: true,
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
    open() {
      this.adjustPosition()
      if(this.open && this.selected && !this.inputSelect) {
        this.options.forEach((item, index) => {
          if(item.id === this.selected.id) {
            this.optionIndex = index
            this.scrollToPosition(index)
          }
        });
      }
    },
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
    window.addEventListener("resize", this.detectWindowSize);
    document.addEventListener('click', this.detectClickOutside)
  },
  mounted() {
    if (!this.doNotPreselect) {
      this.$emit('input', this.selected)
    }
    
    this.adjustOptions()
  },
  destroyed() {
    window.removeEventListener("resize", this.detectWindowSize);
    document.removeEventListener('click', this.detectClickOutside)
    this.open = false
  },
  methods: {
    formatIfDate(data){
      if(this.testDate(data)){
        const tempDate = new Date(data);
        const formatedDate = [(tempDate.getMonth() + 1).toString().padStart(2,'0'), (tempDate.getDate()).toString().padStart(2,'0'), tempDate.getFullYear()].join('-');
        return formatedDate;
      }else {
        return data;
      }
    },
    testDate(value){
      const regex = /^\d{4}-\d{2}-\d{2}$/;

      if (value.match(regex) === null) {
        return false;
      }

      const date = new Date(value);

      const timestamp = date.getTime();

      if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
      }

      return date.toISOString().startsWith(value);
    },
    onChangeInputValue(value) {
      this.open = true
      this.optionIndex = 0
      this.isNonSearchResult = true
      this.onSearchOption(value)
    },
    onNext() {
      this.optionIndex ++
      this.onSearchOption(this.searchValue)
    },
    onSearchOption(value) {
      if(value === '') return
      if(this.optionIndex >= this.options.length) this.optionIndex = 0

      for(; this.optionIndex < this.options.length; this.optionIndex ++) {  
        const option = this.options[this.optionIndex]
        const code = this.selectByGlAccount && `${this.getItemIdWithGLAccount(option)}`
        if(code.includes(value)) {
          this.isNonSearchResult = false
          this.scrollToPosition(this.optionIndex)
          this.$emit('input', option)
          return
        }
        if((this.optionIndex + 1) === this.options.length && !this.isNonSearchResult) this.optionIndex = 0
      }
    },
    scrollToPosition(itemCount) {
      const optionHeight = 37
      let selector = this.$el.querySelector('.options')
      if(!selector) selector = document.querySelector('.options')
      selector.scrollTop = optionHeight * itemCount
    },
    adjustOptions() {
      if (typeof window === 'undefined') return

      const parentElement = this.$el.parentElement
      const parentElementIsTable = parentElement.className.includes('table-row')

      if (parentElementIsTable) {
        this.parentIsTable = true
        const options = this.$el.querySelector('.options')
        const temp = this.localTemp
          ? document.getElementById('temp')
          : document.getElementById(this.tempId)

        if (temp) {
          if(!this.localTemp) {
            this.tempId = Math.random().toFixed(2)
          }
          temp.remove()
        }
        
        this.localTemp
          ? options.setAttribute('id', 'temp')
          : options.setAttribute('id', this.tempId)
        document.body.appendChild(options)
      }
    },
    adjustPosition() {
      if(!(this.open && this.parentIsTable)) return

      const options = this.localTemp
          ? document.getElementById('temp')
          : document.getElementById(this.tempId)

      const optionHeight = 37
      const selectedOptionHeight = 40
      const openOptionsCountLimit = 8
      const openOptionsHeightLimit = 298
      const openOptionsHeight = this.options.length > openOptionsCountLimit ? openOptionsHeightLimit : optionHeight * this.options.length

      const spaceAbove = this.$el.getBoundingClientRect().top
      const spaceBelow =
        document.documentElement.clientHeight - this.$el.getBoundingClientRect().bottom
      const hasEnoughSpaceBelow = spaceBelow > openOptionsHeight

      if (!hasEnoughSpaceBelow && spaceAbove) {
        this.isAbove = true
      } else {
        this.isAbove = false
      }
        
      const rect = this.$el.getBoundingClientRect()
      const scrollToTop = document.documentElement.scrollTop
      const scrollToLeft = document.documentElement.scrollLeft
      
      options.style.position = `absolute`
      if(this.isAbove) {
        options.style.top = `auto`
        options.style.bottom = `${spaceBelow + selectedOptionHeight - scrollToTop - 1}px`
      } else {
        options.style.top = `${spaceAbove + selectedOptionHeight + scrollToTop}px`
        options.style.bottom = `auto`
      }
      options.style.left = `${rect.left + scrollToLeft}px`
      options.style.width = `${rect.width}px`
    },
    toggleSelect() {
      if (this.options.length) {
        this.open = this.inputSelect ? true : !this.open
      }
    },
    selectOption(option, isDbClick) {
      if (this.multiSelect) {
        if (this.selectedList.find((item) => item.id === option.id)) {
          this.selectedList = this.selectedList.filter((item) => item.id !== option.id)
        } else {
          this.selectedList.push(option)
        }
      }

      if(this.inputSelect) {
        this.searchValue = this.selectBySecond
          ? this.selectByGlAccount
          ? `${this.getNameWithGLAccount(option)}`
          : `${option[this.selectBySecond]} — ${option[this.selectBy]}`
          : `${option[this.selectBy]}`

        if (isDbClick) {
          this.open = false
        }
        this.options.forEach((item, key) => {
          if(item[this.selectBySecond] === option[this.selectBySecond]) {
            this.optionIndex = key
          }
        });
        this.$emit('input', option)
        return
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
    detectWindowSize() {
      this.adjustPosition()
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 10px 36px 10px 8px;
  background: #fff;
  cursor: pointer;
  border: 1px solid gainsboro;
  border-radius: 3px;
  font-size: 14px;

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

  &--input {
    padding: 0px 36px 0px 0px;
  }

  &:active {
    border-color: $firebrick;
  }
}

.selectedOption {
  color: #fff !important;
  background-color: $firebrick !important;
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
  position: relative;
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
    // border-bottom: none;
    border-radius: 3px 3px 0px 0px;
  }

  &--opened {
    height: fit-content;
    border-color: $firebrick;
  }
}

.option {
  padding: 10px 16px 10px 8px;
  width: auto;
  color: #000;
  background: #fff;
  z-index: 2;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: $firebrick;
  }
  
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.input {
  width: 100%;
  height: 100%;
  padding: 5px 10px 5px 8px;
  
  &:focus {
    outline: none !important;
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

.right {
  float: right;
  width: auto;
  // min-width: 4.2rem;
  margin-left: 3rem;
  font-size: 16px;
  font-weight: 800;
}
</style>

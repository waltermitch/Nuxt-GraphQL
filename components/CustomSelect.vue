<template>
  <div class="select-container">
    <div class="input-container">
      <div @click="openList()">
        <CustomInput v-model="searchString" />
      </div>
      <span v-if="!searchString" class="selected-item">
        {{ selectedValue.name }}
      </span>

      <img
        src="~assets/images/icons/chevron-down.svg"
        class="icon"
        @click="toggleList"
      />
    </div>

    <div v-show="showList" class="list-container">
      <ul class="list">
        <li
          v-for="item in filteredList"
          :key="item.id"
          class="list-item"
          @click.stop="selectItem(item)"
        >
          <span
            :class="{
              selected: item.selected,
            }"
          >
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CustomInput from './CustomInput.vue'
export default {
  name: 'CustomSelect',
  components: { CustomInput },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchString: '',
      selectedValue: '',
      showList: false,
    }
  },
  computed: {
    filteredList() {
      return [...this.list].filter((item) => {
        return item.name.toLowerCase().includes(this.searchString.toLowerCase())
      })
    },
  },
  beforeMount() {
    document.addEventListener('click', this.detectClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.detectClickOutside)
  },
  methods: {
    selectItem(item) {
      this.searchString = ''
      this.selectedValue = item
      this.$emit('select-item', {
        ...item,
        selected: true,
      })
    },
    openList() {
      this.showList = true
    },
    closeList() {
      if (this.showList) {
        this.showList = false
      }
    },
    toggleList() {
      this.showList = !this.showList
    },
    detectClickOutside(event) {
      if (!(this.$el === event.target || this.$el.contains(event.target))) {
        this.closeList()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.select-container {
  position: relative;
}

.input-container {
  position: relative;
  cursor: pointer;
}

.icon {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
}

.list-container {
  position: absolute;
  z-index: 1;
  margin-top: 15px;
  width: 100%;
  max-width: 240px;
  max-height: 150px;
  overflow: auto;
  background: #fff;
  border: 1px solid gainsboro;
  border-radius: 3px;
}

.list {
  padding: 10px 20px;

  &-item {
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
}

.selected-item {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.selected {
  background: $firebrick;
  border-radius: 16px;
  height: 32px;
  padding: 5px 10px;
}
</style>

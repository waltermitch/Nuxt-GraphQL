<template>
  <ValidationProvider
    v-slot="{ errors, classes }"
    mode="eager"
    :rules="rules"
    :name="name"
  >
    <span>
      <date-picker
        v-model="dateValue"
        value-type="format"
        :class="classes"
        :value="value"
        :type="type"
        :format="(type == 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm')"
        @change="$emit('change', dateValue)"
        @keyup.enter="$emit('event')"
        ></date-picker>
    </span>
    <span v-if="!doNotShowErrorMessage" class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'CustomInput',
  components: { ValidationProvider, DatePicker },
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: '',
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
    rules: {
      type: [String, Object],
      default: '',
    },
    vid: {
      type: String,
      default: '',
    },
    doNotShowErrorMessage: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'date',
    }
  },
  data() {
    return {
      dateValue: null,
    }
  },
  methods: {
    setValue(inputValue) {
      this.$emit('input', inputValue)
    }
  },
}
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  padding: 10px 8px;
  font-size: $font-s;
  line-height: 20px;
  color: #000;
  border: 1px solid gainsboro;
  border-radius: 3px;
  outline: none;

  &:focus {
    border: 1px solid $firebrick;
  }

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }
}

.error {
  font-size: 12px;
  color: $firebrick;
}

.invalid {
  border: 1px solid $firebrick;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.mx-datepicker {
  width: 100%;
}

</style>

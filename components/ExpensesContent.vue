<template>
  <div class="content">
    <PageSubHeaderContent />

    <PageContentWrapper>
      <ValidationObserver ref="form">
        <InputRow class="input-row-mob">
          <InputWithTitle>
            <template #title>Expense Date</template>

            <template #input>
              <CustomInput
                v-model="expensesDate"
                placeholder="mm/dd/yyyy"
                rules="required|date"
              />
            </template>
          </InputWithTitle>

          <InputWithTitle class="radio-buttons-row">
            <template #title>Expense Type</template>

            <template #input>
              <div class="radio-buttons-area">
                <CustomRadioButton
                  with-title
                  border-radius="50%"
                  radio-border-radius="50%"
                  :is-active="expensesType === 'transfer slip'"
                  @set-is-active="setExpensesType('transfer slip')"
                >
                  Transfer Slip
                </CustomRadioButton>

                <CustomRadioButton
                  with-title
                  border-radius="50%"
                  radio-border-radius="50%"
                  :is-active="expensesType === 'shipping ticket'"
                  @set-is-active="setExpensesType('shipping ticket')"
                >
                  Shipping Ticket
                </CustomRadioButton>

                <CustomRadioButton
                  with-title
                  border-radius="50%"
                  radio-border-radius="50%"
                  :is-active="expensesType === 'other'"
                  @set-is-active="setExpensesType('other')"
                >
                  Other
                </CustomRadioButton>
              </div>
            </template>
          </InputWithTitle>
        </InputRow>

        <InputRow>
          <InputWithTitle>
            <template #title>GL Account</template>

            <template #input>
              <CustomSelect
                :options="mockedList"
                :error="selectError"
                @input="selectGlAccount"
              />
            </template>
          </InputWithTitle>
        </InputRow>

        <InputRow>
          <InputWithTitle>
            <template #title>Amount</template>

            <template #input>
              <CustomInput
                v-model="amount"
                placeholder="$0.00"
                rules="required|double|currency"
              />
            </template>
          </InputWithTitle>
        </InputRow>

        <InputRow>
          <InputWithTitle>
            <template #title>Comments</template>

            <template #input>
              <CustomTextarea
                v-model="comments"
                name="comments"
                rules="required"
              />
            </template>
          </InputWithTitle>
        </InputRow>
      </ValidationObserver>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="red" @event="acceptEvent">
          Accept
        </DefaultButton>

        <DefaultButton button-color-gamma="white" @event="cancelEvent">
          Cancel
        </DefaultButton>
      </div>
    </PageContentWrapper>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { formMixin } from '../mixins/formMixin'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
import CustomRadioButton from './CustomRadioButton.vue'
import CustomSelect from './CustomSelect.vue'
import CustomTextarea from './CustomTextarea.vue'
import DefaultButton from './DefaultButton.vue'
import PageSubHeaderContent from './PageSubHeaderContent.vue'
export default {
  name: 'ExpensesContent',
  components: {
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomInput,
    CustomRadioButton,
    CustomSelect,
    CustomTextarea,
    DefaultButton,
    ValidationObserver,
    PageSubHeaderContent,
  },
  mixins: [formMixin],
  data() {
    return {
      expensesDate: '',
      expensesType: '',
      glAccount: '',
      amount: '',
      comments: '',
      selectError: false,
      // TODO remove when API would be available
      mockedList: [
        {
          id: 1,
          name: 'Register #2',
        },
        {
          id: 2,
          name: 'Register #3',
        },
      ],
    }
  },
  methods: {
    setExpensesType(expensesType) {
      this.expensesType = this.expensesType === expensesType ? '' : expensesType
    },
    acceptEvent() {
      if (!this.glAccount) {
        this.selectError = true
      }

      this.saveEvent()
    },
    selectGlAccount(account) {
      this.glAccount = account
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  div.subheader {
    justify-content: flex-start;
    overflow: auto;
    div {
      @media screen and (min-width: $lg) {
        margin-right: 120px;
      }
      @media screen and (max-width: $lg) {
        margin-right: 30px;
      }
    }
  }
}

.radio-buttons {
  &-row {
    position: relative;
  }

  &-area {
    @media screen and (min-width: $xs) {
      position: absolute;
      top: 30px;
    }
    div.container {
      margin-bottom: 18px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.input-row-mob{
  @media screen and (max-width: $xs) {
   display: block;
  }
  .container{
    &:first-child{
      @media screen and (max-width: $xs) {
        margin-bottom: 16px;
      }
    }
  }
}

.buttons-area {
  display: flex;
  margin-top: 30px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>

<template>
  <div class="content">
    <PageSubHeaderContent />

    <PageContentWrapper>
      <ValidationObserver ref="form">
        <InputRow>
          <InputWithTitle>
            <template #title> Amount </template>

            <template #input>
              <CustomInput
                v-model.number="amount"
                type="number"
                placeholder="0.00"
                rules="required|currency"
                symbol="$"
              />
            </template>
          </InputWithTitle>

          <InputWithTitle>
            <template #title> Name/Comment </template>

            <template #input>
              <CustomInput v-model="nameComment" rules="required" />
            </template>
          </InputWithTitle>
        </InputRow>
      </ValidationObserver>

      <div class="buttons-area">
        <DefaultButton button-color-gamma="red" @event="saveEvent">
          Save
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
import PageSubHeaderContent from './PageSubHeaderContent.vue'
export default {
  name: 'OnCallLaborContent',
  components: {
    ValidationObserver,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomInput,
    PageSubHeaderContent,
  },
  mixins: [formMixin],
  data() {
    return {
      amount: '',
      nameComment: '',
    }
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

.buttons-area {
  display: flex;
  margin-top: 50px;

  button:first-child {
    margin-right: 11px;
  }
}
</style>

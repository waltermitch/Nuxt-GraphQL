<template>
  <div class="content">
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>
    </PageSubheader>

    <PageContentWrapper>
      <ValidationObserver ref="form">
        <InputRow>
          <InputWithTitle>
            <template #title> Amount </template>

            <template #input>
              <CustomInput
                v-model="amount"
                placeholder="$0.00"
                rules="required|currency"
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
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import InputRow from './InputRow.vue'
import InputWithTitle from './InputWithTitle.vue'
import CustomInput from './CustomInput.vue'
export default {
  name: 'OnCallLaborContent',
  components: {
    ValidationObserver,
    PageSubheader,
    PageSubheaderItem,
    PageContentWrapper,
    InputRow,
    InputWithTitle,
    CustomInput,
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

    div {
      margin-right: 120px;
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

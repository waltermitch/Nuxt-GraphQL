<template>
  <div>
    <PageSubheader>
      <PageSubheaderItem>
        <template #title>398</template>

        <template #subtitle>Unit Number</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>09/21/2019</template>

        <template #subtitle>Period End</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>Reg#2</template>

        <template #subtitle>Register Name</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>Register#2</template>

        <template #subtitle>Register Name</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>$0.00</template>

        <template #subtitle>Total Daily Deposit</template>
      </PageSubheaderItem>

      <PageSubheaderItem>
        <template #title>11/11/2021</template>

        <template #subtitle>Close Date</template>
      </PageSubheaderItem>
    </PageSubheader>

    <PageContentWrapper>
      <div class="content">
        <div class="inputs-block">
          <h2 class="title">Select Register To Close</h2>

          <InputRow>
            <InputWithTitle>
              <template #title>Register ID</template>

              <template #input>
                <CustomInput v-model="registerId" />
              </template>
            </InputWithTitle>

            <InputWithTitle>
              <template #title>Register Name</template>

              <template #input>
                <CustomSelect
                  :options="mockedList"
                  @input="selectRegisterName"
                />
              </template>
            </InputWithTitle>
          </InputRow>

          <TabsView :tabs-headers="tabsHeaders" :tabs="tabs"></TabsView>
        </div>
        <!-- TODO get real data whe API available -->
        <div class="total">
          <div class="total-section">
            <div class="total-row">
              <h5 class="total-caption">Total Net Sales</h5>

              <span class="total-amount">$0.00</span>
            </div>

            <div class="total-row">
              <h5 class="total-caption">- Charge</h5>

              <span class="total-amount">$0.00</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="total-section">
            <div class="total-row">
              <h5 class="total-caption">Cash Total</h5>

              <span class="total-amount">$0.00</span>
            </div>

            <div class="total-row">
              <h5 class="total-caption">+ Cash Tax</h5>

              <span class="total-amount">$0.00</span>
            </div>

            <div class="total-row">
              <h5 class="total-caption">- Petty Cash</h5>

              <span class="total-amount">$0.00</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="total-section">
            <div class="total-row">
              <h5 class="total-caption">Calced Deposit</h5>

              <span class="total-amount">$0.00</span>
            </div>

            <div class="total-row">
              <h5 class="total-caption">Actual Deposit</h5>

              <span class="total-amount">$0.00</span>
            </div>
          </div>

          <div class="divider"></div>

          <div class="total-section">
            <div class="total-row">
              <h5 class="total-caption">Over/Short</h5>

              <span class="total-amount">$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </PageContentWrapper>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PageSubheader from './PageSubheader.vue'
import PageSubheaderItem from './PageSubheaderItem.vue'
import CustomInput from './CustomInput.vue'
import InputWithTitle from './InputWithTitle.vue'
import InputRow from './InputRow.vue'
import CustomSelect from './CustomSelect.vue'
import TabsView from './TabsView.vue'
import SalesInfo from './SalesInfo.vue'
import ClosRegisterPettyCash from './CloseRegisterPettyCash.vue'
import FinishCloseout from './FinishCloseout.vue'
import PageContentWrapper from './PageContentWrapper.vue'
import CloseRegisterFinishCloseout from './CloseRegisterFinishCloseout'
export default {
  name: 'CloseRegisterContent',
  components: {
    PageSubheader,
    PageSubheaderItem,
    CustomInput,
    InputWithTitle,
    InputRow,
    CustomSelect,
    TabsView,
    SalesInfo,
    ClosRegisterPettyCash,
    FinishCloseout,
    PageContentWrapper,
  },
  data() {
    return {
      tabsHeaders: ['Sales Info', 'Petty Cash', 'Finish Closeout'],
      tabs: [SalesInfo, ClosRegisterPettyCash, CloseRegisterFinishCloseout],
      registerId: null,
      registerName: '',
      mockedList: [
        {
          id: 1,
          value: 'register#2',
          name: 'Register #2',
        },
        {
          id: 2,
          value: 'register#3',
          name: 'Register #3',
        },
      ],
    }
  },
  methods: {
    selectRegisterName(item) {
      this.registerName = item
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.inputs-block {
  width: 100%;
}

.title {
  margin-bottom: 18px;
  font-size: $font-xl;
  font-weight: 500;
}

.total {
  width: 100%;
  max-width: 330px;
  margin-left: 50px;
  padding-top: 18px;

  &-section {
    padding-left: 34px;
    padding-right: 54px;

    div:first-child {
      margin-top: 0;
    }
  }

  &-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }

  &-caption {
    font-size: $font-md;
    line-height: 24px;
  }
}

.divider {
  width: 100%;
  margin: 10px 0;
  border-bottom: 2px solid $white-smoke;
}
</style>

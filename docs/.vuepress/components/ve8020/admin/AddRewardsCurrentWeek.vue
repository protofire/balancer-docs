<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../../providers/network';
import { useController } from '../../../utils/RewardsDistributionController';
import { useVeSystem } from '../../../providers/veSystem';
import { ethers, toBigInt } from 'ethers';

const { walletProvider } = useWeb3ModalProvider();
const { selected: veSystem } = useVeSystem();
const { network } = useNetwork();
const { tokenAllowance, approveToken } = useController({
  walletProvider,
  network,
  veSystem,
});

const token = ref<string>('');
const inputAmount = ref<string>('');
const allowance = ref<bigint>(toBigInt(0));
const isLoading = ref<boolean>(false);

const amount = computed<bigint>(() => {
  if (inputAmount.value === '') return toBigInt(0);

  return ethers.parseEther(inputAmount.value.toString());
});

const isAllowanceEnough = computed<boolean>(
  () => allowance.value > amount.value
);

const showApprove = computed<boolean>(
  () =>
    inputAmount.value !== '' && token.value !== '' && !isAllowanceEnough.value
);

watch(token, async value => {
  if (value === '') return;

  const tokenAllowanceResult = await tokenAllowance.value?.(value);

  allowance.value = tokenAllowanceResult || toBigInt(0);
});

watch(amount, value => console.log('amount: ', value));

const handleSubmit = () => {
  console.log('submit');
};

const clearForm = () => {
  inputAmount.value = '';
  token.value = '';
};

const handleApprove = async () => {
  await approveToken.value?.(
    { token: token.value, amount: amount.value },
    {
      onPrompt: () => {
        console.log('prompt');
        isLoading.value = true;
      },
      onSubmitted: ({ tx }) => {
        console.log('submitted', tx);
      },
      onSuccess: ({ receipt }) => {
        console.log('success', receipt);
        isLoading.value = false;
        clearForm();
      },
      onError: err => {
        console.log('err', err);
        isLoading.value = false;
        clearForm();
      },
    }
  );
};
</script>

<template>
  <div key="currentWeek" class="item-row">
    <p class="item-name">Add Rewards into Current Week</p>
    <div class="item-action">
      <div class="input-group current-week">
        <input
          v-model="token"
          placeholder="Token address (0xab...)"
          type="text"
          class="input"
        />
      </div>
      <input
        v-model="inputAmount"
        placeholder="Amount"
        type="number"
        class="input-amount"
      />
      <button
        v-show="!showApprove"
        class="submit-button"
        :disabled="token === '' || inputAmount === '' || isLoading"
        @click="handleSubmit()"
      >
        Add
      </button>
      <button
        v-show="showApprove"
        class="submit-button"
        :disabled="isLoading"
        @click="handleApprove()"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.section-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  margin-top: 16px;
}
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 700px;
  height: 45px;
  gap: 10px;
}

.item-row .item-name {
  width: 40%;
  max-width: 350px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.item-row .item-action {
  display: flex;
  width: 60%;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.item-row .input-group {
  height: 100%;
  width: calc(100% - 70px);
}

.item-row .input-group.current-week {
  width: calc(100% - 150px);
}

.item-row .input-group.n-week {
  width: calc(100% - 200px);
}

.item-row .input-group.calendar-group {
  width: calc(100% - 260px);
}

.item-row .input-group.weeks-container {
  width: 50px;
  position: relative;
}

.item-row .input-group.calendar-container {
  width: 110px;
  position: relative;
}

.item-row .input-group .input,
.item-row .item-action .input-amount {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  position: relative;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding-inline: 20px;
  font-size: 14px;
  outline: none;
  display: flex;
  align-items: center;
}

.item-row .input-group.weeks-container .title-input,
.item-row .input-group.calendar-container .title-input {
  position: absolute;
  font-size: 11px;
  margin: 0;
  top: 1px;
}

.item-row .input-group.weeks-container .title-input {
  left: 9px;
}

.item-row .input-group.calendar-container .title-input {
  left: 5px;
}

.item-row .item-action .input-amount {
  width: 70px;
  padding-inline: 10px;
}

.item-row .item-action .input-group.weeks-container .input {
  width: 50px;
  padding-inline: 10px;
  padding-top: 10px;
}

.item-row .item-action .input-group.calendar-container .input {
  width: 110px;
  padding-inline: 10px;
  padding-top: 10px;
}
.dark .item-row .input-group .input,
.dark .item-row .item-action .input-amount {
  border: 1px solid #3e4c5a;
}

.item-row .input-group .input:focus,
.dark .item-row .item-action .input-amount:focus {
  border: 1px solid #384aff;
}

.submit-button,
.available-button {
  width: 60px;
  height: 45px;
  background-color: #eaf0f6;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;
  box-shadow: none;
  border: none;
}
.btn-group {
  margin-top: 30px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  max-width: 700px;
  height: 45px;
}
.available-button {
  width: 180px;
}

.dark .submit-button,
.dark .available-button {
  background-color: #384aff;
}
.submit-button:disabled,
.available-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>

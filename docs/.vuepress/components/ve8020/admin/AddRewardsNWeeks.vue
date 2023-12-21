<script setup lang="ts">
import { ref } from 'vue';

const token = ref<string>('');
const amount = ref<string>('');
const weeks = ref<string>('');
</script>

<template>
  <div key="nWeek" class="item-row">
    <p class="item-name">Add Rewards into N Weeks</p>
    <div class="item-action">
      <div class="input-group n-week">
        <input
          v-model="token"
          placeholder="Token address (0xab...)"
          type="text"
          class="input"
        />
      </div>
      <input
        v-model="amount"
        placeholder="Amount"
        type="number"
        class="input-amount"
      />
      <div class="input-group weeks-container">
        <p class="title-input">weeks</p>
        <input v-model="weeks" placeholder="10" type="number" class="input" />
      </div>
      <button class="submit-button">Add</button>
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

.item-row .input-group.n-week {
  width: calc(100% - 200px);
}

.item-row .input-group.weeks-container {
  width: 50px;
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

.item-row .input-group.weeks-container .title-input {
  position: absolute;
  font-size: 11px;
  margin: 0;
  top: 1px;
}

.item-row .input-group.weeks-container .title-input {
  left: 9px;
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

.dark .item-row .input-group .input,
.dark .item-row .item-action .input-amount {
  border: 1px solid #3e4c5a;
}

.item-row .input-group .input:focus,
.dark .item-row .item-action .input-amount:focus {
  border: 1px solid #384aff;
}

.submit-button {
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

.dark .submit-button {
  background-color: #384aff;
}
.submit-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>

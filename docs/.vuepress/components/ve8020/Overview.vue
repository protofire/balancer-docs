<script setup lang="ts">
import { ethers } from 'ethers';
import { useVeSystem } from '../../providers/veSystem';
import TokenCard from './TokenCard.vue';
import { onBeforeMount, ref } from 'vue';
const { data: veSystems, fetch, updateByTokenAddress } = useVeSystem();

const searchTerm = ref<string>('');

onBeforeMount(() => {
  fetch();
});

const handleSearch = () => {
  if (searchTerm.value !== '') {
    updateByTokenAddress(searchTerm.value);
  } else {
    fetch();
  }
};
</script>

<template>
  <section class="section-container">
    <section class="section-head">
      <div class="address-group">
        <p class="text">veToken Adddress/name</p>
        <div class="input-group">
          <svg width="16" height="16" class="icon">
            <use href="/images/search.svg#icon"></use>
          </svg>
          <input v-model="searchTerm" class="input" placeholder="Search" />
        </div>
      </div>
      <button
        class="search-btn btn"
        @click="handleSearch"
      >
        Search veSystem
      </button>
    </section>
    <section class="section-body">
      <TokenCard
        v-for="token in veSystems"
        :key="token.id"
        :name="token.id"
        :vestedToken="token.bptTokenName"
        :totalValueVested="ethers.formatEther(token.votingEscrow.lockedAmount)"
        :availableTokensForRewards="token.rewardDistributor.rewardNames || []"
      />
    </section>
  </section>
</template>

<style scoped>
.section-container {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.section-head {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dark .section-head {
  border-bottom: 1px solid #3e4c5a;
}

.section-head .address-group {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 30px;
}

.section-head .address-group .icon {
  position: absolute;
  top: 7px;
  left: 10px;
  fill: #eaf0f6;
}

.dark .section-head .address-group .icon {
  fill: #3e4c5a;
}

.section-head .address-group .input-group {
  height: 100%;
  position: relative;
}

.section-head .address-group .input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  max-width: 340px;
  padding-left: 30px;
  font-size: 14px;
  outline: none;
}

.dark .section-head .address-group .input {
  border: 1px solid #3e4c5a;
}

.section-body {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 800px;
  overflow: auto;
}
</style>

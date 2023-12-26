<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useVeSystem } from '../../../providers/veSystem';
import { useTabs, Tab } from '../../../providers/tabs';
import { ethers } from 'ethers';
import TokenCard from '../TokenCard.vue';

const { data: veSystems, fetch, select, isLoading } = useVeSystem();
const { select: selectTab } = useTabs();

onBeforeMount(() => {
  fetch();
});

const showConfig = async (id: string) => {
  await select(id);
  selectTab(Tab.VE_SYSTEM_CONFIG);
};

const showRewards = async (id: string) => {
  await select(id);
  selectTab(Tab.REWARDS_DISTRIBUTION);
};
</script>

<template>
  <section class="section-container">
    <div class="card-container">
      <p>{{ isLoading ? 'loading' : '' }}</p>
      <div v-for="veSystem in veSystems" :key="veSystem.id">
        <TokenCard
          :name="veSystem.id"
          :vestedToken="veSystem.bptTokenName"
          :totalValueVested="
            ethers.formatEther(veSystem.votingEscrow.lockedAmount)
          "
          :availableTokensForRewards="
            veSystem.rewardDistributor.rewardNames || []
          "
        />
        <button @click="showConfig(veSystem.id)">Config</button>
        |
        <button @click="showRewards(veSystem.id)">Rewards Distribution</button>
      </div>
    </div>
  </section>
</template>
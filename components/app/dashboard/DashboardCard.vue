<script setup lang="ts">
import Card from '~/components/ui/card/Card.vue';
import DashboardCardSetup, { type DashboardCardSetupEmits, type DashboardCardSetupProps } from './DashboardCard.setup';
const props = defineProps<DashboardCardSetupProps>();
const emits = defineEmits<DashboardCardSetupEmits>();
const setup = new DashboardCardSetup(props, emits);

</script>



<template>
  <Card>
    <div class="dashboard-card">
      <NuxtImg src="flame.png"/>
      <p class="dashboard-card__title">+{{ setup.finishedQuestTodayService.totalXp }} xp</p>
        <ul class="dashboard-card__section">
          <li class="dashboard-card__item" v-for="quest in setup.finishedQuestTodayService.finishedQuestsSortedByDomain" :key="quest.domain">
            <div class="dashboard-card__item-content">
              <span class="dashboard-card__item-circle"/>
              <p class="dashboard-card__item-text"> {{ quest.domain }}</p>
            </div>
            <p class="dashboard-card__item-xp">+{{ quest.xp }} xp</p>
          </li>
        </ul>
    </div>
  </Card>
</template>
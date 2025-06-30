<script lang="ts" setup>
import { UserTagSetup, type UserTagProps } from './UserTag.setup';
const props = defineProps<UserTagProps>();
const setup = new UserTagSetup(props);
</script>

<template>
  <div class="user-tag">
    <img :src="setup.user.avatarUrl" alt="" class="user-tag__avatar">
    <div class="user-tag__content">
      <p class="user-tag__pseudo">{{ setup.user.pseudo }}</p>
      <p class="user-tag__rank">Player Rank {{ setup.user.rank }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import LoginSetup from './Login.setup';
const props = defineProps(LoginSetup.props);
const setup = new LoginSetup(props);
</script>

<template>
  <div class="gap gap--page">
    <Input type="email" label="Ton e-mail" placeholder="john-doe@mail.com" v-model="setup.email.value"/>
    <Input type="password" label="Ton mot de passe" placeholder="123456" v-model="setup.password.value"/>
    <Button label="Se connecter" @click="setup.login()"/>
      {{ setup.self.auth }}
  </div>
</template>
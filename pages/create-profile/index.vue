<template>
  <CreateProfileLayout
    :show-footer="currentComponent !== 'create-profile-introduce'"
    :go-back="goBack"
    :go-next="goNext"
    :profile="profile"
    :current-component="currentComponent"
  >
    <component :is="currentComponent" />
    <create-profile-introduce v-if="currentComponent === 'create-profile-introduce'" :go-next="goNext" />
    <create-profile-title v-if="currentComponent === 'create-profile-title'" />
    <create-profile-employment v-if="currentComponent === 'create-profile-employment'" />
    <create-profile-education v-if="currentComponent === 'create-profile-education'" />
    <create-profile-languages v-if="currentComponent === 'create-profile-languages'" />
    <create-profile-skills v-if="currentComponent === 'create-profile-skills'" />
    <create-profile-overview v-if="currentComponent === 'create-profile-overview'" />
    <create-profile-categories v-if="currentComponent === 'create-profile-categories'" />
    <create-profile-rate v-if="currentComponent === 'create-profile-rate'" />
    <create-profile-location v-if="currentComponent === 'create-profile-location'" />
  </CreateProfileLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateProfileLayout from '~/layouts/CreateProfileLayout.vue'

definePageMeta({
  title: 'Create Profile',
  description: 'Create Profile',
  image: 'https://i.imgur.com/3tC7WYh.png',
  // middleware: 'auth',
  layout: 'auth'
})

const profile: string[] = [
  'create-profile-introduce',
  'create-profile-title',
  'create-profile-employment',
  'create-profile-education',
  'create-profile-languages',
  'create-profile-skills',
  'create-profile-overview',
  'create-profile-categories',
  'create-profile-rate',
  'create-profile-location'
]

const currentComponent: Ref<string> = ref(profile[0])

const goBack = () => {
  const currentIndex = profile.indexOf(currentComponent.value)
  if (currentIndex > 0) {
    currentComponent.value = profile[currentIndex - 1]
  }
}

const goNext = () => {
  const currentIndex = profile.indexOf(currentComponent.value)
  if (currentIndex < profile.length - 1) {
    currentComponent.value = profile[currentIndex + 1]
  }
}
</script>

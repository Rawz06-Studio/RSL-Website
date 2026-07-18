<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const version = runtimeConfig.public.version;
</script>

<template>
  <UHeader>
    <template #title>
      <span>RSL Beginner Website</span>
    </template>

    <template #right>
      <UColorModeButton class="cursor-pointer" />
    </template>
  </UHeader>

  <UMain>
    <UContainer
      :ui="{
        root: 'min-h-[calc(100vh-2*var(--header-height))]',
      }"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
      </NuxtLayout>
    </UContainer>
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-neutral-500 dark:text-neutral-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} RawZ06 -
        <NuxtLink
          class="hover:underline"
          to="https://github.com/nuxt/nuxt/blob/main/LICENSE"
          target="_blank"
        >
          MIT License
        </NuxtLink>
        - v{{ version }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://discord.gg/QXvJAXdVTv"
        target="_blank"
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://github.com/RawZ06"
        target="_blank"
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
  <UToaster />
</template>

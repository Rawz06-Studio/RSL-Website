<script setup lang="ts"></script>

<template>
  <div class="my-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-logos-discord-icon" class="size-5" />
          <h3 class="font-bold">Use Discord RSLBeginnerBot</h3>
        </div>
      </template>

      <p>
        RSLBeginnerBot#1457 is a Discord bot for generating seeds using
        predefined presets.
      </p>
      <p>
        The bot provides quick access to various configurations directly on
        Discord, making seed generation straightforward and accessible.
      </p>
      <div class="mt-4">
        <UButton
          to="https://discord.com/users/1247572932151218188"
          icon="i-logos-discord-icon"
          size="sm"
          color="primary"
          variant="link"
          label="Contact Discord RSL Bot"
        />
      </div>
    </UCard>
  </div>
</template>

<style scoped></style>

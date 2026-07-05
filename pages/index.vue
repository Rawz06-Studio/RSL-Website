<script setup lang="ts">
import PresetList from "~/components/PresetList.vue";
import DiscordBotInformation from "~/components/DiscordBotInformation.vue";
import { useMobile } from "~/hooks/useMobile";
import { PRESETS } from "~/core/preset-list";

const data = ref(Object.keys(PRESETS));
const status = ref('success');

const tabs = data.value?.map((item) => ({ label: item, key: item }));
const isMobile = useMobile();
</script>

<template>
  <div class="container mx-auto mt-3">
    <DiscordBotInformation />
    <template v-if="data && status == 'success'">
      <UTabs
        :items="tabs"
        class="w-full"
        :orientation="isMobile ? 'vertical' : 'horizontal'"
      >
        <template #content="{ item }">
          <PresetList :preset="item.key" />
        </template>
      </UTabs>
    </template>
  </div>
</template>

<style scoped></style>

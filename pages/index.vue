<script setup lang="ts">
import PresetList from "~/components/PresetList.vue";
import DiscordBotInformation from "~/components/DiscordBotInformation.vue";
import { useMobile } from "~/hooks/useMobile";
import { PRESETS } from "~/core/preset-list";

const data = ref(Object.keys(PRESETS));
const status = ref("success");

const tabs = computed(() =>
    data.value?.map((item) => ({ label: item, value: item })),
);
const isMobile = useMobile();

const selectedTab = ref(tabs.value[0]?.value);
</script>

<template>
  <div class="container mx-auto mt-3">
    <DiscordBotInformation />
    <template v-if="data && status == 'success'">
      <UTabs
          v-model="selectedTab"
          :items="tabs"
          class="w-full"
          :orientation="isMobile ? 'vertical' : 'horizontal'"
          :ui="{
          trigger: 'data-[state=active]:bg-green-500 rounded-md transition-colors duration-300',
          indicator: 'bg-green-500 transition-all duration-300',
        }"
      >
        <template #default="{ item }">
          <span>
            {{ item.label }}
          </span>
        </template>
        <template #content="{ item }">
          <div class="outline-none">
            <PresetList :preset="item.value" />
          </div>
        </template>
      </UTabs>
    </template>
  </div>
</template>

<style scoped></style>

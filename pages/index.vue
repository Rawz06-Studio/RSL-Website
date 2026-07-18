<script setup lang="ts">
import PresetList from "~/components/PresetList.vue";
import PresetCompare from "~/components/PresetCompare.vue";
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

// Compare mode
const compareMode = ref(false);
const compareSelection = ref<string[]>([]);

function toggleCompareMode() {
  compareMode.value = !compareMode.value;
  compareSelection.value = [];
}

function togglePresetSelection(preset: string) {
  if (compareSelection.value.includes(preset)) {
    compareSelection.value = compareSelection.value.filter((p) => p !== preset);
  } else if (compareSelection.value.length < 2) {
    compareSelection.value = [...compareSelection.value, preset];
  }
}

function isPresetSelected(preset: string) {
  return compareSelection.value.includes(preset);
}

function isPresetDisabled(preset: string) {
  return (
    compareSelection.value.length >= 2 &&
    !compareSelection.value.includes(preset)
  );
}
</script>

<template>
  <div class="container mx-auto mt-3">
    <DiscordBotInformation />
    <template v-if="data && status == 'success'">
      <div class="flex items-center justify-end mb-3">
        <UButton
          :color="compareMode ? 'primary' : 'neutral'"
          :variant="compareMode ? 'solid' : 'outline'"
          icon="i-heroicons-squares-2x2"
          class="cursor-pointer"
          @click="toggleCompareMode"
        >
          Compare
        </UButton>
      </div>

      <!-- Compare mode: preset selection and comparison view -->
      <template v-if="compareMode">
        <div class="mb-4">
          <p class="text-sm text-gray-500 mb-3">
            Select exactly two presets to compare. Click a selected preset to
            deselect it.
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton
              v-for="preset in data"
              :key="preset"
              :color="isPresetSelected(preset) ? 'primary' : 'neutral'"
              :variant="isPresetSelected(preset) ? 'solid' : 'outline'"
              :disabled="isPresetDisabled(preset)"
              :class="[
                'transition-colors duration-200',
                isPresetDisabled(preset)
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer',
              ]"
              @click="togglePresetSelection(preset)"
            >
              <UIcon
                v-if="isPresetSelected(preset)"
                name="i-heroicons-check"
                class="mr-1"
              />
              {{ preset }}
            </UButton>
          </div>
          <p
            v-if="compareSelection.length >= 2"
            class="text-xs text-amber-500 mt-2"
          >
            Click a selected preset to deselect it before choosing another.
          </p>
        </div>

        <template v-if="compareSelection.length === 2">
          <PresetCompare
            :preset1="compareSelection[0]"
            :preset2="compareSelection[1]"
          />
        </template>
        <template v-else>
          <div
            class="flex items-center justify-center py-12 text-gray-400 border border-dashed rounded-lg"
          >
            <UIcon name="i-heroicons-cursor-arrow-rays" class="size-5 mr-2" />
            <span>
              {{
                compareSelection.length === 0
                  ? "Select two presets to start comparing"
                  : "Select one more preset to start comparing"
              }}
            </span>
          </div>
        </template>
      </template>

      <!-- Normal mode: tab navigation -->
      <template v-else>
        <UTabs
          v-model="selectedTab"
          :items="tabs"
          class="w-full"
          :orientation="isMobile ? 'vertical' : 'horizontal'"
          :ui="{
            wrapper: isMobile ? 'flex flex-row gap-4' : 'flex flex-col gap-4',
            list: isMobile
              ? 'sticky top-16 self-start z-10 bg-white dark:bg-gray-900'
              : 'sticky top-16 z-10 bg-white dark:bg-gray-900',
            trigger:
              'data-[state=active]:bg-green-500 rounded-md transition-colors duration-150 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer',
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
    </template>
  </div>
</template>

<style scoped></style>

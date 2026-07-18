<script setup lang="ts">
import { presetReader } from "~/core/preset-reader";
import { presetVerifier } from "~/core/preset-verifier";
import { settings } from "~/core/settings";
import { accordionUi } from "~/core/ui-config";

const props = defineProps<{
  preset1: string;
  preset2: string;
}>();

type SectionKey = "options" | "conditionals" | "multiselect" | "weights";

const data1 = presetReader(presetVerifier(props.preset1));
const data2 = presetReader(presetVerifier(props.preset2));

function getDiffs(section: SectionKey) {
  const obj1 = (data1[section] ?? {}) as Record<string, unknown>;
  const obj2 = (data2[section] ?? {}) as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  return Array.from(allKeys)
    .filter((key) => JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key]))
    .map((key) => ({
      key,
      label: settings[key]?.name ?? key,
      value1: key in obj1 ? obj1[key] : null,
      value2: key in obj2 ? obj2[key] : null,
    }));
}

const sections: { key: SectionKey; label: string }[] = [
  { key: "options", label: "Options" },
  { key: "conditionals", label: "Conditionals" },
  { key: "multiselect", label: "Multiselect" },
  { key: "weights", label: "Weights" },
];

const diffsBySection = computed(() =>
  sections.map((s) => ({ ...s, diffs: getDiffs(s.key) })),
);

const hasDiffs = computed(() =>
  diffsBySection.value.some((s) => s.diffs.length > 0),
);
</script>

<template>
  <div>
    <div
      v-if="!hasDiffs"
      class="flex items-center justify-center py-12 text-gray-500"
    >
      <UIcon name="i-heroicons-check-circle" class="size-6 mr-2 text-success" />
      <span>No differences found between these presets.</span>
    </div>
    <template v-else>
      <div v-for="section in diffsBySection" :key="section.key">
        <template v-if="section.diffs.length > 0">
          <h1 class="text-xl font-bold my-2">{{ section.label }}</h1>
          <UAccordion :items="section.diffs" multiple :ui="accordionUi">
            <template #body="{ item }">
              <div class="p-4 pt-0 grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {{ preset1 }}
                  </p>
                  <PresetValueDisplay
                    :value="item.value1"
                    :section="section.key"
                  />
                </div>
                <div>
                  <p class="text-xs font-semibold text-gray-500 uppercase mb-2">
                    {{ preset2 }}
                  </p>
                  <PresetValueDisplay
                    :value="item.value2"
                    :section="section.key"
                  />
                </div>
              </div>
            </template>
          </UAccordion>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped></style>

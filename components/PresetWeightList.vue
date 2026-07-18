<script setup lang="ts">
import { parseValues } from "~/core/parse-values";
import { settings } from "~/core/settings";

type StringObject = {
  [key: string]: string | number | StringObject;
};
const props = defineProps<{
  weights: StringObject;
}>();
const allItems = props.weights
  ? Object.entries(props.weights as StringObject).map(([k, v]) => {
      const content = parseValues(v as Record<string, number>);
      const enabledOptions = content.filter((o) => !o.status);
      let badge = null;

      if (enabledOptions.length > 1) {
        badge = { label: "random", color: "error" as const };
      } else if (enabledOptions.length === 1) {
        badge = { label: enabledOptions[0].name, color: "primary" as const };
      }

      return {
        key: k,
        label: settings[k]?.name ?? k,
        content,
        badge,
      };
    })
  : [];
const searchValue = ref("");
const items = computed(() => {
  return searchValue.value && searchValue.value.length > 0
    ? allItems.filter((item) =>
        (settings[item.label]?.name ?? item.label)
          .toLocaleLowerCase()
          .includes(searchValue.value.toLocaleLowerCase()),
      )
    : allItems;
});
</script>

<template>
  <div>
    <div class="my-5">
      <UInput
        v-model="searchValue"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        color="primary"
        placeholder="Search..."
      />
    </div>
    <UAccordion
      :items="items"
      multiple
      :ui="{
        trigger:
          'hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors duration-150 rounded-md',
      }"
    >
      <template #default="{ item }">
        <div class="flex items-center gap-2">
          <span>{{ item.label }}</span>
          <UBadge
            v-if="item.badge"
            :color="item.badge.color"
            variant="solid"
            size="xs"
          >
            {{ item.badge.label }}
          </UBadge>
        </div>
      </template>
      <template #body="{ item }">
        <div class="p-4 pt-0">
          <div class="my-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-heroicons-document-text-16-solid"
                    class="size-5"
                  />
                  <h3 class="font-bold">{{ item.label }}</h3>
                </div>
              </template>
              <DescriptionPrinter
                :description="settings[item.key]?.description ?? ''"
              />
            </UCard>
          </div>
          <UTable :data="item.content">
            <template #value-cell="{ row }">
              {{ row.original.value }}%
            </template>
            <template #status-cell="{ row }">
              <span v-if="row.original.status">
                <UBadge color="red" variant="solid" class="rounded-full"
                  >Disabled</UBadge
                >
              </span>
              <span v-else>
                <UBadge color="green" variant="solid" class="rounded-full"
                  >Enable</UBadge
                >
              </span>
            </template>
          </UTable>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style scoped></style>

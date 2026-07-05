<script setup lang="ts">
import { settings } from "~/core/settings";

type StringObject = {
  [key: string]: string | number | StringObject;
};
const props = defineProps<{
  multiselect: StringObject;
}>();
const items = props.multiselect
  ? Object.entries(props.multiselect as StringObject).map(([k, v]) => ({
      key: k,
      label: settings[k]?.name ?? k,
      content: v,
    }))
  : [];
</script>

<template>
  <div>
    <UAccordion :items="items" multiple>
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
          <div class="ml-2">
            <span v-if="item.content === 0">
              <UBadge color="error" variant="solid" class="rounded-full"
                >Disabled</UBadge
              >
            </span>
            <span v-else-if="item.content === 100">
              <UBadge variant="solid" class="rounded-full">Enable</UBadge>
            </span>
            <span v-else> {{ item.content }}% </span>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style scoped></style>

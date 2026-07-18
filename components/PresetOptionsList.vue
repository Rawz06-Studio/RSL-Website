<script setup lang="ts">
import { settings } from "~/core/settings";
import { accordionUi } from "~/core/ui-config";

type StringObject = {
  [key: string]: string | number | StringObject;
};
const props = defineProps<{
  options: StringObject;
}>();
const items = props.options
  ? Object.entries(props.options as StringObject).map(([k, v]) => ({
      key: k,
      label: settings[k]?.name ?? k,
      content: v,
    }))
  : [];
</script>

<template>
  <div>
    <UAccordion :items="items" multiple :ui="accordionUi">
      <template #body="{ item }">
        <div class="p-4 pt-0">
          <span
            v-if="
              typeof item.content === 'string' ||
              typeof item.content === 'number'
            "
            class="ml-2"
          >
            <UBadge color="neutral" variant="outline">{{
              item.content
            }}</UBadge>
          </span>
          <span v-else-if="Array.isArray(item.content)">
            <UTable
              :data="item.content.map((el: string) => ({ name: el }))"
              :columns="[{ accessorKey: 'name', header: 'Name' }]"
            />
          </span>
          <span v-else-if="typeof item.content === 'boolean'">
            <UBadge
              v-if="item.content"
              color="success"
              variant="solid"
              class="rounded-full"
              >true</UBadge
            >
            <UBadge v-else color="danger" variant="solid" class="rounded-full"
              >false</UBadge
            >
          </span>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<style scoped></style>

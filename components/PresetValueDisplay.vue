<script setup lang="ts">
import { parseValues } from "~/core/parse-values";

defineProps<{
  value: unknown;
  section: "options" | "conditionals" | "multiselect" | "weights";
}>();
</script>

<template>
  <div>
    <span
      v-if="value === null || value === undefined"
      class="text-gray-400 italic"
      >—</span
    >
    <span v-else-if="section === 'conditionals' && Array.isArray(value)">
      <UBadge
        v-if="(value as unknown[])[0]"
        variant="solid"
        class="rounded-full"
        >Enable</UBadge
      >
      <UBadge v-else color="error" variant="solid" class="rounded-full"
        >Disabled</UBadge
      >
      <span
        v-if="(value as unknown[]).slice(1).length > 0"
        class="ml-2 text-sm text-gray-500"
      >
        {{ (value as unknown[]).slice(1).join(", ") }}
      </span>
    </span>
    <span v-else-if="section === 'multiselect' && typeof value === 'number'">
      <UBadge
        v-if="value === 0"
        color="error"
        variant="solid"
        class="rounded-full"
        >Disabled</UBadge
      >
      <UBadge v-else-if="value === 100" variant="solid" class="rounded-full"
        >Enable</UBadge
      >
      <span v-else>{{ value }}%</span>
    </span>
    <span
      v-else-if="
        section === 'weights' &&
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      "
    >
      <UTable
        :data="parseValues(value as Record<string, number>)"
        :columns="[
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'value', header: 'Value' },
          { accessorKey: 'status', header: 'Status' },
        ]"
      >
        <template #value-cell="{ row }"> {{ row.original.value }}% </template>
        <template #status-cell="{ row }">
          <UBadge
            v-if="row.original.status"
            color="error"
            variant="solid"
            class="rounded-full"
            >Disabled</UBadge
          >
          <UBadge v-else color="success" variant="solid" class="rounded-full"
            >Enable</UBadge
          >
        </template>
      </UTable>
    </span>
    <span v-else-if="typeof value === 'boolean'">
      <UBadge v-if="value" color="success" variant="solid" class="rounded-full"
        >true</UBadge
      >
      <UBadge v-else color="error" variant="solid" class="rounded-full"
        >false</UBadge
      >
    </span>
    <span v-else-if="Array.isArray(value)">
      <UTable
        :data="(value as string[]).map((el) => ({ name: el }))"
        :columns="[{ accessorKey: 'name', header: 'Name' }]"
      />
    </span>
    <span v-else-if="typeof value === 'string' || typeof value === 'number'">
      <UBadge color="neutral" variant="outline">{{ value }}</UBadge>
    </span>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { settings } from "~/core/settings";
import ObjectPrinter from "~/components/ObjectPrinter.vue";

type StringObject = {
  [key: string]: string | number | StringObject;
};
const props = defineProps<{
  item: StringObject;
}>();

const columns = [
  { accessorKey: "conditional", header: "Description" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "other", header: "Other" },
];
</script>

<template>
  <UTable
    :columns="columns"
    :data="
      Object.entries(props.item).map(([k, v]) => ({
        conditional: {
          name: settings[k]?.name ?? k,
          description: settings[k]?.description ?? '',
          parameters: settings[k]?.parameters ?? '',
        },
        status: (v as unknown as Array<string>)[0],
        other: (v as unknown as Array<string>).slice(1).join(','),
      }))
    "
  >
    <template #status-cell="{ row }">
      <span v-if="!row.original.status">
        <UBadge color="error" variant="solid" class="rounded-full"
          >Disabled</UBadge
        >
      </span>
      <span v-else>
        <UBadge variant="solid" class="rounded-full">Enable</UBadge>
      </span>
    </template>
    <template #conditional-cell="{ row }">
      <div class="flex flex-col">
        <span class="font-bold text-base text-wrap">{{
          row.original.conditional.name
        }}</span>
        <DescriptionPrinter
          class="italic text-sm text-wrap"
          :description="row.original.conditional.description"
        />
        <ObjectPrinter
          v-if="
            row.original.conditional.parameters &&
            typeof row.original.conditional.parameters === 'object'
          "
          class="text-wrap text-xs italic"
          :obj="row.original.conditional.parameters"
        />
      </div>
    </template>
  </UTable>
</template>

<style scoped></style>

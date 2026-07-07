<script setup lang="ts">
import PresetWeightList from "~/components/PresetWeightList.vue";
import { presetVerifier } from "~/core/preset-verifier";
import { presetReader } from "~/core/preset-reader";

const props = defineProps<{
  preset: string;
}>();

const filename = presetVerifier(props.preset);
const data = presetReader(filename);
</script>

<template>
  <div>
    <h1 class="text-xl font-bold my-2">Options</h1>
    <PresetOptionsList :options="data?.options" />
    <h1 class="text-xl font-bold my-2">Conditionals</h1>
    <PresetConditionalList :item="data?.conditionals" />
    <h1 class="text-xl font-bold my-2">Multiselect</h1>
    <PresetMultiSelectList :multiselect="data?.multiselect" />
    <h1 class="text-xl font-bold my-2">Weights</h1>
    <PresetWeightList :weights="data?.weights" />
  </div>
</template>

<style scoped></style>

import rsl_main from "~/assets/presets/rsl_main.json";
import rsl_potsl from "~/assets/presets/rsl_potsl.json";
import rsl_rupee from "~/assets/presets/rsl_rupee.json";

type StringObject = {
  [key: string]: string | number | StringObject;
};

type Preset = {
  options: StringObject;
  conditionals: StringObject;
  multiselect: StringObject;
  weights: StringObject;
};

const PRESETS_DATA: Record<string, unknown> = {
  "rsl_main.json": rsl_main,
  "rsl_potsl.json": rsl_potsl,
  "rsl_rupee.json": rsl_rupee,
};

export function presetReader(filename: string): Preset {
  return PRESETS_DATA[filename] as Preset;
}

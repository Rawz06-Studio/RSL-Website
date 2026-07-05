import { PRESETS } from "~/core/preset-list";

export function presetVerifier(
  name: string | undefined,
): (typeof PRESETS)[keyof typeof PRESETS] {
  if (name === undefined) {
    throw new Error(`Preset is undefined`);
  } else if (!Object.keys(PRESETS).includes(name)) {
    throw new Error(`Preset ${name} doesn't exist`);
  }
  const preset = name as keyof typeof PRESETS;
  return PRESETS[preset];
}

import settingsData from "~/assets/settings/settings.json";

export type Settings = {
  [key: string]: {
    name: string;
    description: string;
    parameters?: string;
  };
};

export const settings = settingsData as Settings;

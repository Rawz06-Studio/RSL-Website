import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  extends: [],
  modules: [
    "@nuxt/ui",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/mdc",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  ssr: true,
  css: ["~/assets/css/main.css"],
});

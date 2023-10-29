// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  css: [
    "~/assets/main.scss",
    "~/assets/_mixins.scss",
    "~/assets/_variables.scss",
  ],
  modules: ["nuxt-icon", "@formkit/nuxt", "@nuxtjs/google-fonts",],
  googleFonts: {
    families: {
      Inter: [400, 700],
    },
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
});

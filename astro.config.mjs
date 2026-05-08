import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    runtime: "off",
    mode: 'advanced'
  }),
  site: 'https://gulamta-portal.pages.dev',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.PUBLIC_STRAPI_URL': JSON.stringify(process.env.PUBLIC_STRAPI_URL),
    },
  },
});

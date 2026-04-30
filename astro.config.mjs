import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    runtime: "off",
    mode: 'advanced'
  }),
  site: 'https://gulamta-portal.pages.dev',
  integrations: [],
});

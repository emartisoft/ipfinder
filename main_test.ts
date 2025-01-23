// deno test --allow-sys --allow-net

import { getLocalIP, getPublicIP } from "./mod.ts";

Deno.test(async function getPublicIPTest() {
  console.log(await getPublicIP());
});

Deno.test(async function getLocalIPTest() {
  console.log(await getLocalIP()[0]);
});

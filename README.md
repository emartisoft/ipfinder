# ipfinder

## what does it do?
Finds and returns the local and public IP addresses of the machine


## usage
``` console
deno add jsr:@emarti/ipfinder
```
sample.ts

``` ts
import { getLocalIP, getPublicIP } from "@emarti/ipfinder";

console.log("Local IP(s):");
const localIPs = getLocalIP();
localIPs.forEach((ip) => console.log(`${ip}`));

console.log("\nPublic IP:");
const publicIP = await getPublicIP();
console.log(`${publicIP}`);
```
``` console
deno run --allow-sys --allow-net sample.ts
```
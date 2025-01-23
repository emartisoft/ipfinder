/**
 * Finds and returns the local IP addresses of the machine.
 *
 * Goes through all network interfaces and filters out the addresses that are
 * not of the IPv4 family and do not start with "127.". If any suitable
 * addresses are found, they are returned as an array. Otherwise, returns the
 * string "Local IP not found".
 *  * @example
 * ```ts
 * import { getLocalIP } from "@emarti/ipfinder";
 *
 * const localIPs = getLocalIP();
 * localIPs.forEach((ip) => console.log(`${ip}`));
 * ```
 */
export function getLocalIP(): string[] {
  const interfaces = Deno.networkInterfaces();
  const localIPs: string[] = [];

  for (const iface of interfaces) {
    if (iface.family === "IPv4" && !iface.address.startsWith("127.")) {
      localIPs.push(iface.address);
    }
  }

  return localIPs.length > 0 ? localIPs : ["Local IP not found"];
}

/**
 * Gets and returns the public IP address of the machine.
 *
 * Performs a GET request to `https://api.ipify.org?format=json` to get the
 * public IP address of the machine. If the request is successful, the IP
 * address is returned as a string. If the request fails, or if the IP
 * address is not found, a string describing the error is returned.
 *  * @example
 * ```ts
 * import { getPublicIP } from "@emarti/ipfinder";
 *
 * const publicIP = await getPublicIP();
 * console.log(`${publicIP}`);
 * ```
 */
export async function getPublicIP(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.ip || "Public IP not found";
  } catch (error) {
    if (error instanceof ErrorEvent) {
      return `Error: ${error.message}`;
    } else {
      return "Unknown error";
    }
  }
}

if (import.meta.main) {
  console.log("Local IP(s):");
  const localIPs = getLocalIP();
  localIPs.forEach((ip) => console.log(`${ip}`));

  console.log("\nPublic IP:");
  const publicIP = await getPublicIP();
  console.log(`${publicIP}`);
}

import { ethers } from "ethers";
import type { ChainMap } from "@hyperlane-xyz/sdk";

const createProviders = (
  customChainMetadata: Record<
    string,
    { name: string; chainId: number; rpcUrls: { http: string }[] }
  >,
): ChainMap<ethers.providers.Provider> => {
  const providers: ChainMap<ethers.providers.Provider> = {};

  for (const [name, chainInfo] of Object.entries(customChainMetadata)) {
    const provider: ethers.providers.Provider =
      new ethers.providers.JsonRpcProvider(chainInfo.rpcUrls[0].http, {
        name: chainInfo.name,
        chainId: chainInfo.chainId,
      });
    providers[name] = provider;
  }

  return providers;
};

export { createProviders };
import { z } from "zod";

import { chainMetadata as defaultChainMetadata } from "@hyperlane-xyz/registry";

import type { ChainMap, ChainMetadata } from "@hyperlane-xyz/sdk";
import { ChainMetadataSchema } from "@hyperlane-xyz/sdk";

import { objMerge } from "@hyperlane-xyz/utils";
import { createProviders } from "./providers.js";

const customChainMetadata = {
  // Example custom configuration
  leverabicalight: {
    name: "leverabicalight",
    chainId: 109695,
    displayName: "Leverabica Light",
    domainId: 109695,
    index: {
      from: 416
    },
    rpcUrls: [{ http: "https://leverabica.light.rpc.1ok69go.space" }],
    protocol: "ethereum",
    isTestnet: true,
    nativeToken: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    technicalStack: "arbitrumnitro"
  },
};

const customProviders = createProviders(customChainMetadata);

const chainMetadata = objMerge<ChainMap<ChainMetadata>>(
  defaultChainMetadata,
  customChainMetadata,
  10,
  true,
);

z.record(z.string(), ChainMetadataSchema).parse(chainMetadata);

export { chainMetadata, customProviders };

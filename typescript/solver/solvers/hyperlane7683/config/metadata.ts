import { AddressZero } from "@ethersproject/constants";

import {
  type Hyperlane7683Metadata,
  Hyperlane7683MetadataSchema,
} from "../types.js";

const metadata: Hyperlane7683Metadata = {
  protocolName: "Hyperlane7683",
  intentSources: [
    // testnet
    {
      address: "0x3E20e8cc2a4BE1a82fE1543334Ac907ac2f6e12A",
      chainName: "arbitrumsepolia",
    },
    {
      address: "0xBb4B6D2F1A81053d3BA50B5F8B6D4EAC3B36F39E",
      chainName: "leverabicalight",
    },
  ],
  customRules: {
    rules: [
      {
        name: "filterByTokenAndAmount",
        args: {
          "421614": {
            "0x082314439288EA7ed3Cf491C3fC11E04BEa6a992": null, // laDAI
            "0x15F5Fb51Be3219234245EB7dF9914E843498D596": null, // laUSDC
            "0x40126a994C0169af76871f3c2AE13203B91e1213": null, // laUSDT
            "0xA807B8ECf99BB922CFfda2f8be3e6b9f13d45829": null, // laWBTC
            "0x4Ef6ed5C8BB72FEe7a325167A35Cd8C99e6647DD": null, // laWETH
            [AddressZero]: BigInt(5e15),
          },
          "109695": {
            "0x185425829e5F988682784dB12de83E0ff309B182": null, // laDAI
            "0xA1d9DB66374F05fBe36C337fa011ddE5323d1ED7": null, // laUSDC
            "0x9b811047E6C78584683EE55de600A8fad5337EA6": null, // laUSDT
            "0x5c99E6D20669Fa52C36E71B541c1CA21120fA043": null, // laWBTC
            "0xdC09785337A9bc4535906507Ef70aF3B33D238F9": null, // laWETH
            [AddressZero]: BigInt(5e10),
          },
        },
      },
      {
        name: "intentNotFilled",
      },
    ],
  },
};

Hyperlane7683MetadataSchema.parse(metadata);

export default metadata;

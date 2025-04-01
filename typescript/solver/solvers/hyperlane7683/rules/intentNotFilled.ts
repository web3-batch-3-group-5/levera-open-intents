import { HashZero } from "@ethersproject/constants";
import { bytes32ToAddress, isAddress } from "@hyperlane-xyz/utils";

import { Hyperlane7683__factory } from "../../../typechain/factories/hyperlane7683/contracts/Hyperlane7683__factory.js";
import { Hyperlane7683Rule } from "../filler.js";
import { chainMetadata, customProviders } from "../../../config/chainMetadata.js";

const UNKNOWN = HashZero;

export function intentNotFilled(): Hyperlane7683Rule {
  return async (parsedArgs, context) => {
    const destinationSettler = bytes32ToAddress(
      parsedArgs.resolvedOrder.fillInstructions[0].destinationSettler,
    );
    if (!isAddress(destinationSettler) || destinationSettler === HashZero) {
      throw new Error(`Invalid destinationSettler address: ${destinationSettler}`);
    }
    const _chainId =
      parsedArgs.resolvedOrder.fillInstructions[0].destinationChainId.toString();
      
    await context.multiProvider.extendChainMetadata(chainMetadata);
    await context.multiProvider.setProviders(customProviders);
  
    const provider = await context.multiProvider.getProvider(_chainId);
    const filler = await context.multiProvider.getSigner(_chainId);

    const code = await provider.getCode(destinationSettler);
    if (code === "0x") {
      throw new Error(`No contract deployed at ${destinationSettler} on chain ${_chainId}`);
    }

    const destination = Hyperlane7683__factory.connect(
      destinationSettler,
      filler,
    );

    const orderStatus = await destination.orderStatus(parsedArgs.orderId);

    if (orderStatus !== UNKNOWN) {
      return { error: "Intent already filled", success: false };
    }
    return { data: "Intent not yet filled", success: true };
  };
}

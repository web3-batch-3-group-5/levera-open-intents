# Deployed Arbitrum Nitro Rollup Contracts

This document provides quick installation steps for interaction.

## Quick Installation & Usage

### 1. Install Dependencies

Ensure you have `yarn` and `hardhat` installed, then clone the repository and install dependencies:

```bash
git clone https://github.com/offchainlabs/nitro-contracts
cd nitro-contracts
yarn install
yarn build
yarn build:forge
```

### 2. Configure Environment

Copy `.env.sample.goerli` to `.env` and populate the required values, including:

- **Private Key** (funded on Arbitrum Sepolia)
- **Etherscan & Infura API keys**

### 3. Deploy or Use Existing Rollup Creator

If deploying a new rollup creator:

```bash
npx hardhat run scripts/deployment.ts --network arbSepolia
```

If using an existing deployment, update `ROLLUP_CREATOR_ADDRESS` in `espresso-deployments/arbSepolia.json`.

### 4. Create a Rollup

Modify `config.ts.example` and rename it to `config.ts`, copy `leverabica-light/config/config.template.txt` to `config.ts` then execute:

```bash
npx hardhat run scripts/createEthRollup.ts --network arbSepolia
```

### 5. Integration with Espresso (rpc-node, validation-node, caff-node)

The deployed rollup interacts with Espresso for fast confirmations. Batches are submitted via the transaction streamer and verified through the sequencer inbox contract.

Inside `leverabica-light/config`, modify `full_node.json`, `l2_chain_info.json` and `caff_node.json` according to deployed rollup cotracts, then execute:

```bash
docker compose up -d
```

Caff database is supposed to use the same database with full-node

```bash
docker compose stop
cp -r leverabica-light/database/* leverabica-light/caff-database/
docker compose start
```

For further details, refer to the [official documentation](https://docs.espressosys.com/network/guides/using-the-espresso-network/using-the-espresso-network-as-an-arbitrum-orbit-chain).

# Levera Open Intents

## Description

The Open Intents Framework is an open-source framework that provides a full stack of smart contracts, solvers and UI with modular abstractions for settlement to build and deploy intent protocols across EVM chains.

With out-of-the-box ERC-7683 support, the Open Intents Framework standardizes cross-chain transactions and unlocks intents on day 1 for builders in the whole Ethereum ecosystem (and beyond).

## Directory Structure

- `nitro-espresso-rollup/` - Contains the deployed contract information after setting up Arbitrum Orbit Chain integrated with Espresso, along with the installation guide and related documentation.
- `hyperlane/` - Contains the hyperlane configuration found in `$HOME/.hyperlane/`, along with the installation guide and related documentation.
- `solidity/` - Contains the smart contract code written in Solidity.
- `typescript/solver/` - Houses the TypeScript implementations of the solvers that execute the intents.

### Prerequisites

- Node.js
- yarn
- Git

## Usage and Workflow

### Nitro Node

[Setting up nitro-node integrated with espresso](./nitro-espresso-rollup/README.md)

### Hyperlane

[Setting up hyperlane used for OIF solver](./hyperlane/README.md)

### OIF (Open Intent Framework)

```bash
git clone https://github.com/BootNodeDev/intents-framework.git
cd intents-framework
yarn
```

Update `typescript/solver/` files according to previous hyperlane configuration and run the following commands

```bash
cd typescript/solver/
yarn install
yarn build
```

We can run solver on the local terminal by running

```bash
yarn solver
```

or run solver on docker. The following commands from the root directory (you need `docker` installed)

```bash
docker build -t solver .
```

Once it finish building the image

```bash
docker run -it -e [PRIVATE_KEY=SOME_PK_YOU_OWN | MNEMONIC=SOME_MNEMONIC_YOU_OWN] solver
```

The solver is run using `pm2` inside the docker container so `pm2` commands can still be used inside a container with the docker exec command:

```bash
# Monitoring CPU/Usage of each process
docker exec -it <container-id> pm2 monit
# Listing managed processes
docker exec -it <container-id> pm2 list
# Get more information about a process
docker exec -it <container-id> pm2 show
# 0sec downtime reload all applications
docker exec -it <container-id> pm2 reload all
```

To test intent creation, refer to [HyperlaneERC7683 Implementation](./solidity/README.md)

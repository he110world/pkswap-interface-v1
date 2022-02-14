const fs = require('fs')

async function deploy(contr, ...args){
    const c1 = await ethers.getContractFactory(contr)
    const c2 = await c1.deploy(...args)
    await c2.deployed()
    return c2.address
}

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is avaialble in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const tokens = {
        WETH:'WETH',
        WBNB:'WBNB',
        BAKE:'BakeryToken',
        BUSD:'BEP20Token',
        DAI:'BEP20DAI',
        ETH:'BEP20Ethereum',
        USDT:'BEP20USDT',
        CAKE:'CakeToken'
    }

    const env_lines = [
        `REACT_APP_NETWORK_URL="http://eth1.haha.fit:8545"`,
        `REACT_APP_CHAIN_ID="31337"`
    ]

    //tokens
    for(const t in tokens){
        const a = await deploy(tokens[t])
        env_lines.push(`REACT_APP_TOKEN_${t}="${a}"`)
        console.log(t,tokens[t])
    }

    //multicall
    const mc = await deploy('Multicall2')
    env_lines.push(`REACT_APP_MULTICALL="${mc}"`)
    console.log('mc',mc)

    //factory
    const feeToSetter = deployer.getAddress()
    // Fill your address as feeToSetter in constructor -> Deploy
    const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
    const Factory = await PancakeFactory.deploy(feeToSetter);
    await Factory.deployed();
 
    env_lines.push(`REACT_APP_FACTORY_ADDRESS="${Factory.address}"`)
    console.log('fc',Factory.address)

    //init code hash
    const ich = await Factory.INIT_CODE_PAIR_HASH()
    env_lines.push(`REACT_APP_INIT_CODE_HASH="${ich}"`)
    console.log('hash',ich)

    //pancakepair
    const pp = await deploy('PancakePair')
    //const pp2 = await deploy('PancakeProfile')

    //lp

    const env = env_lines.join('\n')
    fs.writeFileSync('.env.local', env)
}
  
main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


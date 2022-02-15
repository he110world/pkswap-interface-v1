require("@nomiclabs/hardhat-waffle");

task('deploy','Deploy contracts')
.addParam('host',`Node's host`)
.addParam('chain',`Node's chain id`)
.setAction(async (args,hre)=>{
    const main = require('./scripts/deploy.js', args.chain_id)
    await main(args.host)
})

module.exports = {
	solidity: {
        compilers: [    //可指定多个sol版本
			{version: "0.4.18"},
			{version: "0.5.16"},
			{version: "0.6.12"},
			{
                version: "0.6.6",
                settings:{
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }
            },
			{version: "0.8.4"}
		],
		overrides: {
			"@pancakeswap/pancake-swap-lib/contracts/GSN/Context.sol":{
				version:"0.5.16"
			},
			"@pancakeswap/pancake-swap-lib/contracts/access/Ownable.sol":{
				version:"0.5.16"
			}
        }
	},
	networks: {
		dev: {
			url: "http://127.0.0.1:8545",
			chainId: 31337
		},
	}
};

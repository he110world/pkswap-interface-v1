require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.

module.exports = {
	solidity: {
		compilers: [    //可指定多个sol版本
			{version: "0.4.18"},
			{version: "0.5.16"},
			{version: "0.6.12"},
			{version: "0.6.6"},
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

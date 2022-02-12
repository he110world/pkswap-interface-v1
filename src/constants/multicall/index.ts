import { ChainId } from '@pancakeswap-libs/sdk-v2'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: process.env.REACT_APP_MULTICALL,
  [ChainId.BSCTESTNET]: process.env.REACT_APP_MULTICALL,
  [ChainId.LOCALNET]: process.env.REACT_APP_MULTICALL
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }

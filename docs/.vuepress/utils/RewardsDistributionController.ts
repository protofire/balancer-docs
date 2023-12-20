import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';
import { VeSystem } from './LaunchpadSubgraph';

type AddAllowedRewardTokensFunctionType = (
  data: string[],
  callbacks: CallbackOptionsType
) => Promise<void>;

type DepositTokenFunctionType = (
  token: string,
  callbacks: CallbackOptionsType
) => Promise<void>;

type ApproveTokenParamsType = {
  token: string;
  amount: bigint;
};

type TokenAllowanceFunctionType = (token: string) => Promise<bigint>;

type ApproveTokenFunctionType = (
  data: ApproveTokenParamsType,
  callbacks: CallbackOptionsType
) => Promise<void>;

type UseControllerReturnType = {
  addAllowedRewardTokens: Ref<AddAllowedRewardTokensFunctionType | undefined>;
  depositToken: Ref<DepositTokenFunctionType | undefined>;
  approveToken: Ref<ApproveTokenFunctionType | undefined>;
  tokenAllowance: Ref<TokenAllowanceFunctionType | undefined>;
};

const ERC20 = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
];

const ABI = [
  'function addAllowedRewardTokens(address[] calldata tokens) external',
  'function depositToken(ERC20 token, uint256 amount) external',
];

export const useController = ({
  walletProvider,
  network,
  veSystem,
}: {
  walletProvider: Ref<
    | {
        request: (request: {
          method: string;
          params?: any[] | Record<string, any> | undefined;
        }) => Promise<any>;
      }
    | undefined
  >;
  network: Ref<NetworkConfig>;
  veSystem: Ref<VeSystem | undefined>;
}): UseControllerReturnType => {
  const addAllowedRewardTokens = ref<AddAllowedRewardTokensFunctionType>();
  const depositToken = ref<DepositTokenFunctionType>();
  const approveToken = ref<ApproveTokenFunctionType>();
  const tokenAllowance = ref<TokenAllowanceFunctionType>();

  const initialize = () => {
    addAllowedRewardTokens.value = async (
      data: string[],
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.rewardDistributorAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.addAllowedRewardTokens(data),
        callbacks
      );
    };

    depositToken.value = async (
      token: string,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const contractAddress = veSystem.value.rewardDistributorAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await submitAction(
        async () => await contract.depositToken(token),
        callbacks
      );
    };

    approveToken.value = async (
      data: ApproveTokenParamsType,
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;
      if (!veSystem.value) return;

      const { token, amount } = data;

      const spender = veSystem.value.rewardDistributorAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(token, ERC20, signer);

      await submitAction(
        async () => await contract.approve(spender, amount),
        callbacks
      );
    };

    tokenAllowance.value = async (token: string): Promise<bigint> => {
      if (!walletProvider.value) return ethers.toBigInt(0);
      if (!veSystem.value) return ethers.toBigInt(0);

      const spender = veSystem.value.rewardDistributorAddress;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );

      const signer = await provider.getSigner();

      const owner = await signer.getAddress();

      const contract = new ethers.Contract(token, ERC20, provider);

      return await contract.allowance(owner, spender);
    };
  };

  watch([network], initialize);

  return {
    addAllowedRewardTokens,
    depositToken,
    approveToken,
    tokenAllowance,
  };
};

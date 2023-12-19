import { ethers, BrowserProvider } from 'ethers';
import { Ref, watch, ref } from 'vue';
import { NetworkConfig } from '../constants/networks';
import { CallbackOptionsType, submitAction } from './LaunchpadController';

type DeployFunctionType = (
  data: string[],
  callbacks: CallbackOptionsType
) => Promise<void>;

type UseControllerReturnType = {
  addAllowedRewardTokens: Ref<DeployFunctionType | undefined>;
};

const ABI = [
  'function addAllowedRewardTokens(address[] calldata tokens) external',
];

export const useController = ({
  walletProvider,
  network,
  address,
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
  address: string;
}): UseControllerReturnType => {
  const addAllowedRewardTokens = ref<DeployFunctionType>();

  const initialize = () => {
    addAllowedRewardTokens.value = async (
      data: string[],
      callbacks: CallbackOptionsType
    ): Promise<void> => {
      if (!walletProvider.value) return;

      const provider = new BrowserProvider(
        walletProvider.value,
        network.value.id
      );
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(address, ABI, signer);

      await submitAction(
        async () => await contract.addAllowedRewardTokens(data),
        callbacks
      );
    };
  };

  watch([network], initialize);

  return {
    addAllowedRewardTokens,
  };
};

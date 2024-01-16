type Config = {
  SUBGRAPH_URL: string;
  LAUNCHPAD_CONTRACT: string;
  LENS_REWARD_CONTRACT: string;
};

export const CONFIG = new Map<number, Config>([
  [
    80001,
    {
      SUBGRAPH_URL:
        'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1',
      LAUNCHPAD_CONTRACT: '0x4d1ec62d448853ae53b48f78ec4fc7b26e819783',
      LENS_REWARD_CONTRACT: '0x4eb9fdce38e29d7b6ad61f9697a3b5e4f080e3f4',
    },
  ],
  [
    42161,
    {
      SUBGRAPH_URL:
        'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1',
      LAUNCHPAD_CONTRACT: '0x6c9c2881b6e2fdb4e9e72896a4883049ad155b36',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
  [
    1101,
    {
      SUBGRAPH_URL:
        'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1',
      LAUNCHPAD_CONTRACT: '0x6c9c2881b6e2fdb4e9e72896a4883049ad155b36',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
  [
    137,
    {
      SUBGRAPH_URL:
        'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1',
      LAUNCHPAD_CONTRACT: '0x6c9c2881b6e2fdb4e9e72896a4883049ad155b36',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
]);

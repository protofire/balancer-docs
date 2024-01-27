type Config = {
  SUBGRAPH_URL: string;
  LAUNCHPAD_CONTRACT: string;
  LENS_REWARD_CONTRACT: string;
};

export const CONFIG = new Map<number, Config>([
  [
    80001, // mumbai
    {
      SUBGRAPH_URL:
        'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1',
      LAUNCHPAD_CONTRACT: '0x04fbb0178895a46e87422768d8545898b197d9ab',
      LENS_REWARD_CONTRACT: '0x4eb9fdce38e29d7b6ad61f9697a3b5e4f080e3f4',
    },
  ],
  [
    42161, // arb
    {
      SUBGRAPH_URL:
        'https://thegraph.com/explorer/subgraph/maxkmyt/launchpad_arb',
      LAUNCHPAD_CONTRACT: '0x562cb67c3259120273bb7b75b9414638ab453af6',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
  [
    1101, // polygon zkEVM
    {
      SUBGRAPH_URL:
        'https://subgraph.satsuma-prod.com/23d030b3f9c5/maksims-team--1931238/launchpad_polygon_zk/api',
      LAUNCHPAD_CONTRACT: '0x6c9c2881b6e2fdb4e9e72896a4883049ad155b36',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
  [
    137, // polygon pos
    {
      SUBGRAPH_URL:
        'https://thegraph.com/explorer/subgraph/maxkmyt/launchpad_polygon',
      LAUNCHPAD_CONTRACT: '0x93a6a2c89022e60a94986621ca8a3cd45e31dc77',
      LENS_REWARD_CONTRACT: '0xb422e74045f19d94ec62236efdcae4b13bac386b',
    },
  ],
]);

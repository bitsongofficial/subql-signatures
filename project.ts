import {
  CosmosDatasourceKind,
  CosmosHandlerKind,
  CosmosProject,
} from "@subql/types-cosmos";

// Can expand the Datasource processor types via the genreic param
const project: CosmosProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "bitsong-signatures",
  description:
    "",
  runner: {
    node: {
      name: "@subql/node-cosmos",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /* The unique chainID of the Cosmos Zone */
    chainId: "bitsong-2b",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: ["https://rpc.explorebitsong.com"],
  },
  dataSources: [
    {
      kind: CosmosDatasourceKind.Runtime,
      // startBlock: 2966151, // genesis bitsong-2b
      startBlock: 17000000,
      mapping: {
        file: "./dist/index.js",
        handlers: [
          {
            handler: "handleBlock",
            kind: CosmosHandlerKind.Block,
          },
        ],
      },
    },
  ],
};

// Must set default to the project instance
export default project;

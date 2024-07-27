import { CosmosBlock } from "@subql/types-cosmos";
import { toBase64, toHex } from "@cosmjs/encoding"
import { Signature } from "../types";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  logger.info(`Handling block at height: ${block.block.header.height.toString()}`);

  if (block.block.lastCommit === null) {
    logger.info(`Block at height: ${block.block.header.height.toString()} has no last commit`);
    return;
  }

  for (const { signature, validatorAddress } of block.block.lastCommit.signatures) {
    const record = Signature.create({
      id: `${block.block.header.height.toString()}-${validatorAddress?.toString()}`,
      height: BigInt(block.block.header.height),
      signature: signature ? toBase64(signature) : undefined,
      validator: validatorAddress ? toHex(validatorAddress).toUpperCase() : undefined,
      timestamp: new Date(block.block.header.time.toString()),
    })

    await record.save();
  }
}
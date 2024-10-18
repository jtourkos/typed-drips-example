import type {
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype';
import { dripsAbi, type DripsAbi } from './drips-abi';
import { Contract } from 'ethers';
import { JsonRpcProvider } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

export async function executeDripsReadMethod<
  functionName extends ExtractAbiFunctionNames<DripsAbi, 'pure' | 'view'>,
  abiFunction extends AbiFunction = ExtractAbiFunction<DripsAbi, functionName>
>(config: {
  functionName:
    | functionName
    | ExtractAbiFunctionNames<DripsAbi, 'pure' | 'view'>;
  args: AbiParametersToPrimitiveTypes<abiFunction['inputs'], 'inputs'>;
}): Promise<AbiParametersToPrimitiveTypes<abiFunction['outputs'], 'outputs'>> {
  const { provider } = new JsonRpcProvider(process.env.RPC_URL);
  const { functionName: func, args } = config;

  const dripsContractAddress = '0xd0Dd053392db676D57317CD4fe96Fc2cCf42D0b4';
  const drips = new Contract(dripsContractAddress, dripsAbi, provider);

  return await drips[func](...args);
}

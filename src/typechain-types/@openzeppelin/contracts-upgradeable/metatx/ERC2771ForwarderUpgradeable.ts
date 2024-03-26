/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace ERC2771ForwarderUpgradeable {
  export type ForwardRequestDataStruct = {
    from: AddressLike;
    to: AddressLike;
    value: BigNumberish;
    gas: BigNumberish;
    deadline: BigNumberish;
    data: BytesLike;
    signature: BytesLike;
  };

  export type ForwardRequestDataStructOutput = [
    from: string,
    to: string,
    value: bigint,
    gas: bigint,
    deadline: bigint,
    data: string,
    signature: string
  ] & {
    from: string;
    to: string;
    value: bigint;
    gas: bigint;
    deadline: bigint;
    data: string;
    signature: string;
  };
}

export interface ERC2771ForwarderUpgradeableInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "eip712Domain"
      | "execute"
      | "executeBatch"
      | "nonces"
      | "verify"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "EIP712DomainChanged"
      | "ExecutedForwardRequest"
      | "Initialized"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [ERC2771ForwarderUpgradeable.ForwardRequestDataStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "executeBatch",
    values: [
      ERC2771ForwarderUpgradeable.ForwardRequestDataStruct[],
      AddressLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "nonces", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [ERC2771ForwarderUpgradeable.ForwardRequestDataStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ExecutedForwardRequestEvent {
  export type InputTuple = [
    signer: AddressLike,
    nonce: BigNumberish,
    success: boolean
  ];
  export type OutputTuple = [signer: string, nonce: bigint, success: boolean];
  export interface OutputObject {
    signer: string;
    nonce: bigint;
    success: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ERC2771ForwarderUpgradeable extends BaseContract {
  connect(runner?: ContractRunner | null): ERC2771ForwarderUpgradeable;
  waitForDeployment(): Promise<this>;

  interface: ERC2771ForwarderUpgradeableInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  execute: TypedContractMethod<
    [request: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct],
    [void],
    "payable"
  >;

  executeBatch: TypedContractMethod<
    [
      requests: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct[],
      refundReceiver: AddressLike
    ],
    [void],
    "payable"
  >;

  nonces: TypedContractMethod<[owner: AddressLike], [bigint], "view">;

  verify: TypedContractMethod<
    [request: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "execute"
  ): TypedContractMethod<
    [request: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "executeBatch"
  ): TypedContractMethod<
    [
      requests: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct[],
      refundReceiver: AddressLike
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "nonces"
  ): TypedContractMethod<[owner: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "verify"
  ): TypedContractMethod<
    [request: ERC2771ForwarderUpgradeable.ForwardRequestDataStruct],
    [boolean],
    "view"
  >;

  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;
  getEvent(
    key: "ExecutedForwardRequest"
  ): TypedContractEvent<
    ExecutedForwardRequestEvent.InputTuple,
    ExecutedForwardRequestEvent.OutputTuple,
    ExecutedForwardRequestEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;

  filters: {
    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;

    "ExecutedForwardRequest(address,uint256,bool)": TypedContractEvent<
      ExecutedForwardRequestEvent.InputTuple,
      ExecutedForwardRequestEvent.OutputTuple,
      ExecutedForwardRequestEvent.OutputObject
    >;
    ExecutedForwardRequest: TypedContractEvent<
      ExecutedForwardRequestEvent.InputTuple,
      ExecutedForwardRequestEvent.OutputTuple,
      ExecutedForwardRequestEvent.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
  };
}
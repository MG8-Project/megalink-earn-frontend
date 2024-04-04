/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Forwarder, ForwarderInterface } from "../../contracts/Forwarder";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint48",
        name: "deadline",
        type: "uint48",
      },
    ],
    name: "ERC2771ForwarderExpiredRequest",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "ERC2771ForwarderInvalidSigner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestedValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "msgValue",
        type: "uint256",
      },
    ],
    name: "ERC2771ForwarderMismatchedValue",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "ERC2771UntrustfulTarget",
    type: "error",
  },
  {
    inputs: [],
    name: "EnforcedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "ExpectedPause",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "ExecutedForwardRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint48",
            name: "deadline",
            type: "uint48",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct ERC2771ForwarderUpgradeable.ForwardRequestData",
        name: "request",
        type: "tuple",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint48",
            name: "deadline",
            type: "uint48",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct ERC2771ForwarderUpgradeable.ForwardRequestData[]",
        name: "requests",
        type: "tuple[]",
      },
      {
        internalType: "address payable",
        name: "refundReceiver",
        type: "address",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint48",
            name: "deadline",
            type: "uint48",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct ERC2771ForwarderUpgradeable.ForwardRequestData",
        name: "request",
        type: "tuple",
      },
    ],
    name: "verify",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100d4565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff16156100725760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b03908116146100d15780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b608051611d9f6100fd600039600081816108f50152818161091e0152610a640152611d9f6000f3fe6080604052600436106100ec5760003560e01c80638456cb591161008a578063c4d66de811610059578063c4d66de8146102cb578063ccf96b4a146102eb578063df905caf146102fe578063f2fde38b1461031157600080fd5b80638456cb591461020957806384b0196e1461021e5780638da5cb5b14610246578063ad3cb1cc1461028d57600080fd5b806352d1902d116100c657806352d1902d146101575780635c975abb1461017a578063715018a61461019f5780637ecebe00146101b457600080fd5b806319d8d38c146100f85780633f4ba83a1461012d5780634f1ef2861461014457600080fd5b366100f357005b600080fd5b34801561010457600080fd5b5061011861011336600461177c565b610331565b60405190151581526020015b60405180910390f35b34801561013957600080fd5b50610142610363565b005b6101426101523660046117e2565b610375565b34801561016357600080fd5b5061016c610394565b604051908152602001610124565b34801561018657600080fd5b50600080516020611d4a8339815191525460ff16610118565b3480156101ab57600080fd5b506101426103b1565b3480156101c057600080fd5b5061016c6101cf3660046118a6565b6001600160a01b031660009081527f5ab42ced628888259c08ac98db1eb0cf702fc1501344311d8b100cd1bfe4bb00602052604090205490565b34801561021557600080fd5b506101426103c3565b34801561022a57600080fd5b506102336103d3565b6040516101249796959493929190611913565b34801561025257600080fd5b507f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546040516001600160a01b039091168152602001610124565b34801561029957600080fd5b506102be604051806040016040528060058152602001640352e302e360dc1b81525081565b60405161012491906119a9565b3480156102d757600080fd5b506101426102e63660046118a6565b610484565b6101426102f93660046119bc565b610612565b61014261030c36600461177c565b610714565b34801561031d57600080fd5b5061014261032c3660046118a6565b61076f565b600080600080610340856107aa565b509250925092508280156103515750815b801561035a5750805b95945050505050565b61036b61082f565b61037361088a565b565b61037d6108ea565b6103868261098f565b6103908282610997565b5050565b600061039e610a59565b50600080516020611d2a83398151915290565b6103b961082f565b6103736000610aa2565b6103cb61082f565b610373610b13565b60006060808280808381600080516020611d0a833981519152805490915015801561040057506001810154155b6104495760405162461bcd60e51b81526020600482015260156024820152741152540dcc4c8e88155b9a5b9a5d1a585b1a5e9959605a1b60448201526064015b60405180910390fd5b610451610b5c565b610459610c1f565b60408051600080825260208201909252600f60f81b9c939b5091995046985030975095509350915050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156104ca5750825b905060008267ffffffffffffffff1660011480156104e75750303b155b9050811580156104f5575080155b156105135760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561053d57845460ff60401b1916600160401b1785555b610545610c5e565b610589604051806040016040528060098152602001682337b93bb0b93232b960b91b815250604051806040016040528060018152602001603160f81b815250610c6e565b6105b3604051806040016040528060098152602001682337b93bb0b93232b960b91b815250610c80565b6105bc86610cab565b6105c4610cbc565b831561060a57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b505050505050565b6001600160a01b03811615600080805b858110156106da5786868281811061063c5761063c611a42565b905060200281019061064e9190611a58565b61065c906040013584611a8e565b9250600061068d88888481811061067557610675611a42565b90506020028101906106879190611a58565b86610cc4565b9050806106c9578787838181106106a6576106a6611a42565b90506020028101906106b89190611a58565b6106c6906040013584611a8e565b92505b506106d381611aa1565b9050610622565b50348214610704576040516370647f7960e01b815260048101839052346024820152604401610440565b801561060a5761060a8482610eeb565b8060400135341461074457604080516370647f7960e01b8152908201356004820152346024820152604401610440565b61074f816001610cc4565b61076c57604051630a12f52160e11b815260040160405180910390fd5b50565b61077761082f565b6001600160a01b0381166107a157604051631e4fbdf760e01b815260006004820152602401610440565b61076c81610aa2565b6000806000806000806107bc87610f82565b90925090506107d96107d46040890160208a016118a6565b6110f7565b426107ea60a08a0160808b01611aba565b65ffffffffffff16101583801561081e575061080960208a018a6118a6565b6001600160a01b0316836001600160a01b0316145b919750955093509150509193509193565b336108617f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b6001600160a01b0316146103735760405163118cdaa760e01b8152336004820152602401610440565b610892611174565b600080516020611d4a833981519152805460ff191681557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a150565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148061097157507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610965600080516020611d2a833981519152546001600160a01b031690565b6001600160a01b031614155b156103735760405163703e46dd60e11b815260040160405180910390fd5b61076c61082f565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156109f1575060408051601f3d908101601f191682019092526109ee91810190611ae2565b60015b610a1957604051634c9c8ce360e01b81526001600160a01b0383166004820152602401610440565b600080516020611d2a8339815191528114610a4a57604051632a87526960e21b815260048101829052602401610440565b610a5483836111a4565b505050565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103735760405163703e46dd60e11b815260040160405180910390fd5b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b610b1b6111fa565b600080516020611d4a833981519152805460ff191660011781557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258336108cc565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d1028054606091600080516020611d0a83398151915291610b9b90611afb565b80601f0160208091040260200160405190810160405280929190818152602001828054610bc790611afb565b8015610c145780601f10610be957610100808354040283529160200191610c14565b820191906000526020600020905b815481529060010190602001808311610bf757829003601f168201915b505050505091505090565b7fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d1038054606091600080516020611d0a83398151915291610b9b90611afb565b610c6661122b565b610373611274565b610c7661122b565b6103908282611295565b610c8861122b565b61076c81604051806040016040528060018152602001603160f81b815250611295565b610cb361122b565b61076c816112f6565b61037361122b565b6000806000806000610cd5876107aa565b93509350935093508515610dc05783610d2357610cf860408801602089016118a6565b60405163d2650cd160e01b81526001600160a01b039091166004820152306024820152604401610440565b82610d5c57610d3860a0880160808901611aba565b604051634a777ac560e11b815265ffffffffffff9091166004820152602401610440565b81610dc057610d86604051806040016040528060048152602001634845524560e01b8152506112fe565b80610d9460208901896118a6565b604051636422d02b60e11b81526001600160a01b03928316600482015291166024820152604401610440565b838015610dca5750815b8015610dd35750825b15610ee1576001600160a01b03811660009081527f5ab42ced628888259c08ac98db1eb0cf702fc1501344311d8b100cd1bfe4bb0060205260408120805460018101909155905060608801356000610e3160408b0160208c016118a6565b905060408a01356000610e4760a08d018d611b35565b610e5460208f018f6118a6565b604051602001610e6693929190611b83565b6040516020818303038152906040529050600080600083516020850186888af19a505a9050610e95818e611341565b604080518781528c151560208201526001600160a01b038916917f842fb24a83793558587a3dab2be7674da4a51d09c5542d6dd354e5d0ea70813c910160405180910390a25050505050505b5050505092915050565b80471015610f0e5760405163cd78605960e01b8152306004820152602401610440565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114610f5b576040519150601f19603f3d011682016040523d82523d6000602084013e610f60565b606091505b5050905080610a5457604051630a12f52160e11b815260040160405180910390fd5b60008080806110d1610f9760c0870187611b35565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506110cb92507f7f96328b83274ebc7c1cf4f7a3abda602b51a78b7fa1d86a2ce353d75e587cac9150610fff905060208a018a6118a6565b61100f60408b0160208c016118a6565b60408b013560608c01356110296101cf60208f018f6118a6565b8d608001602081019061103c9190611aba565b8e8060a0019061104c9190611b35565b60405161105a929190611ba9565b6040805191829003822060208301999099526001600160a01b0397881690820152959094166060860152608085019290925260a084015260c083015265ffffffffffff1660e08201526101008101919091526101200160405160208183030381529060405280519060200120611359565b9061138c565b50909250905060008160038111156110eb576110eb611bb9565b14959194509092505050565b604051306024820152600090819060440160408051601f19818403018152919052602080820180516001600160e01b031663572b6c0560e01b17815282519293506000928392839290918391895afa92503d9150600051905082801561115e575060208210155b801561116a5750600081115b9695505050505050565b600080516020611d4a8339815191525460ff1661037357604051638dfc202b60e01b815260040160405180910390fd5b6111ad826113d9565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a28051156111f257610a54828261143e565b6103906114ab565b600080516020611d4a8339815191525460ff16156103735760405163d93c066560e01b815260040160405180910390fd5b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff1661037357604051631afcd79f60e31b815260040160405180910390fd5b61127c61122b565b600080516020611d4a833981519152805460ff19169055565b61129d61122b565b600080516020611d0a8339815191527fa16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d1026112d78482611c15565b50600381016112e68382611c15565b5060008082556001909101555050565b61077761122b565b61076c8160405160240161131291906119a9565b60408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b1790526114ca565b611350603f6060830135611cd5565b82101561039057fe5b60006113866113666114d3565b8360405161190160f01b8152600281019290925260228201526042902090565b92915050565b600080600083516041036113c65760208401516040850151606086015160001a6113b8888285856114e2565b9550955095505050506113d2565b50508151600091506002905b9250925092565b806001600160a01b03163b60000361140f57604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610440565b600080516020611d2a83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b03168460405161145b9190611cf7565b600060405180830381855af49150503d8060008114611496576040519150601f19603f3d011682016040523d82523d6000602084013e61149b565b606091505b509150915061035a8583836115b1565b34156103735760405163b398979f60e01b815260040160405180910390fd5b61076c81611610565b60006114dd611631565b905090565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a084111561151d57506000915060039050826115a7565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015611571573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661159d575060009250600191508290506115a7565b9250600091508190505b9450945094915050565b6060826115c6576115c1826116a5565b611609565b81511580156115dd57506001600160a01b0384163b155b1561160657604051639996b31560e01b81526001600160a01b0385166004820152602401610440565b50805b9392505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f61165c6116ce565b611664611738565b60408051602081019490945283019190915260608201524660808201523060a082015260c00160405160208183030381529060405280519060200120905090565b8051156116b55780518082602001fd5b604051630a12f52160e11b815260040160405180910390fd5b6000600080516020611d0a833981519152816116e8610b5c565b80519091501561170057805160209091012092915050565b8154801561170f579392505050565b7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470935050505090565b6000600080516020611d0a83398151915281611752610c1f565b80519091501561176a57805160209091012092915050565b6001820154801561170f579392505050565b60006020828403121561178e57600080fd5b813567ffffffffffffffff8111156117a557600080fd5b820160e0818503121561160957600080fd5b6001600160a01b038116811461076c57600080fd5b634e487b7160e01b600052604160045260246000fd5b600080604083850312156117f557600080fd5b8235611800816117b7565b9150602083013567ffffffffffffffff8082111561181d57600080fd5b818501915085601f83011261183157600080fd5b813581811115611843576118436117cc565b604051601f8201601f19908116603f0116810190838211818310171561186b5761186b6117cc565b8160405282815288602084870101111561188457600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b6000602082840312156118b857600080fd5b8135611609816117b7565b60005b838110156118de5781810151838201526020016118c6565b50506000910152565b600081518084526118ff8160208601602086016118c3565b601f01601f19169290920160200192915050565b60ff60f81b881681526000602060e08184015261193360e084018a6118e7565b8381036040850152611945818a6118e7565b606085018990526001600160a01b038816608086015260a0850187905284810360c0860152855180825283870192509083019060005b818110156119975783518352928401929184019160010161197b565b50909c9b505050505050505050505050565b60208152600061160960208301846118e7565b6000806000604084860312156119d157600080fd5b833567ffffffffffffffff808211156119e957600080fd5b818601915086601f8301126119fd57600080fd5b813581811115611a0c57600080fd5b8760208260051b8501011115611a2157600080fd5b60209283019550935050840135611a37816117b7565b809150509250925092565b634e487b7160e01b600052603260045260246000fd5b6000823560de19833603018112611a6e57600080fd5b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561138657611386611a78565b600060018201611ab357611ab3611a78565b5060010190565b600060208284031215611acc57600080fd5b813565ffffffffffff8116811461160957600080fd5b600060208284031215611af457600080fd5b5051919050565b600181811c90821680611b0f57607f821691505b602082108103611b2f57634e487b7160e01b600052602260045260246000fd5b50919050565b6000808335601e19843603018112611b4c57600080fd5b83018035915067ffffffffffffffff821115611b6757600080fd5b602001915036819003821315611b7c57600080fd5b9250929050565b8284823760609190911b6bffffffffffffffffffffffff19169101908152601401919050565b8183823760009101908152919050565b634e487b7160e01b600052602160045260246000fd5b601f821115610a5457600081815260208120601f850160051c81016020861015611bf65750805b601f850160051c820191505b8181101561060a57828155600101611c02565b815167ffffffffffffffff811115611c2f57611c2f6117cc565b611c4381611c3d8454611afb565b84611bcf565b602080601f831160018114611c785760008415611c605750858301515b600019600386901b1c1916600185901b17855561060a565b600085815260208120601f198616915b82811015611ca757888601518255948401946001909101908401611c88565b5085821015611cc55787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600082611cf257634e487b7160e01b600052601260045260246000fd5b500490565b60008251611a6e8184602087016118c356fea16a46d94261c7517cc8ff89f61c0ce93598e3c849801011dee649a6a557d100360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbccd5ed15c6e187e77e9aee88184c21f4f2182ab5827cb3b7e07fbedcd63f03300a264697066735822122008bcb651e18a9fd75555b5235614b69324d262083dfaae5923147092e63dd26164736f6c63430008140033";

type ForwarderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ForwarderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Forwarder__factory extends ContractFactory {
  constructor(...args: ForwarderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Forwarder & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Forwarder__factory {
    return super.connect(runner) as Forwarder__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ForwarderInterface {
    return new Interface(_abi) as ForwarderInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Forwarder {
    return new Contract(address, _abi, runner) as unknown as Forwarder;
  }
}

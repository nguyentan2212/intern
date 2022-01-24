// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CallerContractInterface.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract EthPriceOracle is AccessControlEnumerable {
    using SafeMath for uint256;

    bytes32 public constant ORACLE = keccak256("ORACLE");
    bytes32 public constant OWNER = keccak256("OWNER");

    struct Response {
        address oracleAddress;
        address callerAddress;
        uint256 ethPrice;
    }

    uint256 private randNonce = 0;
    uint256 private modulus = 1000;
    uint256 private numOracles = 0;
    uint256 private threshold = 0;

    mapping(uint256 => bool) pendingRequests;
    mapping(uint256 => Response[]) requestIdToResponse;

    event GetLatestEthPriceEvent(address callerAddress, uint256 id);
    event SetLatestEthPriceEvent(uint256 ethPrice, address callerAddress);
    event AddOracleEvent(address oracleAddress);
    event RemoveOracleEvent(address oracleAddress);
    event SetThresholdEvent(uint256 threshold);

    constructor(address _owner) {
        _setupRole(OWNER, _owner);
        _setupRole(ORACLE, _owner);
        _setRoleAdmin(ORACLE, OWNER);
    }

    function addOracle(address _oracle) public {
        require(hasRole(OWNER, msg.sender), "Not an owner!");
        require(!hasRole(ORACLE, _oracle), "Already an oracle!");

        _grantRole(ORACLE, _oracle);
        numOracles = numOracles.add(1);

        emit AddOracleEvent(_oracle);
    }

    function removeOracle(address _oracle) public {
        require(hasRole(OWNER, msg.sender), "Not an owner!");
        require(hasRole(ORACLE, _oracle), "Not an oracle!");
        require(numOracles > 1, "Do not remove the last oracle!");

        _revokeRole(ORACLE, _oracle);
        numOracles = numOracles.sub(1);

        emit RemoveOracleEvent(_oracle);
    }

    function setThreshold(uint256 _threshold) public {
        require(hasRole(OWNER, msg.sender), "Not an owner!");

        threshold = _threshold;

        emit SetThresholdEvent(threshold);
    }

    function getLatestEthPrice() public returns (uint256) {
        randNonce = randNonce.add(1);
        uint256 id = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % modulus;
        pendingRequests[id] = true;

        emit GetLatestEthPriceEvent(msg.sender, id);
        return id;
    }

    function setLatestEthPrice(uint256 _ethPrice, address _callerAddress, uint256 _id) public {
        require(hasRole(ORACLE, msg.sender), "Not an oracle!");
        require(pendingRequests[_id], "This request is not in my pending list.");
        
        Response memory resp = Response(msg.sender, _callerAddress, _ethPrice);
        requestIdToResponse[_id].push(resp);

        uint256 numResponses = requestIdToResponse[_id].length;
        if (numResponses == threshold) {
            uint256 computedEthPrice = 0;
            for (uint256 f = 0; f < requestIdToResponse[_id].length; f++) {
                computedEthPrice = computedEthPrice.add(requestIdToResponse[_id][f].ethPrice);
            }
            computedEthPrice = computedEthPrice.div(numResponses);

            delete pendingRequests[_id];
            delete requestIdToResponse[_id];

            CallerContractInterface callerContractInstance;
            callerContractInstance = CallerContractInterface(_callerAddress);
            callerContractInstance.callback(computedEthPrice, _id);
            emit SetLatestEthPriceEvent(computedEthPrice, _callerAddress);
        }
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./FlightDelay.sol";

/**
* @dev This contract creates a new smart contract with the information from the contract FlightDelay.
*/
contract InsuranceClients {

    // list of clients
    address[] public clients;

    /**
    * @dev Creates new client with the given flight ID
    * @param flightId ID of the flight
    */
    function createClient(string memory flightId) public {
        address newClient = address (new FlightDelay(flightId, msg.sender));
        clients.push(newClient);
    }

    /**
    * @dev get all deployed clients
    */
    function getDeployedClients() public view returns (address[] memory) {
        return clients;
    }

}
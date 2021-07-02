// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import "./FlightDelay.sol";

contract InsuranceClients {

    address[] public clients;

    function createClient(uint bookingId, uint flightId) public {
        address newClient = address (new FlightDelay(bookingId, flightId, msg.sender));
        clients.push(newClient);
    }

    function getDeployedClients() public view returns (address[] memory) {
        return clients;
    }

}
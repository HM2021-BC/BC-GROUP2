// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

/**
 * @author Nimra Ayub, Sofia Steinleitner, Ton Thanh Huyen Ha
 * @dev This contract reads the information of the customers from the front-end and creates a new claim based
 *      on the given information. It enables the automatic transfer of the money.
 */
contract FlightDelay {

    /**
     * Claim detail information
     */
    struct Claim {
        string flightNr;
        uint256 amount;
        string start;
        string destination;
        string date;
        string time;
        address payable client;
    }

    // list of claims
    Claim[] public claims;

    // address of the insurance company
    address public insurance_company;

    // airport of the departure
    string public start;

    // airport of the destination
    string public destination;

    // date of the flight
    string public date;

    // time of the flight
    string public time;

    // ID of the flight
    string public flightId;

    // delay must be higher than 60 minutes
    uint256 constant delay = 60;

    /**
     * @dev init claim 
     * @param owner who manages insurance
     * @param _flightId ID of the flight
     */
    constructor(string memory _flightId, address owner) public {
        insurance_company = owner;
        flightId = _flightId;
    }

    // checks if msg.sender is the address of the insurance company
    modifier companyOnly() {
        require(insurance_company == msg.sender);
        _;
    }

    /**
     * @dev Creates a claim, only the company is allowed to create claims
     * @param _flightId ID of the flight
     * @param _amount amount of the payout
     * @param _start airport of the departure
     * @param _destination airport of the destination
     * @param _date date of the flight
     * @param _time time of the flight
     * @param _client address of the client who receives the payout
     */
    function createClaim(string memory _flightId, uint256 _amount, string memory _start, string memory _destination,
                        string memory _date, string memory _time, address payable _client) public companyOnly() {
        Claim memory newClaim =
            Claim({
                flightNr: _flightId,
                amount: _amount,
                start: _start,
                destination: _destination,
                date: _date,
                time: _time,
                client: _client
            });
        claims.push(newClaim);
    }

    /**
     * @dev checks if a delay for a specific claim occured and pays a fixed amount, only the company can pay the client
     * @param actualDelay actual delay of flight in minutes
     * @param claim_id id of the claim in the list
     */
    function payout(uint256 actualDelay, uint256 claim_id) public payable companyOnly() {
        require(claim_id < claims.length, "FlightDelay: Index out-of-bound");
        Claim memory claim = claims[claim_id];

        if (actualDelay > delay) {
            claim.client.transfer(claim.amount);
        }
    }
}

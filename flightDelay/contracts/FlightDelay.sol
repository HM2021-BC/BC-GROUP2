// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract FlightDelay {
    
    struct Claim {
        string flightNr;
        uint amount;
        string start;
        string destination;
        string date;
        string time;
        address payable client;
    }

    Claim[] public claims;

    address public insurance_company;
    string public start;
    string public destination;
    string public date;
    string public time;

    string public flightId;
    uint constant delay = 60;   // 60 Minuten Verspätung

    // Constructor
    constructor(string memory _flightId,address owner) public {
        insurance_company = owner;
        flightId = _flightId;
    }

    modifier companyOnly() {
        require(insurance_company == msg.sender);
        _;
    }

    function createClaim(string memory _flightId, uint _amount,
                        string memory _start, string memory _destination, string memory _date,
                        string memory _time, address payable claim_client) public companyOnly() {
        Claim memory newClaim = Claim({
            flightNr : _flightId,
            amount : _amount,
            start : _start,
            destination : _destination,
            date : _date,
            time : _time,
            client : claim_client
        });
        claims.push(newClaim);
    }

    function payout(uint actualDelay, uint claim_id) public payable companyOnly() {
        require(claim_id < claims.length, "FlightDelay: Index out-of-bound");
        Claim memory claim = claims[claim_id];
 
        if (actualDelay > delay) {
            claim.client.transfer(claim.amount);
        }
    }





    /*function testPayout() public payable companyOnly() {
        Claim storage claim = claims[1];

        claim.client.transfer(2);
    }*/

    /*function test() public payable {
        address payable manager = msg.sender;
        manager.transfer();
    }*/

    // so funds not locked in contract forever
    //function destroy() public view { 
        
    //suicide(insurance_owner);
        
    //}
}
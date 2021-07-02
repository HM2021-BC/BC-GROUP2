// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract FlightDelay {
    
    struct Claim {
        uint bookingNr;
        uint flightNr;
        uint amount;
        address payable client;
    }

    Claim[] public claims;

    address public insurance_company;

    uint public bookingId;
    uint public flightId;
    uint constant delay = 60;   // 60 Minuten Verspätung

    // Constructor
    constructor(uint client_bookingId, uint client_flightId, address owner) public {
        insurance_company = owner;
        bookingId = client_bookingId;
        flightId = client_flightId;
    }

    modifier companyOnly() {
        require(msg.sender == insurance_company);
        _;
    }

    function createClaim(uint claim_bookingId, uint claim_flightId, uint claim_amount, address payable claim_client) public companyOnly() {
        Claim memory newClaim = Claim({
            bookingNr : claim_bookingId,
            flightNr : claim_flightId,
            amount : claim_amount,
            client : claim_client
        });
        claims.push(newClaim);
    }

    // Funktion, die die Verspätung in Minuten einliest und den richtigen Payment Code zuweist
    function payout(uint actualDelay, uint claim_id) public payable companyOnly() {
        Claim storage claim = claims[claim_id];

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
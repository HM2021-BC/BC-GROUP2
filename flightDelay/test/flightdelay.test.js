const FlightDelay = artifacts.require("./FlightDelay.sol");
const InsuranceClients = artifacts.require("./InsuranceClients.sol");

let clientCreator;
let clientAddress;
let client;

before(async () => {
	clientCreator = await InsuranceClients.new()

	var flightId = '10001';
	var bookingId = '20002';
	var amount = '1000000000';
    
	await clientCreator.createClient(bookingId, flightId);
   	 
	clientAddress = await clientCreator.getDeployedClients.call();
    
	client = await FlightDelay.at(clientAddress[0]);
});

contract("FlightDelay test", (accounts) => {
	it('client has an address', async () => {
    	assert.ok(clientAddress);
	});

	it('has a company', async () => {
		var companyAddress = await client.insurance_company.call();
    	assert.equal(companyAddress, accounts[0]);
	});

	it('client has bookingId', async () => {
    	bookingId = await client.bookingId.call(); 	 
    	assert.ok(bookingId);
	});

	it('client has flightId', async () => {
    	flightId = await client.flightId.call(); 	 
    	assert.ok(flightId);
	});

	it('allows creation of a claim by insurance_company', async () => {
    	var bookingId = '20003';
		var flightId = '10004';
		var amount = '2000000000';
    	var customer = accounts[9];
   	 
    	await client.createClaim(bookingId, flightId, amount, customer,
                            	{ from: accounts[0] });             	 
		var claim = await client.claims.call(0);
		

    	assert(claim);
	});

	it('restricts creation of claim if not company', async () =>{
		var bookingId = '20007';
		var flightId = '10010';
		var amount = '2000000000';
		var customer = accounts[9];
		
		try {
			await client.createClaim(bookingId, flightId, amount, customer,
									{from: accounts[1]});
			assert(false);
		} catch (error) {
			assert(error);
		}
	});

	it('allows company to pay client', async () => {
		var delay = '70';

		var companyBalance =  
	    await web3.eth.getBalance(accounts[0], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance company: ' + result)
			}
		});

		var clientBalance =  
	    await web3.eth.getBalance(accounts[1], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance client: ' + result)
			}
		});
		var claim = await client.claims.call(0);
		var payedClaim = claim[2];
		console.log('Payedclaim: ' + payedClaim)


		var company = accounts[0];
		await client.payout(delay, 1, {from: company});

		assert(payedClaim);
	});

	/*it('allows company to pay client', async () => {
		var beforeBalance =  
	    await web3.eth.getBalance(accounts[0], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance before: ' + result)
			}
		});

		var amount = 20000;
		var claim = await client.claims.call(0);
		var amountToReceive = claim[2].toNumber();

		console.log('account 9: ' + accounts[9])

		await client.testPayout({from: accounts[0], value: amount});
		
		var afterBalance =  
	    await web3.eth.getBalance(accounts[0], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance after: ' + result)
			}
		});

		

		console.log('Amount to receive: ' + amountToReceive)
		assert.ok(beforeBalance > afterBalance);
	});*/

})
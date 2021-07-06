const FlightDelay = artifacts.require("./FlightDelay.sol");
const InsuranceClients = artifacts.require("./InsuranceClients.sol");

let clientCreator;
let clientAddress;
let client;

before(async () => {
	clientCreator = await InsuranceClients.new()

	var flightId = '10001';
    
	await clientCreator.createClient(flightId);
   	 
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

	it('client has flightId', async () => {
    	flightId = await client.flightId.call(); 	 
    	assert.ok(flightId);
	});

	it('allows creation of a claim by insurance_company', async () => {
		var flightId = '10004';
		var amount = '200000';
		var start = 'MUC';
		var destination = 'AMS';
		var date = '2021-07-05';
		var time = '10:30';
    	var customer = accounts[9];
   	 
    	await client.createClaim(flightId, amount, start, destination, date, time, customer, { from: accounts[0] });             	 
		var claim = await client.claims.call(0);
		

    	assert(claim);
	});

	it('allows creation of a claim by insurance_company', async () => {
		var flightId = '10006';
		var amount = '200000';
		var start = 'MUC';
		var destination = 'AMS';
		var date = '2021-07-05';
		var time = '10:30';
    	var customer = accounts[8];
   	 
    	await client.createClaim(flightId, amount, start, destination, date, time, customer, { from: accounts[0] });             	 
		var claim = await client.claims.call(0);
		

    	assert(claim);
	});

	it('restricts creation of claim if not company', async () =>{
		var flightId = '10010';
		var amount = '200000';
		var start = 'MUC';
		var destination = 'AMS';
		var date = '2021-07-05';
		var time = '10:30';
		var customer = accounts[9];
		
		try {
			await client.createClaim(flightId, amount, start, destination, date, time, customer, {from: accounts[1]});
			assert(false);
		} catch (error) {
			assert(error);
		}
	});

	it('allows company to pay client', async () => {
		var delay = '70';

		var companyBalanceBefore =  
	    await web3.eth.getBalance(accounts[0], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance company before: ' + result)
			}
		});

		var claim = await client.claims.call(0);
		var payedClaim = claim[1];
		console.log('Payedclaim: ' + payedClaim)


		var company = accounts[0];
		await client.payout(delay, 0, {from: company});

		var companyBalanceAfter =  
	    await web3.eth.getBalance(accounts[0], function(err, result) {
			if (err) {
			  console.log(err)
			} else {
			  console.log('Balance company after: ' + result)
			}
		});

		assert(payedClaim);
	});

})
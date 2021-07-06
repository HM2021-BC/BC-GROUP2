import web3 from './web3';
import Client from './build/contracts/InsuranceClients.json';

export default address => {
  return new web3.eth.Contract(Client.abi, address);
};
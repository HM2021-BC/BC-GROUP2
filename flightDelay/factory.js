import web3 from './web3';
import ClientFactory from './build/contracts/InsuranceClients.json';

const clientFactoryAddress = "0xb4fB65e076e0F4F6E2e252e6a18CBF594508B4ce";

const instance = new web3.eth.Contract(ClientFactory.abi, clientFactoryAddress);

export default instance;
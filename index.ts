import { ethers } from "ethers";

// Main function
export async function main(contractAddress: string, signer: ethers.Wallet) {
  // Create contract instance
  
  const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"addAddressToWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address[]","name":"users","type":"address[]"}],"name":"addAddressesToWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"removeAddressFromWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address[]","name":"users","type":"address[]"}],"name":"removeAddressesFromWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const vaultWhitelist = new ethers.Contract(contractAddress, ABI, signer);

  // const tx = await priceOracle.setAssetPrice('0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 268047349837000);
  // console.log(`Set Asset Price`);
  // return tx;
}

// To run locally
if (require.main === module) {
  require('dotenv').config();
  const { PRIVATE_KEY, RPC_URL, VAULT_WHITELIST: contractAddress } = process.env;
  const provider = ethers.getDefaultProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  main(contractAddress, signer)
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
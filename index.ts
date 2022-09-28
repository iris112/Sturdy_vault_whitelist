import { ContractTransaction, ethers } from "ethers";
import fs from "fs";
import chunk from "chunk";

require('dotenv').config();

// Main function
export async function main(
  signer: ethers.Wallet, 
  whitelistContract: string, 
  vaultContract: string, 
  data: Array<Array<string>>
) {
  // Create contract instance
  const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"addAddressToWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address[]","name":"users","type":"address[]"}],"name":"addAddressesToWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address","name":"user","type":"address"}],"name":"removeAddressFromWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"vault","type":"address"},{"internalType":"address[]","name":"users","type":"address[]"}],"name":"removeAddressesFromWhitelist","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const vaultWhitelist = new ethers.Contract(whitelistContract, ABI, signer);

  for (let i = 0; i < data.length; i++) {
    console.log(data[i][0]);
    let tx:ContractTransaction = await vaultWhitelist.addAddressesToWhitelist(vaultContract, data[i], { gasPrice: 40 * 10 ** 9 });
    await tx.wait(2);
  }
}

// To run locally
if (require.main === module) {
  const { PRIVATE_KEY, RPC_URL, VAULT_WHITELIST, VAULT } = process.env as {[key: string]: string};
  const provider = ethers.getDefaultProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  var data = fs.readFileSync('addresses.csv')
    .toString()
    .split('\n')
    .map(e => e.trim())

  main(signer, VAULT_WHITELIST, VAULT, chunk(data, 160))
    .then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
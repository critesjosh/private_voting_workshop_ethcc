// src/deploy.mjs
import { Contract, loadContractArtifact, createPXEClient } from '@aztec/aztec.js';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import VotingContractJson from "./target/private_voting-EasyPrivateVoting.json" assert { type: "json" };

const { PXE_URL = 'http://localhost:8080' } = process.env;

async function main() {
    const pxe = createPXEClient(PXE_URL);
    const [ownerWallet] = await getInitialTestAccountsWallets(pxe);
    const ownerAddress = ownerWallet.getCompleteAddress();

    const VotingContractArtifact = loadContractArtifact(VotingContractJson);
    const votingContract = await Contract.deploy(ownerWallet, VotingContractArtifact, [ownerAddress])
        .send()
        .deployed();

    console.log(`Voting contract deployed at ${votingContract.address.toString()}`);
}

main().catch((err) => {
    console.error(`Error in deployment script: ${err}`);
    process.exit(1);
});
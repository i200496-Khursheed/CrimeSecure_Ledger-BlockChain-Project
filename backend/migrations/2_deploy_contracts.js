// migrations/2_deploy_contracts.js
const CriminalRecord = artifacts.require("CriminalRecord");

module.exports = async function (deployer) {
  try {
    console.log("Deploying CriminalRecord...");
    await deployer.deploy(CriminalRecord);
    const criminalRecordInstance = await CriminalRecord.deployed();
    console.log("CriminalRecord deployed at:", criminalRecordInstance.address);
  } catch (error) {
    console.error("Error during deployment:", error);
  }
};

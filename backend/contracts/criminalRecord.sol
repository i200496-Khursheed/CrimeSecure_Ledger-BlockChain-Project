// contracts/CriminalRecord.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CriminalRecord {
    struct Crime {
        string name;
        string crime;
        uint256 age;
        string status;
        string image;
    }

    mapping(uint256 => Crime) public crimes;
    uint256 public crimeCount;

    constructor() {
        // You can initialize any default values here
        // For example, set crimeCount to 0
        crimeCount = 0;
    }

    function addCrime(string memory name, string memory crime, uint256 age, string memory status, string memory image) public {
        crimeCount++;
        crimes[crimeCount] = Crime(name, crime, age, status, image);
    }
}

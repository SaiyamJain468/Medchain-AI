// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DrugRegistry {
    address public owner;

    struct SupplyChainStep {
        string location;
        uint256 timestamp;
        string handler;
        string status;
    }

    struct DrugBatch {
        string batchId;
        string drugName;
        string manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        bool isRegistered;
        SupplyChainStep[] supplyChainSteps;
    }

    // Mapping from batchId to DrugBatch
    mapping(string => DrugBatch) private batches;
    
    // Mapping of authorized manufacturers who can register batches
    mapping(address => bool) public authorizedManufacturers;

    event BatchRegistered(string indexed batchId, string drugName, string manufacturer);
    event SupplyChainStepAdded(string indexed batchId, string location, string status);
    event ManufacturerAuthorized(address indexed manufacturer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedManufacturers[msg.sender] || msg.sender == owner, "Not authorized to register drugs");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedManufacturers[msg.sender] = true;
    }

    function authorizeManufacturer(address _manufacturer) external onlyOwner {
        authorizedManufacturers[_manufacturer] = true;
        emit ManufacturerAuthorized(_manufacturer);
    }

    function registerBatch(
        string memory _batchId,
        string memory _drugName,
        string memory _manufacturer,
        uint256 _manufactureDate,
        uint256 _expiryDate,
        string memory _initialLocation
    ) external onlyAuthorized {
        require(!batches[_batchId].isRegistered, "Batch already registered");

        DrugBatch storage newBatch = batches[_batchId];
        newBatch.batchId = _batchId;
        newBatch.drugName = _drugName;
        newBatch.manufacturer = _manufacturer;
        newBatch.manufactureDate = _manufactureDate;
        newBatch.expiryDate = _expiryDate;
        newBatch.isRegistered = true;

        newBatch.supplyChainSteps.push(SupplyChainStep({
            location: _initialLocation,
            timestamp: block.timestamp,
            handler: _manufacturer,
            status: "Manufactured"
        }));

        emit BatchRegistered(_batchId, _drugName, _manufacturer);
    }

    function addSupplyChainStep(
        string memory _batchId,
        string memory _location,
        string memory _handler,
        string memory _status
    ) external onlyAuthorized {
        require(batches[_batchId].isRegistered, "Batch not registered");

        batches[_batchId].supplyChainSteps.push(SupplyChainStep({
            location: _location,
            timestamp: block.timestamp,
            handler: _handler,
            status: _status
        }));

        emit SupplyChainStepAdded(_batchId, _location, _status);
    }

    function getBatchInfo(string memory _batchId) external view returns (
        string memory drugName,
        string memory manufacturer,
        uint256 manufactureDate,
        uint256 expiryDate,
        bool isRegistered
    ) {
        require(batches[_batchId].isRegistered, "Batch not registered");
        DrugBatch storage batch = batches[_batchId];
        return (
            batch.drugName,
            batch.manufacturer,
            batch.manufactureDate,
            batch.expiryDate,
            batch.isRegistered
        );
    }

    function getSupplyChainSteps(string memory _batchId) external view returns (SupplyChainStep[] memory) {
        require(batches[_batchId].isRegistered, "Batch not registered");
        return batches[_batchId].supplyChainSteps;
    }
}

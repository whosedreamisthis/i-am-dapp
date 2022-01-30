// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract SeekerToken is ERC721, Ownable {
    uint256 COUNTER = 0;
    uint256 mintFee = 0.01 ether;

    struct Seeker {
        uint256 id;
        string uri;
    }

    mapping(uint256 => string) tokenURIs;

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        tokenURIs[_tokenId] = _tokenURI;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId));
        string memory _tokenURI = tokenURIs[_tokenId];
        return _tokenURI;
    }

    event NewSeeker(address indexed owner, uint256 id, string uri);

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    // Helpers
    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNum % _mod;
    }

    function updateMintFee(uint256 newFee) external onlyOwner {
        mintFee = newFee;
    }

    // Creation
    function _createSeeker(string memory _uri) internal {
        _safeMint(msg.sender, COUNTER);
        _setTokenURI(COUNTER, _uri);
        emit NewSeeker(msg.sender, COUNTER, _uri);
        COUNTER++;
    }

    function mint(string memory _uri) public payable {
        require(msg.value >= mintFee, "Insufficient funds.");
        _createSeeker(_uri);
    }

    // Getters
    function getAllSeekers() public view returns (Seeker[] memory) {
        uint256 latestId = COUNTER;
        uint256 counter = 0;

        Seeker[] memory res = new Seeker[](latestId);
        for (uint256 i = 0; i < latestId; i++) {
            if (_exists(counter)) {
                string memory uri = tokenURI(counter);
                res[counter] = Seeker(counter, uri);
            }
            counter++;
        }
        return res;
    }

    function getOwnerSeekers() public view returns (Seeker[] memory) {
        uint256 latestId = COUNTER;
        uint256 counter = 0;

        Seeker[] memory res = new Seeker[](latestId);
        for (uint256 i = 0; i < latestId; i++) {
            if (_exists(counter) && ownerOf(counter) == msg.sender) {
                string memory uri = tokenURI(counter);
                res[counter] = Seeker(counter, uri);
            }
            counter++;
        }
        return res;
    }

    function withdraw() external payable onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }
}

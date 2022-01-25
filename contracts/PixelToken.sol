// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelToken is ERC721, Ownable {
    uint256 COUNTER = 0;
    uint256 fee = 1 ether;

    struct Pixel {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Pixel[] public pixels;
    event NewPixel(address indexed owner, uint256 id, uint256 dna);

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

    function updateFee(uint256 newFee) external onlyOwner {
        fee = newFee;
    }

    // Creation
    function _createPixel(string memory _name) internal {
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);

        Pixel memory newPixel = Pixel(_name, COUNTER, randDna, 1, randRarity);
        pixels.push(newPixel);
        _safeMint(msg.sender, COUNTER);
        emit NewPixel(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    function createRandomPixel(string memory _name) public payable {
        require(msg.value >= fee, "Insufficient funds.");
        _createPixel(_name);
    }

    // Getters
    function getPixels() public view returns (Pixel[] memory) {
        return pixels;
    }

    function getOwnerPixels(address _owner)
        public
        view
        returns (Pixel[] memory) {
            Pixel[] memory result = result = new Pixel[](balanceOf(_owner));
            uint256 counter = 0;

            for (uint256 i = 0; i < i < pixels.length; i++ {
                if (ownerOf(i) == _owner) {
                    result[counter] = pixels[i];
                    counter++;
                }
            }
            return result;
        }
    {}

    function withdraw() external payable onlyOwner {
        address _owner = owner();
        payable(_owner).transfer(address(this).balance);
    }
}

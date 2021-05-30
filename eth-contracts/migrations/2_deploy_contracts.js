// migrating the appropriate contracts
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");


module.exports = function (deployer) {

    
    let name = 'House Token'
    let symbol = 'HTKN'
    
    deployer.deploy(ERC721Mintable, name, symbol);
    deployer.deploy(Verifier)
        .then(() => {
        return deployer.deploy(SolnSquareVerifier, Verifier.address, name, symbol)
        });

};

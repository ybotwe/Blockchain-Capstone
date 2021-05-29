var ERC721Mintable = artifacts.require('ERC721Mintable');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const name = "HouseToken";
    const symbol = "HTKN";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new(name, symbol,{from: account_one});

            // TODO: mint multiple tokens
            for (let i = 1; i <= 5; i++){
                await this.contract.mint(account_one, i);
            }
        })

        it('should return name of token', async function () { 
            let result = await this.contract.name();
            assert.equal(result, name, "Name is not correct");
        })

        it('should return symbol of token', async function () { 
            let result = await this.contract.symbol();
            assert.equal(result, symbol, "Symbol is not correct");
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply();
            assert.equal(result, 5, "Total supply is not correct");
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(account_one);
            assert.equal(result, 5, "Balance of account is not correct");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = "1";
            const tokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1";
            let result = await this.contract.tokenURI(tokenId);
            assert.equal(result, tokenURI, "Return tokenURI isn't correct");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = "1";
            await this.contract.transferFrom(account_one, account_two, tokenId);
            let result = await this.contract.ownerOf(tokenId);
            assert.equal(result, account_two, "Ownership not Transferred");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new(name, symbol,{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let assertStatus = false;
            let tokenId = "6";
            try{
                await this.contract.mint( account_two, tokenId,{from: account_two});
            }
            catch(e){
                assertStatus = true;
            }
            assert.equal( assertStatus, true,"Not only contract owner can mint");
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.owner();
            assert.equal(result, account_one,"Contract owner not correct");
        })

    });
})
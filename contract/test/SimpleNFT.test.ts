import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

const NAME = 'SimpleNFT'
const SYMBOL = 'SNFT'

describe('SimpleNFT', function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, attacker] = await ethers.getSigners()

    const SimpleNFT = await ethers.getContractFactory('SimpleNFT')
    const nft = await SimpleNFT.deploy(NAME, SYMBOL)

    return { nft, owner, otherAccount, attacker }
  }

  describe('Deployment', function () {
    it('total supply should be zero', async function () {
      const { nft } = await loadFixture(deployFixture)
      expect(await nft.totalSupply()).to.equal('0')
    })
  })

  describe('mint', function () {
    it('succeed: called by owner', async function () {
      const { nft, otherAccount } = await loadFixture(deployFixture)

      // mint
      const tokenId = '123'
      const uri = 'token-id-123'
      await expect(nft.mint(otherAccount, tokenId, uri)).not.to.be.reverted

      // check the balance
      expect(await nft.ownerOf(tokenId)).to.equal(otherAccount)

      // check the total supply
      expect(await nft.totalSupply()).to.equal('1')

      // check token uri
      expect(await nft.tokenURI(tokenId)).to.equal(`${NAME}|${uri}`)
    })

    it('fail: called by attacker', async function () {
      const { nft, attacker } = await loadFixture(deployFixture)
      const tokenId = '123'
      const uri = 'token-id-123'

      await expect(nft.connect(attacker).mint(attacker, tokenId, uri))
        .to.be.revertedWithCustomError(nft, 'OwnableUnauthorizedAccount')
        .withArgs(attacker)
    })
  })
})

import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

const NAME = 'ERC20Capped'
const SYMBOL = 'CERC2'
const CAP = 1000

describe('ERC20Capped', function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, attacker] = await ethers.getSigners()

    const ERC20Capped = await ethers.getContractFactory('ERC20Capped')
    const erc20 = await ERC20Capped.deploy(NAME, SYMBOL, CAP)

    return { erc20, owner, otherAccount, attacker }
  }

  describe('Deployment', function () {
    it('Should set cap', async function () {
      const { erc20 } = await loadFixture(deployFixture)
      const decimals = await erc20.decimals()
      const expectedCap = BigInt(CAP) * BigInt(10) ** decimals

      expect(await erc20.cap()).to.equal(expectedCap)
    })
  })

  describe('mint', function () {
    it('succeed: called by owner', async function () {
      const { erc20, otherAccount } = await loadFixture(deployFixture)

      // mint
      const decimals = await erc20.decimals()
      const amount = BigInt('123') * BigInt(10) ** decimals
      await expect(erc20.mint(otherAccount, amount)).not.to.be.reverted

      // check the balance
      expect(await erc20.balanceOf(otherAccount)).to.equal(amount)
    })

    it('fail: over cap', async function () {
      const { erc20, attacker } = await loadFixture(deployFixture)
      const decimals = await erc20.decimals()
      const capPlusOne = BigInt(CAP) * BigInt(10) ** decimals + BigInt(1)

      await expect(erc20.mint(attacker, capPlusOne)).to.be.rejectedWith('ERC20Capped: cap exceeded')
    })

    it('fail: called by attacker', async function () {
      const { erc20, attacker } = await loadFixture(deployFixture)
      const decimals = await erc20.decimals()
      const amount = BigInt('123') * BigInt(10) ** decimals

      await expect(erc20.connect(attacker).mint(attacker, amount))
        .to.be.revertedWithCustomError(erc20, 'OwnableUnauthorizedAccount')
        .withArgs(attacker)
    })
  })
})

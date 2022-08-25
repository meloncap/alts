import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import logo from '/public/assets/img/logos/home_banner.png'
import Link from 'next/link'

export default function Index() {

    <Head>
        <title>AltSearch - Home</title>
    </Head>

    return (
        <div className="row">
            <div className='row mx-auto'>
                <div className="card card-plain mb-2">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"> Welcome to AltSearch</h2>
                                    <span className="text-sm mt-1">The all-in-one app to run security analysis of your favorite crypto projects.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mx-auto mb-4'>
                <div className='col-12' style={{ borderRadius: 12, overflow: 'hidden' }}>
                    <Image src={logo} width={1920} height={200} />
                </div>
            </div>

            <div className='row mx-auto'>
                <div className='col-12'>
                    <p className='text-justify'>Blockchain provides huge benefits when it comes to transparency and traceability. The AltSearch team is building an easy-to-use tool for crypto users so they
                        can analyse their projects and retrieve all the information in one app. As of now, only Ethereum and BNB Chain networks are supported - more coming soon!.
                    </p>
                    <p className='text-justify'>We currently fetch the data from different API endpoints such as <Link href={'https://www.coingecko.com'}><a title='CoinGecko website'>CoinGecko</a></Link>,
                        <Link href={'https://www.covalenthq.com'}><a title='Covalent website'> Covalent</a></Link>, <Link href={'https://thegraph.com/'}><a title='The Graph website'>The Graph</a></Link> and
                        <Link href={'https://gopluslabs.io'}><a title='Go+ Security website'> Go+ Security</a></Link>, among others.
                        In the near future more endpoints and tools will be integrated in order to offer a more complete tool for your analysis.
                    </p>
                    <p className='text-justify'>If you access our <Link href={'/analysis/basic'}><a title='Analysis Page'><strong>analysis</strong></a></Link> page and search your project (by name, symbol or contract address) you'll get
                        the following information:
                    </p>
                    <ol>
                        <li><Link href={'/analysis/basic'}><a title='Advanced Analysis Page'><strong>Basic Analysis</strong></a></Link></li>
                        <ul>
                            <li className='text-justify'><strong>General information</strong>: data retrieved from <Link href={'https://www.coingecko.com'}><a title='CoinGecko website'>CoinGecko</a></Link> such as the project's rank, categories, social links, liquidity score, and the price and volume history in the last 30 days, among others. </li>
                            <li className='text-justify'><strong>Tokenomics</strong>: check the token's supply, track the top holders distribution and the latest holders transactions.</li>
                            <li className='text-justify'><strong>Pools stats</strong>: a list of the pools where you can trade the token on the different Decentralised Exchanges. Compare statistics such as liquidity, volume, number of swaps etc.</li>
                            <li className='text-justify'>More cooming soon!</li>
                        </ul>
                    </ol>
                    <ol>
                        <li><Link href={'/analysis/advanced'}><a title='Advanced Analysis Page'><strong>Advanced Analysis</strong></a></Link></li>
                        <ul>
                            <li className='text-justify'><strong>Security information</strong>: data retrieved from <Link href={'https://gopluslabs.io'}><a title='Go+ Security website'>Go+ Security</a></Link> about the contract's information such as wether it's a Honeypot, or it has Anti Whale measures or Mintable Function etc</li>
                            <li className='text-justify'><strong>Source code</strong>: the ABI and smart contract code obtained from <Link href={'https://etherscan.io/'}><a title='Etherscan website'>Etherscan</a></Link> and <Link href={'https://bscscan.com/'}><a title='BscScan website'>BscScan</a></Link>.</li>
                            <li className='text-justify'>More cooming soon!</li>
                        </ul>
                    </ol>

                </div>
            </div>

            <div className='row mx-auto'>
                <div className='col-12'>
                    <p className='text-justify'>This is a Beta version so you might expect to find some minor issues - we're working on fixing them to improve the end-user experience.</p>
                    <p className='text-justify'>Follow us on <Link href={'https://twitter.com/AltSearchApp'}><a title='@AltSearchApp'><strong>Twitter</strong></a></Link> to stay up-to-date on the latest features. Our DMs are always open, we're more than
                        happy to listen to your feedback to improve our app!
                    </p>
                </div>
            </div>

        </div>
    )

}
import Head from 'next/head'
import React from 'react'
import TopMC24hContainer from '../../components/markets/TopMC24hContainer'
import TopMCATHContainer from '../../components/markets/TopMCATHContainer'
import { coinsNotToShow } from '../../constants/global'

export default function Index({ listOfTopMarketCap }) {

    return (
        <>
            <Head>
                <title>AltSearch - Markets</title>
            </Head>

            <TopMC24hContainer listOfTopMarketCap={listOfTopMarketCap} notToShow={coinsNotToShow} />
            <TopMCATHContainer listOfTopMarketCap={listOfTopMarketCap} notToShow={coinsNotToShow} />
        </>
    )

}

export async function getServerSideProps(context) {

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`;
    var listOfTopMarketCap = null;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            //Show an error
            console.log(res);
        } else {
            listOfTopMarketCap = await res.json();
        }

    } catch (error) {
        console.log(error);
    }


    return {
        props: { listOfTopMarketCap },
    }
}
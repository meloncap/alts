import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import useAppContext from '../../Context'
import { GiMoneyStack } from "react-icons/gi"
import { MdOutlineChangeCircle } from "react-icons/md"
import { AiFillCaretDown, AiOutlineQuestionCircle, AiOutlineDollarCircle } from "react-icons/ai"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { FcInfo } from "react-icons/fc"
import { visualizeAnalysisSection, convertToFullDateMarketData, getTokenExplorerUrl } from '../../../services/myjs'
import { addCommasToNumber } from '../../../services/myjs'
import MarketData from './MarketData'
import supportedChainsCovalent from '../../../public/supportedChainsCovalent.json'
import ProjectSocialLinks from './ProjectSocialLinks';

function GeneralInfo() {

    const { projectInfoCG, userProject } = useAppContext()
    const [chainImage, setChainImage] = useState(false)


    var github_link;

    useEffect(() => {
        if (!projectInfoCG.info) return;
        Object.entries(projectInfoCG.info.links.repos_url).map(([key, value]) => { if (key == "github") github_link = value[0] })
    }, [projectInfoCG])

    useEffect(() => {
        if (!userProject.network) return;
        Object.entries(supportedChainsCovalent).map(([key, value]) => { if (supportedChainsCovalent[key].chain_id == userProject.network.chain_id) setChainImage(supportedChainsCovalent[key].logo_url) })
    }, [userProject])

    return projectInfoCG.info ? (
        <div id='general-info' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className='row justify-content-between'>
                            <div className='col-lg-10 d-flex flex-row col-12 justify-content-start'>
                                <div className='rounded me-1 pt-1' style={{ height: "fit-content" }}>
                                    {chainImage &&
                                        <Image src={chainImage} width={30} height={30} />
                                    }
                                </div>
                                <div className='rounded'>
                                    {projectInfoCG.info.image && projectInfoCG.info.image.small && projectInfoCG.info.symbol ?
                                        <Image src={projectInfoCG.info.image.small} width={40} height={40} /> : <AiOutlineQuestionCircle />
                                    }
                                </div>
                                <Link href={`https://www.coingecko.com/en/coins/${projectInfoCG.info.id}`}>
                                    <a target={"_blank"}><h3 className="text-dark mb-0 up ms-2">{projectInfoCG.info.name}</h3></a>
                                </Link>
                                <span className="badge badge-lg d-block bg-gradient-dark up align-middle mt-1 ms-2 d-md-block d-none" style={{ height: "fit-content" }}>${projectInfoCG.info.symbol.toUpperCase()}</span>
                                <div className="d-flex flex-column h-100 analysis-title-div expanded" onClick={() => visualizeAnalysisSection("general-info")} style={{ cursor: "pointer" }}>
                                    <h3 className="text-dark mb-0 up ms-2"><AiFillCaretDown className='show-hide-arrow-section' color='33374d' /></h3>
                                </div>
                            </div>
                            <ProjectSocialLinks projectInfo={projectInfoCG.info} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 analysis-div-content">
                {projectInfoCG.info.categories &&
                    <div className='row d-flex flex-row justify-content-start mb-2 align-middle mx-auto mb-2'>
                        <span className="badge badge-lg bg-gradient-dark up mx-1 my-2" style={{ fontSize: 10, width: "fit-content" }}>Rank #{projectInfoCG.info.market_cap_rank}</span>
                        {
                            projectInfoCG.info.categories.map((category, idx) =>
                            (
                                <span key={idx} className="badge badge-lg bg-gradient-dark up mx-1 my-2" style={{ fontSize: 10, width: "fit-content" }}>{category}</span>
                            ))
                        }
                    </div>
                }
                <div className="row">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <MarketData style={{ zIndex: 1 }} />
                        </div>
                        <div className="col-lg-4 col-12 mt-4 mt-lg-0 ">
                            <div className='row'>

                                <div className='col-lg-auto col-md-6 col-12 my-3  mt-lg-0 mt-2'>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div>
                                                    <Image src={"https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png"} width={48} height={48} />
                                                </div>
                                                <div className="ms-3">
                                                    <div className="numbers d-flex d-row justify-content-between">
                                                        <div>
                                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Rank</p>
                                                            <h5 className="font-weight-bolder mb-0">
                                                                {projectInfoCG.info.coingecko_rank}
                                                            </h5>
                                                        </div>
                                                        <div className='ms-4 text-end'>
                                                            <p className="text-sm mb-0 text-capitalize font-weight-bold">Score</p>
                                                            <h5 className="font-weight-bolder mb-0">
                                                                {projectInfoCG.info.coingecko_score.toFixed(0)}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-auto col-md-6 col-12 my-3 mt-lg-0 mt-2'>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-dark text-center border-radius-md d-flex align-items-center justify-content-center" >
                                                        <div className="text-lg opacity-10 d-flex align-items-center justify-content-center" >
                                                            <AiOutlineDollarCircle color={"#fff"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Price</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            ${projectInfoCG.info.market_data.current_price.usd < 1 ? projectInfoCG.info.market_data.current_price.usd.toFixed(3)
                                                                : projectInfoCG.info.market_data.current_price.usd.toFixed(2)}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-auto col-md-6 col-12 my-3 mt-lg-0 mt-2'>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-dark text-center border-radius-md d-flex align-items-center justify-content-center" >
                                                        <div className="text-lg opacity-10 d-flex align-items-center justify-content-center" >
                                                            <GiMoneyStack color={"#fff"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ms-3">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Market Cap Rank</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            {projectInfoCG.info.market_cap_rank}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-auto col-md-6 col-12 my-3 mt-lg-0 mt-2'>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-dark text-center border-radius-md d-flex align-items-center justify-content-center" >
                                                        <div className="text-lg opacity-10 d-flex align-items-center justify-content-center" >
                                                            <MdOutlineChangeCircle color={"#fff"} />
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="ms-3">
                                                    <div className="numbers">
                                                        <p className="text-sm mb-0 text-capitalize font-weight-bold">Liquidity Score</p>
                                                        <h5 className="font-weight-bolder mb-0">
                                                            {projectInfoCG.info.liquidity_score.toFixed(0)}/100
                                                            {/* <span className={`${(percentage > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>{percentage > 0 ? "+" : ""}{percentage.toFixed(2)}%</span> */}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='col-12 mx-1 my-3 mt-lg-0 mt-2'>
                                    <div className="card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div className="numbers">
                                                    <p className="text-sm mb-0 text-capitalize font-weight-bold">Token Address</p>
                                                    <Link href={`${getTokenExplorerUrl(userProject.network.chain_id, userProject.input)}`}>
                                                        <a target={'_blank'}>
                                                            <h5 className="font-weight-bolder mb-0">
                                                                <span className="address-text font-weight-bolder">{userProject.input}</span>
                                                            </h5>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="row mt-4">
                        {projectInfoCG.info &&
                            <>
                                <div className="col-lg-4 col-12 col-12">
                                    <div className="card ">
                                        <div className="card-header pb-0 p-3">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-2">Price Change Percentage</h6>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-items-center ">
                                                <tbody>
                                                    <tr>
                                                        {projectInfoCG.info.market_data.price_change_percentage_24h != 0 && projectInfoCG.info.market_data.price_change_percentage_24h != null &&
                                                            <td>
                                                                <div className="text-center">
                                                                    <p className="text-xs font-weight-bold mb-0">24h:</p>
                                                                    <h5 className="font-weight-bolder mb-0">
                                                                        <span className={`${(projectInfoCG.info.market_data.price_change_percentage_24h > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                            {projectInfoCG.info.market_data.price_change_percentage_24h > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                                                                    </h5>
                                                                </div>
                                                            </td>
                                                        }
                                                        {projectInfoCG.info.market_data.price_change_percentage_7d != 0 && projectInfoCG.info.market_data.price_change_percentage_7d != null &&
                                                            <td>
                                                                <div className="text-center">
                                                                    <p className="text-xs font-weight-bold mb-0">7d:</p>
                                                                    <h5 className="font-weight-bolder mb-0">
                                                                        <span className={`${(projectInfoCG.info.market_data.price_change_percentage_7d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                            {projectInfoCG.info.market_data.price_change_percentage_7d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_7d.toFixed(2)}%</span>
                                                                    </h5>
                                                                </div>
                                                            </td>
                                                        }

                                                        {projectInfoCG.info.market_data.price_change_percentage_30d != 0 && projectInfoCG.info.market_data.price_change_percentage_30d != null &&
                                                            <td className="align-middle text-sm">
                                                                <div className="col text-center">
                                                                    <p className="text-xs font-weight-bold mb-0">30d:</p>
                                                                    <h5 className="font-weight-bolder mb-0">
                                                                        <span className={`${(projectInfoCG.info.market_data.price_change_percentage_30d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                            {projectInfoCG.info.market_data.price_change_percentage_30d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_30d.toFixed(2)}%</span>
                                                                    </h5>
                                                                </div>
                                                            </td>
                                                        }
                                                        {projectInfoCG.info.market_data.price_change_percentage_60d != 0 && projectInfoCG.info.market_data.price_change_percentage_60d != null &&
                                                            <td className="align-middle text-sm">
                                                                <div className="col text-center">
                                                                    <p className="text-xs font-weight-bold mb-0">60d:</p>
                                                                    <h5 className="font-weight-bolder mb-0">
                                                                        <span className={`${(projectInfoCG.info.market_data.price_change_percentage_60d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                            {projectInfoCG.info.market_data.price_change_percentage_60d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_60d.toFixed(2)}%</span>
                                                                    </h5>
                                                                </div>
                                                            </td>
                                                        }
                                                        {projectInfoCG.info.market_data.price_change_percentage_200d != 0 && projectInfoCG.info.market_data.price_change_percentage_200d != null &&
                                                            <td className="align-middle text-sm">
                                                                <div className="col text-center">
                                                                    <p className="text-xs font-weight-bold mb-0">200d:</p>
                                                                    <h5 className="font-weight-bolder mb-0">
                                                                        <span className={`${(projectInfoCG.info.market_data.price_change_percentage_200d > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                            {projectInfoCG.info.market_data.price_change_percentage_200d > 0 ? "+" : ""}{projectInfoCG.info.market_data.price_change_percentage_200d.toFixed(2)}%</span>
                                                                    </h5>
                                                                </div>
                                                            </td>
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-2">
                                    <div className="card ">
                                        <div className="card-header pb-0 p-3">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-2">All Time High</h6>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-items-center ">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Price:</p>
                                                                <h6 className="text-sm mb-0">${addCommasToNumber(projectInfoCG.info.market_data.ath.usd < 1 ? projectInfoCG.info.market_data.ath.usd.toFixed(3) : projectInfoCG.info.market_data.ath.usd.toFixed(2))}</h6>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Change Percentage:</p>
                                                                <h5 className="font-weight-bolder mb-0">
                                                                    <span className={`${(projectInfoCG.info.market_data.ath_change_percentage.usd > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                        {projectInfoCG.info.market_data.ath_change_percentage.usd > 0 ? "+" : ""}{projectInfoCG.info.market_data.ath_change_percentage.usd.toFixed(2)}%</span>
                                                                </h5>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-sm">
                                                            <div className="col text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Date:</p>
                                                                <h5 className="font-weight-bolder mb-0">
                                                                    <span className={`text-sm font-weight-bolder`}>{convertToFullDateMarketData(projectInfoCG.info.market_data.ath_date.usd)}</span>
                                                                </h5>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12 mt-lg-0 mt-2">
                                    <div className="card ">
                                        <div className="card-header pb-0 p-3">
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-2">All Time Low</h6>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-items-center ">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Price:</p>
                                                                <h5 className="font-weight-bolder mb-0">
                                                                    <span className={`text-sm font-weight-bolder`}>${addCommasToNumber(projectInfoCG.info.market_data.atl.usd < 1 ? projectInfoCG.info.market_data.atl.usd.toFixed(3) : projectInfoCG.info.market_data.atl.usd.toFixed(2))}</span>
                                                                </h5>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Change Percentage:</p>
                                                                <h5 className="font-weight-bolder mb-0">
                                                                    <span className={`${(projectInfoCG.info.market_data.atl_change_percentage.usd > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>
                                                                        {projectInfoCG.info.market_data.atl_change_percentage.usd > 0 ? "+" : ""}{projectInfoCG.info.market_data.atl_change_percentage.usd.toFixed(2)}%</span>
                                                                </h5>
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-sm">
                                                            <div className="col text-center">
                                                                <p className="text-xs font-weight-bold mb-0">Date:</p>
                                                                <h5 className="font-weight-bolder mb-0">
                                                                    <span className={`text-sm font-weight-bolder`}>{convertToFullDateMarketData(projectInfoCG.info.market_data.atl_date.usd)}</span>
                                                                </h5>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                    </div>

                </div>
            </div>
        </div >
    ) :
        <div id='general-info' className="row mx-auto mt-4">
            <div className="row">
                <div className="card card-plain mb-4">
                    <div className="card-body p-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="d-flex flex-column h-100 analysis-title-div expanded">
                                    <h2 className="font-weight-bolder mb-0 expanded"><BsFillInfoCircleFill color='#33374d' style={{ width: 30, height: 30 }} /> General Info </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default GeneralInfo
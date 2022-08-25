import React from 'react'
import FirstCard from '../cards/FirstCard'
import { AiFillCaretDown } from "react-icons/ai";
import { visualizeStatsSection } from '../../services/myjs';


function TopMC24hContainer({ listOfTopMarketCap, notToShow }) {


    return listOfTopMarketCap ? (
        <div id="stats-2h-mc">
            <div className='row mx-auto mt-4'>
                <div className='col-auto stats-title-div expanded' onClick={() => visualizeStatsSection("stats-2h-mc")}>
                    <h2 className="font-weight-bolder expanded">24h Price Change by MarketCap <AiFillCaretDown /></h2>
                </div>
            </div>
            <div className="row mx-auto stats-div-content expanded mt4">
                {
                    listOfTopMarketCap.map((project, idx) =>
                    (
                        notToShow.indexOf(project.id) == -1
                            ? <FirstCard key={idx} number={idx + 1} title={project.name} price={project.current_price} percentage={project.price_change_percentage_24h} image={project.image} />
                            : ""
                    ))
                }
            </div>
        </div>


    ) :
        <div id="stats-2h-mc">
            <div className='row mx-auto mt-4'>
                <div className='col-auto stats-title-div d-flex flex-row expanded'>
                    <h2 className="font-weight-bolder expanded">24h Price Change by MarketCap</h2>
                    <div className='ms-3 pt-2' style={{ width: "auto", height: "auto", color: "#EA4D00" }}>
                        <div className="spinner-border" role="status" >
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default TopMC24hContainer
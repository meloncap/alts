import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsFileBarGraphFill, BsSearch } from "react-icons/bs";
import { AiTwotoneHome } from "react-icons/ai";
import $ from 'jquery'
import useAppContext from '../Context';

function Sidebar() {

    const { projectInfoCG, themeMode } = useAppContext();

    const router = useRouter();

    useEffect(() => {
        if (typeof document !== undefined) {
            $(".analysis-dropdown-item > a").on("click", function () {
                $(".analysis-dropdown-item").removeClass("active");
                $(".analysis-dropdown-item > a").removeClass("active");
                $(this).parent().addClass("active")
                $(this).addClass("active")
            });

            $('aside .navbar-nav > .nav-link').on("click", function () {
                $('body').removeClass('g-sidenav-pinned')
                $('.sidenav').css('transform', 'translateX(-17.125rem')
            });
        };
    });

    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <Link href="/">
                    <a className="navbar-brand m-0 d-flex flex-row align-middle" style={{ textAlign: "center" }}>
                        <div className="navbar-brand-img h-100 rounded" alt="main_logo">
                            <Image src={`/assets/img/${themeMode == 'dark' ? 'logo_white.png' : 'logo_black.png'}`} height={468} width={1920} />
                        </div>
                        {/* <span className="ms-1 font-weight-bold">Platas Dashboard</span> */}
                    </a>
                </Link>

            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/">
                            <a className={`nav-link ${router.pathname == "/" ? "active" : ""}`} >
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <AiTwotoneHome color='#fff' />
                                </div>
                                <span className="nav-link-text ms-1">Home</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/markets">
                            <a className={`nav-link ${router.pathname.includes("/markets") ? "active" : ""}`} >
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <BsFileBarGraphFill color='#fff' />
                                </div>
                                <span className="nav-link-text ms-1">Markets</span>
                            </a>
                        </Link>
                    </li>

                    {projectInfoCG && projectInfoCG.info ?
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#analysisDropdown" className={`nav-link ${router.pathname.includes("/analysis") ? "active" : ""} collapsed`} aria-controls="analysisDropdown" role="button" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                                    {/* <BsSearch style={{ color: router.pathname.includes("/analysis") ? "#fff" : "initial" }} /> */}
                                    <BsSearch color='#fff' />
                                </div>
                                <span className="nav-link-text ms-1">Analysis</span>
                            </a>
                            <div className="collapse" id="analysisDropdown">
                                <ul className="nav ms-4 ps-3">
                                    <li className="nav-item ">
                                        <a className="nav-link collapsed" data-bs-toggle="collapse" aria-expanded="false" href="#analysisBasic" onClick={(e) => e.preventDefault()}>
                                            <span className="sidenav-mini-icon"> B </span>
                                            <span className="sidenav-normal"> Basic <b className="caret" /></span>
                                        </a>
                                        <div className="collapse" id="analysisBasic">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/basic">
                                                        <a className="nav-link">
                                                            <span className="sidenav-mini-icon"> O </span>
                                                            <span className="sidenav-normal"> Overall </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/basic/general-info">
                                                        <a className="nav-link">
                                                            <span className="sidenav-mini-icon"> GI </span>
                                                            <span className="sidenav-normal"> General Info </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/basic/tokenomics">
                                                        <a className="nav-link">
                                                            <span className="sidenav-mini-icon"> T </span>
                                                            <span className="sidenav-normal"> Tokenomics </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/basic/pools-stats">
                                                        <a className="nav-link ">
                                                            <span className="sidenav-mini-icon"> PS </span>
                                                            <span className="sidenav-normal"> Pools Stats </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item ">
                                        <a className="nav-link " data-bs-toggle="collapse" aria-expanded="false" href="#analysisAdvanced" onClick={(e) => e.preventDefault()}>
                                            <span className="sidenav-mini-icon"> A </span>
                                            <span className="sidenav-normal"> Advanced <b className="caret" /></span>
                                        </a>
                                        <div className="collapse " id="analysisAdvanced">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/advanced">
                                                        <a className="nav-link ">
                                                            <span className="sidenav-mini-icon text-xs"> O </span>
                                                            <span className="sidenav-normal"> Overall </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/advanced/security-information">
                                                        <a className="nav-link">
                                                            <span className="sidenav-mini-icon text-xs"> SI </span>
                                                            <span className="sidenav-normal"> Security Information </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item analysis-dropdown-item">
                                                    <Link href="/analysis/advanced/source-code">
                                                        <a className="nav-link">
                                                            <span className="sidenav-mini-icon text-xs"> SC </span>
                                                            <span className="sidenav-normal"> Source Code </span>
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        :
                        <li className="nav-item">
                            <a data-bs-toggle="collapse" href="#analysisDropdown" className={`nav-link ${router.pathname.includes("/analysis") ? "active" : ""} collapsed`} aria-controls="analysisDropdown" role="button" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                                    <BsSearch color='#fff' />
                                </div>
                                <span className="nav-link-text ms-1">Analysis</span>
                            </a>
                            <div className="collapse" id="analysisDropdown" onClick={(e) => e.preventDefault()}>
                                <ul className="nav ms-4 ps-3">
                                    <li className="nav-item analysis-dropdown-item">
                                        <Link href="/analysis/basic">
                                            <a className="nav-link">
                                                <span className="sidenav-mini-icon"> B </span>
                                                <span className="sidenav-normal"> Basic </span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item analysis-dropdown-item">
                                        <Link href="/analysis/advanced">
                                            <a className="nav-link">
                                                <span className="sidenav-mini-icon"> A </span>
                                                <span className="sidenav-normal"> Advanced </span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    }
                </ul>
            </div>
        </aside >

    )
}

export default Sidebar
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { pagerUrltoTitleCase } from '../../services/myjs'
import { BsTwitter } from "react-icons/bs"
import useAppContext from '../Context'
import { updateTheme } from '../../services/myjs'
import { AiOutlineQuestionCircle } from "react-icons/ai"
import Link from 'next/link'
import Image from 'next/image'
import supportedChainsCovalent from '../../public/supportedChainsCovalent.json'
import logo from '/public/assets/img/logos/small_logo.png'


function Navbar() {

    const { themeMode, setThemeMode, projectInfoCG, userProject } = useAppContext();
    const [chainImage, setChainImage] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof document !== undefined) {
            if (window.localStorage.getItem("theme")) {
                setThemeMode(window.localStorage.getItem("theme"))
                updateTheme(window.localStorage.getItem("theme"))
            } else {
                updateTheme(themeMode);
            }
        }
    }, [themeMode])

    useEffect(() => {
        if (!userProject.network) return;
        Object.entries(supportedChainsCovalent).map(([key, value]) => { if (supportedChainsCovalent[key].chain_id == userProject.network.chain_id) setChainImage(supportedChainsCovalent[key].logo_url) })
    }, [userProject])


    // Diasbled at this moment, always light
    function handleThemeClick() {
        if (themeMode == "light") {
            setThemeMode(window.localStorage.setItem("theme", "dark"));
            setThemeMode("dark");
        } else if (themeMode == "dark") {
            setThemeMode(window.localStorage.setItem("theme", "light"));
            setThemeMode("light");
        }
    }

    return (
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
            <div className="container-fluid py-1 px-3 ">
                <nav className='d-flex flex-row' aria-label="breadcrumb">
                    <div className='rounded me-1 pt-2'>
                        <Link href={'/'}>
                            <a><Image src={logo} width={30} height={30} /></a>
                        </Link>
                    </div>
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-2 px-0 me-sm-4">
                        {router.pathname.match(new RegExp("/", "g")).length > 1 ?
                            router.pathname.split("/").map((path, idx) => idx > 0 &&
                                (
                                    <li key={idx} className={`breadcrumb-item text-sm d-flex flex-row`}>
                                        <h5 className="text-dark mb-0 up">{pagerUrltoTitleCase(path)}</h5>
                                    </li>
                                ))
                            : <li className="breadcrumb-item text-sm active" aria-current="page"><h5 className="text-dark mb-0 up ms-1">{router && router.pathname ? pagerUrltoTitleCase(router.pathname) : "-"}</h5></li>
                        }
                    </ol>
                </nav>

                {
                    projectInfoCG.info && router.pathname.includes("/analysis") &&
                    <div className='row justify-content-start pt-1 d-md-block d-none'>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <div className='d-flex flex-row justify-content-start'>
                                <div className='rounded me-1 pt-1'>
                                    {chainImage &&
                                        <Image src={chainImage} width={20} height={20} />
                                    }
                                </div>
                                <div className='rounded'>
                                    {projectInfoCG.info.image && projectInfoCG.info.image.small && projectInfoCG.info.symbol ?
                                        <Image src={projectInfoCG.info.image.small} width={25} height={25} /> : <AiOutlineQuestionCircle />
                                    }
                                </div>
                                <a target={"_blank"}><h5 className="text-dark mb-0 up ms-1">{projectInfoCG.info.name}</h5></a>
                            </div>
                        </div>
                    </div>
                }

                <div className="collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" id="navbar">
                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                    </div>
                    <ul className="navbar-nav justify-content-end">
                        <Link href={`https://twitter.com/AltSearchApp`}>
                            <a title='Twitter @AltSearchApp' target={"_blank"} className='mx-1'><BsTwitter /></a>
                        </Link>
                        <li className="nav-item d-xl-none ps-1 d-flex align-items-center">
                            <a className="nav-link text-body p-0" id="iconNavbarSidenav" style={{ cursor: "pointer" }} onClick={(e) => e.preventDefault()}>
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                </div>
                            </a>
                        </li>
                        {/* <li className="nav-item px-3 d-flex align-items-center">
                            <a className="nav-link text-body p-0" style={{ cursor: "pointer" }} onClick={(e) => darkMode(e)}>
                                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                            </a>
                        </li> */}

                        {/*<li className="nav-item px-3 d-flex align-items-center" style={{ cursor: "pointer" }}>
                             <div className="form-check form-switch ps-0 d-xl-block d-none dark-mode" id="dark-light-toggle" onClick={(e) => darkMode(e)}> */}
                        {/* <div className="form-check form-switch ps-0 d-xl-block d-none dark-mode" id="dark-light-toggle" onClick={function (e) { handleThemeClick() }} >
                                {themeMode == "dark" ? <MdDarkMode /> : <MdLightMode />}
                            </div> 
                        </li>*/}                       
                    </ul>
                </div>

                {
                    projectInfoCG.info && router.pathname.includes("/analysis") &&
                    <div className='row justify-content-start pt-1 d-block d-md-none'>
                        <div className='col-12 d-flex flex-row justify-content-between'>
                            <div className='d-flex flex-row justify-content-start'>
                                <div className='rounded me-1 pt-1'>
                                    {chainImage &&
                                        <Image src={chainImage} width={20} height={20} />
                                    }
                                </div>
                                <div className='rounded'>
                                    {projectInfoCG.info.image && projectInfoCG.info.image.small && projectInfoCG.info.symbol ?
                                        <Image src={projectInfoCG.info.image.small} width={25} height={25} /> : <AiOutlineQuestionCircle />
                                    }
                                </div>
                                <a target={"_blank"}><h5 className="text-dark mb-0 up ms-1">{projectInfoCG.info.name}</h5></a>
                            </div>
                        </div>
                    </div>
                }
            </div >
        </nav >

    )
}

export default Navbar
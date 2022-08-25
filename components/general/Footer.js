import React from 'react'
import Link from 'next/link'

function Footer() {

    var currentDate = new Date().getFullYear()
    
    return (
        <footer className="footer pt-3">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                            Copyright © {currentDate},
                            made with <i className="fa fa-heart" /> by
                            <Link href={'https://www.linkedin.com/in/jorgeplatasfeced'}>
                                <a target={"_blank"} className="font-weight-bold"> PlatasCrypto </a>
                            </Link>
                            for a safer crypto space.
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <Link href={'https://twitter.com/AltSearchApp'}>
                                    <a target={"_blank"} className="nav-link text-muted">Contact Us</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
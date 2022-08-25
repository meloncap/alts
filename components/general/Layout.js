import Script from 'next/script'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { toastStlye, toastIconTheme } from '../../constants/global'

function Layout({ children }) {
    return (
        <>
            {/* Fonts and icons */}
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" rel="stylesheet" />
            <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js" crossorigin="anonymous" />
            <Script src="/assets/js/cookie-consent.js" />

            <Toaster position="top-center" reverseOrder={false}
                containerStyle={{ marginTop: 70 }}
                toastOptions={{
                    style: toastStlye,
                    toastIconTheme: toastIconTheme,
                    success: { duration: 4000 },
                    error: { duration: 6000 }
                }}
            />

            <Sidebar />

            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
                <Navbar />
                <div className='container-fluid py-4'>
                    {children}
                    <Footer />
                </div>
            </main>

            {/* Core JS Files */}
            <Script src="/assets/js/core/popper.min.js" />
            <Script src="/assets/js/core/bootstrap.min.js" />
            <Script src="/assets/js/plugins/perfect-scrollbar.min.js" />
            <Script src="/assets/js/plugins/smooth-scrollbar.min.js" />
            <Script src="/assets/js/plugins/chartjs.min.js" />
            <Script src="/assets/js/soft-ui-dashboard.js" strategy="beforeInteractive" />
        </>
    )
}

export default Layout
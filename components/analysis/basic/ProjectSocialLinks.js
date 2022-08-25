import Link from 'next/link'
import React from 'react'
import { BsTelegram, BsDiscord, BsGlobe, BsTwitter, BsGithub, BsMedium, BsYoutube } from "react-icons/bs"

function ProjectSocialLinks({ projectInfo }) {

    return projectInfo && projectInfo.links && (
        <>
            <div className='col-lg-2 d-flex flex-row justify-content-md-end justify-content-between' style={{ textAlign: "end" }}>
                <span className="badge badge-lg d-block bg-gradient-dark up align-middle d-md-none d-block" style={{ height: "fit-content" }}>${projectInfo.symbol.toUpperCase()}</span>
                <div style={{ width: "fit-content" }}>
                    {projectInfo.links.homepage.length > 0 &&
                        <Link href={`${projectInfo.links.homepage[0]}`}>
                            <a title='Website' target={"_blank"} className='mx-1'><BsGlobe /></a>
                        </Link>
                    }
                    {projectInfo.links.twitter_screen_name &&
                        <Link href={`https://twitter.com/${projectInfo.links.twitter_screen_name}`}>
                            <a title='Twitter' target={"_blank"} className='mx-1'><BsTwitter /></a>
                        </Link>
                    }

                    {projectInfo.links.telegram_channel_identifier &&
                        <Link href={`https://t.me/${projectInfo.links.telegram_channel_identifier}`}>
                            <a title='Telegram' target={"_blank"} className='mx-1'><BsTelegram /></a>
                        </Link>
                    }
                    {projectInfo.links.chat_url.length > 0 &&
                        projectInfo.links.chat_url.map((url, idx) =>
                        (
                            url.includes("discord") &&
                            <Link key={idx} href={`${url}`}>
                                <a title='Discord' target={"_blank"} className='mx-1'><BsDiscord /></a>
                            </Link>
                        ))
                    }
                    {projectInfo.links.repos_url.github && projectInfo.links.repos_url.github[0] &&
                        <Link href={`${projectInfo.links.repos_url.github[0]}`}>
                            <a title='GitHub' target={"_blank"} className='mx-1'><BsGithub /></a>
                        </Link>
                    }
                    {projectInfo.links.announcement_url.length > 0 &&
                        projectInfo.links.announcement_url.map((url, idx) =>
                        (
                            url.includes("medium") &&
                            <Link key={idx} href={`${url}`}>
                                <a title='Medium' target={"_blank"} className='mx-1'><BsMedium /></a>
                            </Link>
                        ))
                    }
                    {projectInfo.links.official_forum_url.length > 0 &&
                        projectInfo.links.official_forum_url.map((url, idx) =>
                        (
                            url.includes("youtube") &&
                            <Link key={idx} href={`${url}`}>
                                <a title='YouTube' target={"_blank"} className='mx-1'><BsYoutube /></a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectSocialLinks
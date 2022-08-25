import Image from 'next/image'
import React from 'react'
import { addCommasToNumber } from '../../services/myjs'

function FirstCard({ number, title, price, percentage, image }) {
    
    return (
        <div className="col-xl-3 col-sm-6 mb-4">
            <div className="card">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-capitalize font-weight-bold">{title} #{number}</p>
                                <h5 className="font-weight-bolder mb-0">
                                    ${price % 1 == 0 ? addCommasToNumber(price) : addCommasToNumber(price.toFixed(2))}
                                    <span className={`${(percentage > 0) ? "text-success" : "text-danger"} text-sm font-weight-bolder`}>{percentage > 0 ? "+" : ""}{percentage.toFixed(2)}%</span>
                                </h5>
                            </div>
                        </div>
                        <div className="col-4 text-end">
                            <div className='rounded'>
                                <Image src={image} width={40} height={40} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstCard
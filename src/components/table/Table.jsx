import React from 'react'
import Details from './Details'
import HPS from './HPS'

function table() {
    return <section id="tables">
        <div className="row">
            <div className="col-lg-6">
                <HPS />
            </div>
            <div className="col-lg-6">
                <Details />
            </div>
        </div>
    </section>
}
export default table
import React, { useState } from 'react'

function singup(props) {

    function detect(e) {
        e.preventDefault()
        props.clickSingUpHandler()
    }

    return <div className="col-sm-4">
        <div className="card">
            <div className="card-body">
                <a onClick={detect} className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
                    <i className="fab fa-google"></i>Subscribirse con google</a>
            </div>
        </div>
    </div>

}

export default singup
import React, { useState } from 'react'

function SingupForm() {
    const [formState, setformState] = useState({ email: "", password: "" })

    function formHandler(event) {
        const { name, value } = event.target
        setformState(prev => { return { ...prev, [name]: value } })
    }


    async function formHandlerForm(e) {
        const url = '/'
        const fetchOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
                "email": formState.email,
                "password": formState.password
            }
        }
        const response = await fetch(url, fetchOptions);


        e.preventDefault()
    }
    return <form action="" method="post" onClick={formHandlerForm}>
        <input type="email" placeholder="Email" name="email" id="" value={formState.email} onChange={formHandler} />
        <input type="password" placeholder="Contraseña" name="password" value={formState.password} onChange={formHandler} />
        <button>Subcribirse</button>
    </form>
}

export default SingupForm
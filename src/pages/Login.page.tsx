import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/user.context'

const LoginPage: React.FC = () => {
    const user = useContext(UserContext)
    const login = user?.login
    return <div></div>
}

export default LoginPage

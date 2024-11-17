export interface User {
    name: string
    role: 'user' | 'admin'
    mail: string
    allAddres: Array<addres>
    password: string | undefined
    token: string
}

interface addres {
    type: 'casa' | 'depto'
    name: string
}

export interface UserLoginData {
    email: string
    password: string
}

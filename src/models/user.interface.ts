export interface UserRegisterData {
    firstName: string
    lastName: string
    mail: string
    allAddress: Array<address>
    password: string | undefined
    phone: number
}

export interface address {
    type: string
    name: string
    region: string
    commune: string
    addressDetail: string
}

export interface User {
    id: number
    firstName: string
    email: string
    role: 'user' | 'admin'
    token: string
}

export interface dbAddress {
    tipo: string
    direccion: string
}

export interface UserLoginData {
    email: string
    password: string
}

export interface UserReconected {
    userid: number
    firstname: string
    lastname: string
    email: string
    password: string
    phone: number
    addresses: Array<address>
    role: 'user' | 'admin'
}

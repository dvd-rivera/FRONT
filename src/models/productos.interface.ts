export interface Theme {
    name: Array<string>
    id: number
}
// los temas son un array de string ya que pueden estar en diferentes idiomas pero se refieren al mismo tema.

export interface Diary {
    price: number
    personalized_price: number
    description: string
    theme: Theme
    gr: number
    sheets: number
    tamaño: string
    img: string
    sheet_type: string
    laminate: string
    stock: number
    id: number
}

export interface Notebook {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    gr: number
    sheets: number
    tamaño: string
    img: string
    sheet_type: string
    laminate: string
    stock: number
    id: number
}

export interface Drawing_Notebook {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    sheets: number
    tamaño: string
    img: string
    laminate: string
    stock: number
    id: number
}

export interface Keychain_Sticky_Notes {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Bookmarks_Set {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Stickers_Set {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Wall_Calendar {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Magnet_Calendar {
    size: string
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Magnetic_Fridge {
    price: number
    theme: Theme
    size: string
    stock: number
    img: string
    id: number
    description: string
}

export interface Painting {
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Resined_painting {
    size: string
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    img: string
    id: number
}

export interface Happy_Box {
    size: string
    price: number
    personalized_price: number
    theme: Theme
    description: string
    stock: number
    content: Array<string>
    img: string
    id: number
}

export type Product =
    | (Diary & { type: 'Diary' })
    | (Notebook & { type: 'Notebook' })
    | (Drawing_Notebook & { type: 'Drawing_Notebook' })
    | (Keychain_Sticky_Notes & { type: 'Keychain_Sticky_Notes' })
    | (Bookmarks_Set & { type: 'Bookmarks_Set' })
    | (Stickers_Set & { type: 'Stickers_Set' })
    | (Wall_Calendar & { type: 'Wall_Calendar' })
    | (Magnet_Calendar & { type: 'Magnet_Calendar' })
    | (Magnetic_Fridge & { type: 'Magnetic_Fridge' })
    | (Painting & { type: 'Painting' })
    | (Resined_painting & { type: 'Resined_painting' })
    | (Happy_Box & { type: 'Happy_Box' })

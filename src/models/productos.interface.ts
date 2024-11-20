export interface Theme {
    name: Array<string>
}
// los temas son un array de string ya que pueden estar en diferentes idiomas pero se refieren al mismo tema.

export interface Diary {
    sheets: number
    tamaño: string
    sheet_type: string
    laminate: string
}

export interface Notebook {
    sheets: number
    tamaño: string
    sheet_type: string
    laminate: string
}

export interface Drawing_Notebook {
    sheets: number
    tamaño: string
    laminate: string
}

export interface Keychain_Sticky_Notes {
    elastic_color: string
}

export interface Bookmarks_Set {
    laminate: string
}

export interface Stickers_Set {
    size: string
}

export interface Wall_Calendar {
    size: string
}

export interface Magnet_Calendar {
    size: string
}

export interface Magnetic_Fridge {
    size: string
}

export interface Painting {
    size: string
}

export interface Resined_painting {
    size: string
}

export interface Happy_Box {
    content: Array<ProductDefault>
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

export interface ProductDefault {
    product_id: number
    description: string
    price: number
    stock: number
    img: string
    type_name: string
    theme_name: Theme
    other_attributes:
        | Diary
        | Notebook
        | Drawing_Notebook
        | Keychain_Sticky_Notes
        | Bookmarks_Set
        | Stickers_Set
        | Wall_Calendar
        | Magnet_Calendar
        | Magnet_Calendar
        | Magnetic_Fridge
        | Painting
        | Resined_painting
        | Happy_Box
}

export interface Category {
    id: number
    name: string
}

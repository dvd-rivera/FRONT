export interface Theme {
    name: Array<string>
}

export interface Diary {
    sheets: number
    size: string
    sheet_type: string
    laminate: string
}

export interface Notebook {
    sheets: number
    size: string
    sheet_type: string
    laminate: string
}

export interface Drawing_Notebook {
    sheets: number
    size: string
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

export interface ProductDefault {
    product_id: number
    description: string
    price: number
    stock: number
    img: Array<string>
    type_name: string
    theme_name: Theme
    type_id: number
    theme_id: number
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

export interface UpdateProductDefault {
    product_id: number
    description: string
    price: number
    stock: number
    img: Array<string>
    type_id: number
    theme_id: number
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

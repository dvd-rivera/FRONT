export interface Theme {
    name: Array<string>
}

export interface Diary {
    attributes_type: 'Diary'
    sheets: number
    tamaño: string
    sheet_type: string
    laminate: string
}

export interface Notebook {
    attributes_type: 'Notebook'
    sheets: number
    tamaño: string
    sheet_type: string
    laminate: string
}

export interface Drawing_Notebook {
    attributes_type: 'Drawing_Notebook'
    sheets: number
    tamaño: string
    laminate: string
}

export interface Keychain_Sticky_Notes {
    attributes_type: 'Keychain_Sticky_Notes'
    elastic_color: string
}

export interface Bookmarks_Set {
    attributes_type: 'Bookmarks_Set'
    laminate: string
}

export interface Stickers_Set {
    attributes_type: 'Stickers_Set'
    size: string
}

export interface Wall_Calendar {
    attributes_type: 'Wall_Calendar'
    size: string
}

export interface Magnet_Calendar {
    attributes_type: 'Magnet_Calendar'
    size: string
}

export interface Magnetic_Fridge {
    attributes_type: 'Magnetic_Fridge'
    size: string
}

export interface Painting {
    attributes_type: 'Painting'
    size: string
}

export interface Resined_painting {
    attributes_type: 'Resined_painting'
    size: string
}

export interface Happy_Box {
    attributes_type: 'Happy_Box'
    content: Array<ProductDefault>
}

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

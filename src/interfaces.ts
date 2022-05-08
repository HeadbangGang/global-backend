export interface Config {
    development?: ConfigContent
    production?: ConfigContent
}

export interface ConfigContent {
    pokedex: {
        uri: string
    }
}

export interface CountResponse {
    data?: CountDataContent
    'pokemon_entries'?: [{
        'entry_number'?: number
    }]
}

export interface CountDataContent {
    'pokemon_entries'?: [{
        'entry_number'?: number
    }]
}

export interface ErrorResponse {
    message?: string
    name?: string
    config?: {
        url?: string
    }
    url?: string
}

export interface NextCallParams {
    offset: string
    limit: string
}

export interface ListBuilderRequest {
    query?: {
       limit?: string
        offset?: string
    }
}

export interface PokemonListResponse {
    data: PokemonDataContent
    next?: string
    results?: ResultsContent[]
    previous?: string
}

export interface PokemonDataContent {
    next?: string
    previous?: string
    results?: ResultsContent[]
    id?: number
    name?: string
    default_image?: string
    default_image_shiny?: string
    sprites?: SpritesContent
    types?: TypesResponse[]
}

export interface SpritesContent {
    back_default?: string
    back_shiny?: string
    front_default?: string
    front_shiny?: string
    versions: Versions
}

export interface TypesResponse {
    slot?: number
    type?: {
        name?: string
        url?: string
    }
}

export interface GenerationData {
    icons?: {
        front_default?: string
        front_female?: string
    }
    'ultra-sun-ultra-moon'?: {
        front_default?: string
        front_female?: string
        front_shiny?: string
        front_shiny_female?: string
    }
}

export interface Versions {
    'generation-vii': GenerationData
}

export interface ResultsContent {
    name?: string
    url?: string
}

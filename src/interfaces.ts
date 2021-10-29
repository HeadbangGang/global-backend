/* eslint-disable @typescript-eslint/naming-convention */
export interface CountResponse {
    data?: DataContent,
    'pokemon_entries'?: [{
        'entry_number'?: number
    }],
}

export interface DataContent {
    'pokemon_entries'?: [{
        'entry_number'?: number
    }],
}

export interface ErrorResponse {
    message?: string,
    name?: string,
    config?: {
        url?: string
    },
    url?: string
}

export interface ListBuilderRequest {
    body?: {
        nextUrl?: string
    }
}

export interface PokemonListResponse {
    data?: DataContent,
    next?: string,
    results?: ResultsContent[]
}

export interface DataContent {
    next?: string,
    results?: ResultsContent[],
    name?: string,
    id?: number,
    sprites?: SpritesContent,
    types?: []
}

export interface SpritesContent {
    'front_default': string,
    'front_shiny': string
}

export interface ResultsContent {
    name?: string,
    url?: string
}
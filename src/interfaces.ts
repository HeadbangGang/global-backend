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
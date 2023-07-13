interface DefaultPokeApiDataObject {
    name: string
    url: string
}

export interface PokeApiPokemonResponse {
    abilities: Abilities[]
    base_experience: number
    forms: DefaultPokeApiDataObject[]
    game_indices: GameIndices[]
    height: number
    held_items: HeldItems[]
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Moves[]
    name: string
    order: number
    past_types: PastTypes[]
    species: DefaultPokeApiDataObject
    sprites: Sprites
    stats: Stats[]
    types: Types[]
}

export interface PokeApiListResponse {
    count: number
    next: string | null
    previous: string | null
    results: DefaultPokeApiDataObject[]
}

interface Abilities {
    ability: DefaultPokeApiDataObject
    is_hidden: boolean
    slot: number
}

interface GameIndices {
    game_index: number
    version: DefaultPokeApiDataObject
}

interface HeldItems {
    item: DefaultPokeApiDataObject
    version_details: VersionDetails[]
}

interface VersionDetails {
    rarity: number
    version: DefaultPokeApiDataObject
}

interface Moves {
    move: DefaultPokeApiDataObject
    version_group_details: VersionGroupDetails[]
}

interface VersionGroupDetails {
    level_learned_at: number
    move_learn_method: DefaultPokeApiDataObject
    version_group: DefaultPokeApiDataObject
}

interface PastTypes {
    [key: string]: any // revisit when typing is discovered
}

interface DefaultSpriteTypes {
    back_default?: string | null
    back_female?: string | null
    back_gray?: string | null
    back_shiny_female?: string | null
    back_shiny_transparent?: string | null
    back_shiny?: string | null
    back_transparent?: string | null
    front_default?: string | null
    front_female?: string | null
    front_gray?: string | null
    front_shiny_female?: string | null
    front_shiny_transparent?: string | null
    front_shiny?: string | null
    front_transparent?: string | null
}

interface Sprites extends DefaultSpriteTypes {
    other: OtherSprites
    versions: Versions
}

interface OtherSprites {
    dream_world: DefaultSpriteTypes
    home: DefaultSpriteTypes
    official_artwork: DefaultSpriteTypes
}

interface Versions {
    [key: string]: GenerationSprites
}

export interface GenerationSprites {
    [key: string]: DefaultSpriteTypes
}

interface Stats {
    base_stat: number
    effort: number
    stat: DefaultPokeApiDataObject
}

export interface Types {
    slot: number
    type: DefaultPokeApiDataObject
}

export interface NationalPokedex {
    descriptions: Descriptions[]
    id: number
    is_main_series: boolean
    name: string
    names: Names
    pokemon_entries: PokemonEntries[]
    region: string | null
    version_groups: any[]
}

interface Descriptions {
    description: string
    language: DefaultPokeApiDataObject
}

interface Names {
    name: string
    language: DefaultPokeApiDataObject
}

interface PokemonEntries {
    entry_number: number
    pokemon_species: DefaultPokeApiDataObject
}
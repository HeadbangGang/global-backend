/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Config } from '../interfaces'
export const env: string = process.env.CONFIG_ENV
const config: Config = require(`./${env}`)

export const pokedexUri = config.pokedex.uri
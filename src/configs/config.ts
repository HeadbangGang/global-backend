/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Config, ConfigContent } from '../interfaces'
const config: Config = require('./default')

const env: string = process.env.CONFIG_ENV || 'production'

const configData: ConfigContent = config[env]

export const pokedexUri = configData.pokedex.uri

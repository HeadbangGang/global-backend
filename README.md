# Global Backend

Global Backend is my Node.js backend used for my projects. It is currently hosted on Heroku.

## API Reference

**Base URL**: `https://api.taydenflitcroft.com`

#### National Pokedex Pokemon Count

```
  GET /pokedex/count
```

#### Pokemon Data List

```
  GET /pokedex/pokemon/list
```

| Query         | Type     | Description                                         | Default Value                   |
| :------------ | :------- | :-------------------------------------------------- | :------------------------------ |
| `limit`       | `string` | **Optional**. Number of Pokémon to return           | 20 (if offset is present) or 100|
| `offset`      | `string` | **Optional**. Starting index of Pokémon to start at | 1                               |

#### Projects Used in my Portfolio

```
  GET /portfolio/projects
```

#### Send Contact Email

```
  POST /portfolio/contact
```

```json
{
  "emailMessage": "string",
  "returnEmail": "string",
  "senderName": "string",
  "sendConfirmationEmail": "boolean"
}
```

#### Get Static Assets From AWS S3 Database
```
    GET /portfolio/asset
```

| Query      | Type     | Description                                     |
|:-----------| :------- |:------------------------------------------------|
| `fileName` | `string` | Static file name requested from AWS S3 database |

## License

[MIT](https://choosealicense.com/licenses/mit/)


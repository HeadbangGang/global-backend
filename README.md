# Global Backend

Global Backend is my Node.js backend used for my projects. It is currently hosted on Heroku.

## API Reference

**Base URL**: `https://desolate-basin-78066.herokuapp.com`

#### National Pokedex Pokemon Count

```http
  GET /pokedex/count
```

#### Pokemon Data List

```http
  GET /pokedex/pokemon/list
```

| Query         | Type     | Description                                         | Default Value                   |
| :------------ | :------- | :-------------------------------------------------- | :------------------------------ |
| `limit`       | `string` | **Optional**. Number of Pokémon to return           | 20 (if offset is present) or 100|
| `offset`      | `string` | **Optional**. Starting index of Pokémon to start at | 1                               |

## License

[MIT](https://choosealicense.com/licenses/mit/)


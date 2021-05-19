# Euro 2020 API

This program is meant to be used as an application server between an application and [football-data.org API](https://www.football-data.org/ "football-data.org website"). Football-data provides an awesome API for Euro 2020 matches and results, but the free version comes with rate limiting. For that reason connecting your website frontend directly to Football Data API doesn't really work.

## Language support

API supports two languages: finnish (`fi-FI`) and english (`en-US`). To request response in specific language include `Accept-Language: xx-XX` header to requests. If language is not specified or invalid the program will use English as a default language.

## Resources

Euro 2020 API provides two resource endpoints to get data from the external API. It caches the data to memory so that the external API won't get pulled too often.

API does not expect a trailing slash in URIs and you should not include them when calling the API. For example `/groups` will return list of groups and team standings when as `/groups/` will result 404 Not found.

### `/matches`
Resource returns Euro 2020 matches in JSON format.

```
{
  "matches": [
    {
      "startDateTime": "2021-06-11T19:00:00Z",
      "status": "SCHEDULED",
      "stage": "GROUP_STAGE",
      "group": "Group A",
      "homeTeam": {
        "name": "Turkey",
        "logoUrl": "http:://localhost:3000/static/803.svg"
      },
      "awayTeam": {
        "name": "Italy",
        "logoUrl": "http:://localhost:3000/static/784.svg"
      }
    },
    ...
  ]
}
```

### `/groups`
Groups resource returns Euro 2020 groups and standings in JSON format.

```
{
  "groups": [
    {
      "name": "GROUP_A",
      "table": [
        {
          "team": "Italy",
          "points": "0",
          "playedGames": "0",
          "won": "0",
          "draw": "0",
          "lost": "0",
          "logoUrl": "http:://localhost:3000/static/784.svg"
        },
        ...
      ]
    },
    ...
  ]
}
```

## Development

ENV configs:

```
PORT=3000
KEY=XXX
TRUST_PROXY=1
MAX_REQUESTS_PER_MINUTE=5
BASE_URL=http://localhost:3000
NODE_ENV=production|test|dev
```

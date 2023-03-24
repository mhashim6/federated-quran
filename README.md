# federated-quran
POC microservice-based federated GrapghQL API for Quran metadata with user Authentication and Authorisation. _(all the buzz words in one sentence, but it's actually true ¯\\_(ツ)_/¯)_

## Architecture
This is a POC, it exposes a GQL api to retrive quran metadata like "Juz'" and "Surah". We can also use the `users` service to create and auth users.
![image](https://user-images.githubusercontent.com/4984041/227655113-1e777cc7-61c9-48a1-8425-be3b28397e89.png)

## API
Here I'll discuss the overall api specs. For details regarding other services, you can read their docs here:
- [users](https://github.com/mhashim6/federated-quran/tree/master/users#readme)
- [juz](https://github.com/mhashim6/federated-quran/tree/master/juz#readme)
- [surah](https://github.com/mhashim6/federated-quran/tree/master/surah#readme)
- [gateway](https://github.com/mhashim6/federated-quran/tree/master/gateway#readme)

### Juz
``` graphql
type Juz {
  number: Int!
  surahIndex: Int!
  ayah: Int!
}
```

### Surah
``` graphql
type Surah {
  index: Int!
  name: String!
  numberOfAyahs: Int!
  revelationType: String!
}
```

### Federation
In `Juz`, we can fetch the entire `surah` instead of its index. This is one benifit of federation
``` graphql
  extend type Surah @key(fields: "index") {
    index: Int!
  }

  type Juz {
    number: Int!
    surahIndex: Int!
    surah: Surah!
    ayah: Int!
  }
```

This allows us to write such query normally to get a "Juz'" and the full "Surah" details of it
``` graphql
query getJuzStartSurah {
  getJuz (index: 3){
    number
    ayah
    surah {
      name
      revelationType
    }
  }
}

```
Output:
``` json
{
  "number": 3,
  "ayah": 253,
  "surah": {
    "name": "Al-Baqara",
    "revelationType": "Medinan"
  }
}
```

## Installation
``` shell
git clone https://github.com/mhashim6/federated-quran.git && cd federated-quran
```

## Run
``` shell
docker compose up -d
```

Then head to `http://localhost` and go to the Apollo Sandbox to play with the API

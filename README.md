# Multi Select Search Field

Search field that shows the selected data on the search field.

### Things used

- [DummyJSONAPI](https://dummyjson.com/docs/users) for the user search suggestions and data

#### Here I demonstrated:

- Whenever you search(type), the API call will happen and users data is populated on suggestion list below the search bar based on the name you type.
- When you select an user, a pill with selected user data is added to the searchbar.
- whenever you press backspace when no search text is present the last selected user value is removed.
- Implemented `debouncing` in search field to reduce API calls.
- Added `caching` for search suggestions using state variable for already made API calls results.

## Demo

To run this, simply go to terminal and to this project directory then do the following commands:

```sh
npm install
```

then type

```sh
npm run dev
```

---

That's it 😀!

## Project Rick and Morty

This project is a simple application that utilizes the [Rick and Morty API](https://rickandmortyapi.com/) to display two lists of characters.

Select one character from each list, and it will display the list of episodes in which both characters appear. You can also view the episodes shared between the two characters.

By clicking on the episode name, you can see the complete list of characters that appear in that episode.

### Images

![Home Page 1](https://res.cloudinary.com/drcq2kx3u/image/upload/v1697487935/GitHub/rick-and-morty-app/awmld9d3fpcssllucuci.jpg)

![Home Page 2](https://res.cloudinary.com/drcq2kx3u/image/upload/v1697487935/GitHub/rick-and-morty-app/yca4l8vnet0qokr7vnzx.jpg)

![Home Page 3](https://res.cloudinary.com/drcq2kx3u/image/upload/v1697487935/GitHub/rick-and-morty-app/bymi5zqpc7h66ocgo7gl.jpg)

![Mobile view](https://res.cloudinary.com/drcq2kx3u/image/upload/v1697487935/GitHub/rick-and-morty-app/h7vt1mcyzndv5sedptk9.jpg)

### Getting Started

Add the following to your .env.local file:

```bash
NEXT_PUBLIC_API_URL=https://rickandmortyapi.com/graphql
```

Then, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

To run the tests, run the following command:

```bash
npm run test:watch
```

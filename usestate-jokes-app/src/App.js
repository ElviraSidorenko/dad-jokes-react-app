import { useReducer } from "react";
import { useState } from "react";
import "./App.css";
import Joke from "./Joke";
import Form from "./Form";

function jokesReducer(jokes, action) {
  switch (action.type) {
    case "added_joke":
      return [action.joke, ...jokes];
    case "deleted_joke":
      return jokes.filter((joke) => joke.id !== action.id);
    case "liked_joke":
      return jokes.map((joke) => {
        if (joke.id === action.id) {
          return { ...joke, likes: joke.likes + 1 };
        } else {
          return joke;
        }
      });
    case "disliked_joke":
      return jokes.map((joke) => {
        if (joke.id === action.id) {
          return { ...joke, likes: joke.likes - 1 };
        } else {
          return joke;
        }
      });
    case "sorted_joke":
      return [...jokes].sort((a, b) => b.likes - a.likes);
    default:
  }
}

function App() {
  const [favorite, setFavorite] = useState(null);
  const [jokes, dispatch] = useReducer(jokesReducer, [
    {
      id: 1,
      text: "I went to buy some camo pants but couldn't find any.",
      likes: 0,
    },
    {
      id: 2,
      text: "I failed math so many times at school, I can't even count.",
      likes: 0,
    },
    {
      id: 3,
      text: "It takes a lot of balls to golf the way I do.",
      likes: 0,
    },
    {
      id: 4,
      text: "I told him to be himself; that was pretty mean, I guess.",
      likes: 0,
    },
  ]);

  const handleFavorite = (id) => {
    if (favorite === id) {
      setFavorite(null);
    } else {
      setFavorite(id);
    }
  };

  const handleNewJoke = (text) => {
    const joke = {
      text,
      // eslint-disable-next-line no-restricted-globals
      id: self.crypto.randomUUID(),
      likes: 0,
    };
    dispatch({ type: "added_joke", joke });
  };

  const handleDelete = (id) => {
    dispatch({ type: "deleted_joke", id });
  };

  const handleLike = (id) => {
    dispatch({ type: "liked_joke", id });
  };

  const handleDislike = (id) => {
    dispatch({ type: "disliked_joke", id });
  };

  const handleSort = () => {
    dispatch({ type: "sorted_joke" });
  };

  return (
    <div className="App">
      <h1>Dad Jokes 😂</h1>

      <Form onNewJoke={handleNewJoke}></Form>

      <button className="sort" onClick={handleSort}>
        Sort by popularity ↕️
      </button>

      {jokes.map((joke) => (
        <Joke
          onFavorite={handleFavorite}
          favorite={favorite === joke.id}
          key={joke.id}
          onDelete={handleDelete}
          onLike={handleLike}
          onDislike={handleDislike}
          {...joke}
        />
      ))}
    </div>
  );
}

export default App;

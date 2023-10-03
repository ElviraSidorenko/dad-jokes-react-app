import React from "react";


const Joke = ({
  id,
  text,
  favorite,
  onFavorite,
  onDelete,
  likes,
  onLike,
  onDislike,
}) => {
  const handleLike = () => {
    onLike(id);
  };

  const handleDislike = () => {
    onDislike(id);
  };

  const handleFavorite = () => {
    onFavorite(id);
  };

  return (
    <div className="joke">
      <p>{text}</p>
      <p>Likes: {likes}</p>
      <p className="favorite">{favorite && "***My favorite joke***"}</p>
      <button onClick={handleLike}>👍</button>
      <button onClick={handleDislike}>👎</button>
      <button onClick={handleFavorite}>My favorite</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Joke;

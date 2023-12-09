import * as React from 'react';
import ListGames from './ListGames';
import { useParams } from "react-router-dom";

function Games({user}) {
  let params = useParams();
  const path = params.path;

  return (
    <ListGames user={user} path={path ? path : "history"} key={path} />
  );
}

export default Games;


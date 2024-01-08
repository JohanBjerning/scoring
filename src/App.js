import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Scoreboard from './Scoreboard'
import Scoring from './Scoring'
import Login from './Auth/Login'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'
import Reset from './Auth/Reset'
import RegisterUser from './Auth/RegisterUser'
import Games from './Games'
import Analyze from './Analyze'
import BottomBarMain from './Components/BottomBarMain'
import CreateGame from './CreateGame'
import VolleyballCourt from './Components/VolleyballCourt'

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (u) => {
    if (u && u.uid !== user) {
      setUser(u.uid);
    }
    else if (user && !u)
      setUser(null)
  });

  console.log("h")

  return (
    <>
        <Routes>
          {!user ?
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterUser />} />
            </>
            :
            <>
              <Route path="/scoring">
                <Route path=":matchId/" element={<Scoring />} />
              </Route>
              <Route path="/analyze">
                <Route path=":matchId/:path" element={<Analyze />} />
              </Route>
              <Route path="/create" element={<CreateGame />} />
            </>
          }
          <Route path="/games">
            <Route path=":path" element={<Games user={user} />} />
          </Route>
          <Route exact path="court" element={<VolleyballCourt />} />
          <Route exact path="*" element={<Games user={user} />} />
          <Route exact path="/scoreboard" element={<Scoreboard />} />
          <Route exact path="/reset" element={<Reset />} />
        </Routes>
        <BottomBarMain user={user} />
    </>
  )
}

export default App
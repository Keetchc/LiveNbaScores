import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import GameListTable from './components/all-game-cards';
import GameDetailsCard from './components/focused-game-card';
import Alert from './components/error-check';
import SearchForm from './components/search-tool';

function App() {
  const jazzMem = {
    id: 474592,
    time: '3:44',
    status: '4th Qtr',
    home_team_score: 121,
    visitor_team_score: 115,
    home_team: {
      abbreviation: 'UTA',
      full_name: 'Utah Jazz',
      city: 'Utah'
    },
    visitor_team: {
      abbreviation: 'MEM',
      full_name: 'Memphis Grizzlies'
    },
  };

  const [date, setDate] = useState('2022-04-05');
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([jazzMem]);
  const [selectedGame, setSelectedGame] = useState(jazzMem);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const getAllGames = useCallback((page, games) => {
    if (page) {
      return fetch(`https://www.balldontlie.io/api/v1/games?per_page=100&page=${page}`)
        .then((response) => response.json())
        .catch(() => new Promise((r) => setTimeout(r, 25000)).then(() => getAllGames(page, games)))
        .then((result) => {
          return getAllGames(result.meta?.next_page, games.concat(result.data));
        });
    } else return games;
  }, []);

  useEffect(() => {
    getAllGames(1, [])
      .then(setAllGames)
      .finally(() => setLoading(false));
  }, [getAllGames]);

  async function apiCallGames(date) {
    const url = `https://www.balldontlie.io/api/v1/games?per_page=100&dates[]=${date}`;
    const result = await apiFetchData(url);
    setFilteredGames(result.data);
  }

  async function apiFetchData(url) {
    return await fetch(url).then(checkForErrors);
  }

  async function apiGameById(id) {
    return await apiFetchData(`https://www.balldontlie.io/api/v1/games/${id}`);
  }

  async function checkForErrors(r) {
    if (r.ok) {
      return await r.json();
    } else {
      setShowAlert(true);
      console.log(r);
    }
  }

  async function handleGameClick(id) {
    
    let gameData = loading ? await apiGameById(id) : allGames.find((game) => game.id === id);

    setSelectedGame({
      ...gameData,
    });
  }

  function pageChange(event) {
    setDate(event.target.value);
  }

  async function submitForm(event) {
    event.preventDefault();
    if (loading) await apiCallGames(date);
    else setFilteredGames(allGames.filter((game) => `${game.date}`.includes(date)));
  }

  return (
    <body className='bodyBackground'>
      <article>
        <section className="center search-form">
          <div className='cardBackground'>
            <GameDetailsCard game={selectedGame}></GameDetailsCard>
          </div>
          <div className='form h5'>
            <p>Enter a Date to see relavent games (YYYY-MM-DD):</p>
          <SearchForm name={date} handleSubmit={submitForm} pageChange={pageChange}></SearchForm>
          </div>
          <p className='h5'>Clicking on a game will make it become the focused game.</p>
        </section>
        <section className='gameListSection'>
          {showAlert ? <Alert setShow={setShowAlert}></Alert> : null}
          <GameListTable games={filteredGames} handleGameClick={handleGameClick}></GameListTable>
        </section>
      </article>
    </body>
  );
}

export default App;

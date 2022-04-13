import React from 'react';

import Card from 'react-bootstrap/Card';

export default function (props) {
  const game = props.game;
  return (
    <Card>
      <Card.Body>
        <Card.Title className='mb-0'><img src={`img/${game.visitor_team.full_name}.png`}></img>{`${game.visitor_team.full_name} @ ${game.home_team.full_name}`}<img bg="dark" src={`img/${game.home_team.full_name}.png`}></img></Card.Title>
          <div className='d-flex flex-row justify-content-center h1 font-weight-bold'>
            <span>{game.visitor_team_score}</span>
            <span className='px-5'>-</span>
            <span>{game.home_team_score}</span>
          </div>
          <Card.Subtitle>{game.time} {game.status} - {game.home_team.city}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

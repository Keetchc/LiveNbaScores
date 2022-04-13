import React from 'react';
import Card from 'react-bootstrap/esm/Card';

export default function (props) {
  return (
    <div className="d-flex justify-content-center flex-wrap">
        {props.games?.map((game) =>
          <Card className="cardHover m-4 .flex-grow-*" key={game.id} onClick={() => props.handleGameClick(game.id)}>
          <Card.Body>
            <Card.Title className='text-center mb-0'><img src={`img/${game.visitor_team.full_name}.png`}></img>{`${game.visitor_team_score} - ${game.home_team_score}`}<img bg="dark" src={`img/${game.home_team.full_name}.png`}></img></Card.Title>
            <Card.Subtitle className="text-center">{game.time} {game.status}</Card.Subtitle>
          </Card.Body>
        </Card>
        )}
    </div>
  );
}

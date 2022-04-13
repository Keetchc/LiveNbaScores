import React from 'react';

export default function(props) {
    return (
      <form onSubmit={props.handleSubmit}>
        <label>
          <input type="text" value={props.name} onChange={props.pageChange} />
        </label>
        <input className='btn' type="submit" value="Get Games" />
      </form>
    );
}
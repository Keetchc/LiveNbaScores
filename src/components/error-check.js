import React from 'react';

import Alert from 'react-bootstrap/Alert';

export default function (props) {
  return (
    <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
      <Alert.Heading>Temporary Error</Alert.Heading>
      <p className='text-danger'>There are too many concurrent requests hitting the API, try again in a couple minutes.</p>
    </Alert>
  );
}

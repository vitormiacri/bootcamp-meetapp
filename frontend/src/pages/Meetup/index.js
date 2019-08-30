/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Detail from './Detail';
import MeetupForm from './Form';

export default function Meetup({ history }) {
  const { meetup, edit } = history.location.state;

  return (
    <Container>
      {edit ? (
        <MeetupForm meetup={meetup} edit={edit} />
      ) : meetup ? (
        <Detail meetup={meetup} />
      ) : (
        <MeetupForm />
      )}
    </Container>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.object,
  edit: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object,
};

Meetup.defaultProps = {
  meetup: {},
  edit: false,
  history: {},
  location: {},
  state: {},
};

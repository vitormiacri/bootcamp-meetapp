/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { parseISO, format, toDate } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  MdAddCircleOutline,
  MdChevronRight,
  MdEvent,
  MdPlace,
} from 'react-icons/md';

import { Container, Info, MeetupList, Title, Date, Empty } from './styles';

import api from '~/services/api';
import history from '~/services/history';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/organizing');
      const data = response.data.map(meetup => ({
        ...meetup,
        dateFormatted: format(
          parseISO(meetup.date),
          "d 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
        date: toDate(parseISO(meetup.date)),
      }));
      setMeetups(data);
    }
    loadMeetups();
  }, []);

  function handleDetail(meetup) {
    history.push('/meetup/detail', { meetup });
  }

  function handleCreate() {
    history.push('/meetup/create', { meetup: null });
  }

  return (
    <Container>
      <Info>
        <strong>Meus Meetups</strong>
        <button type="button" onClick={() => handleCreate()}>
          <MdAddCircleOutline size={20} color="#FFF" /> Novo Meetup
        </button>
      </Info>
      <ul>
        {Object.keys(meetups).length > 0 ? (
          meetups.map(meetup => (
            <MeetupList
              key={meetup.id}
              type="button"
              past={meetup.past}
              onClick={() => handleDetail(meetup)}
            >
              <li>
                <Title>{meetup.title}</Title>
                <Date>
                  <strong>
                    <MdEvent size={20} color="#999" />
                    {meetup.dateFormatted}
                  </strong>
                  <strong>
                    <MdPlace size={20} color="#999" />
                    {meetup.localization}
                  </strong>
                  <MdChevronRight size={24} color="#999" />
                </Date>
              </li>
            </MeetupList>
          ))
        ) : (
          <Empty>Você não possui Meetups cadastrados</Empty>
        )}
      </ul>
    </Container>
  );
}

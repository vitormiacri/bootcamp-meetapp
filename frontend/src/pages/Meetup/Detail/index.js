import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Header, Date } from './styles';

export default function Detail({ meetup }) {
  function handleEdit() {
    history.push('/meetup/edit', { meetup, edit: true });
  }

  async function handleCancel() {
    try {
      await api.delete(`/meetups/${meetup.id}`);
      toast.success('Meetup cancelado com sucesso!');

      history.push('/dashboard');
    } catch (err) {
      toast.error('Ocorreu um erro ao cancelar, tente mais tarde!');
    }
  }

  return (
    <Container>
      <Header>
        <strong>{meetup.title}</strong>
        <aside>
          <button type="button" onClick={() => handleEdit()} className="edit">
            <MdEdit size={20} color="#FFF" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => handleCancel()}
            className="cancel"
          >
            <MdDeleteForever size={20} color="#FFF" />
            Cancelar
          </button>
        </aside>
      </Header>
      <img src={meetup.banner.url} alt={meetup.title} />
      <p>{meetup.description}</p>
      <Date>
        <strong>
          <MdEvent size={20} color="#999" />
          {meetup.dateFormatted}
        </strong>
        <strong>
          <MdPlace size={20} color="#999" />
          {meetup.localization}
        </strong>
      </Date>
    </Container>
  );
}

Detail.propTypes = {
  meetup: PropTypes.object.isRequired,
};

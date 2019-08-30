import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import BannerInput from './BannerInput';
import DateTimeInput from './DateTimeInput';
import { Container } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.date()
    .min(new Date(), 'Data e hora passadas não são permitidas')
    .required('A data é obrigatória'),
  localization: Yup.string().required('A localização é obrigatória'),
  banner_id: Yup.number('O Banner é obrigatório'),
});

export default function MeetupForm({ meetup, edit }) {
  async function handleSubmit(formData) {
    try {
      if (edit) {
        await api.put(`/meetups/${meetup.id}`, { ...formData });
        toast.success('Meetup alterado com sucesso!');
      } else {
        await api.post('/meetups', { ...formData });
        toast.success('Meetup criado com sucesso!');
      }
      history.push('/dashboard');
    } catch (err) {
      console.tron.error(err);
      toast.error('Ocorreu um erro ao salvar, verifique os dados!');
    }
  }

  return (
    <Container>
      <Form
        initialData={meetup}
        schema={schema}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <BannerInput name="banner_id" />
        <Input type="text" name="title" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          rows={10}
          placeholder="Descrição completa"
        />

        <DateTimeInput name="date" />
        <Input
          type="text"
          name="localization"
          placeholder="Localização do Meetup"
        />

        <button type="submit" className="submit">
          <MdAddCircleOutline size={20} color="#FFF" />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}
MeetupForm.propTypes = {
  meetup: PropTypes.object,
  edit: PropTypes.bool,
};

MeetupForm.defaultProps = {
  meetup: {},
  edit: false,
};

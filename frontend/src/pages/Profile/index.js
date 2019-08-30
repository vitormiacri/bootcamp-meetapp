import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';

import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field.required('A senha é obrigatória').min(6, 'Mínimo de 6 caracteres')
      : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirme sua senha')
          .oneOf([Yup.ref('password')], 'As senhas não conferem')
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(formData) {
    dispatch(updateProfileRequest(formData));
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <Input type="text" name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova Senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#FFF" />
          Salvar Perfil
        </button>
      </Form>
    </Container>
  );
}

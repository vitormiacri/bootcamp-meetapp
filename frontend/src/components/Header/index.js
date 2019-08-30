import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, UserInfo } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard" title="Dashboard">
            <img src={logo} alt="" />
          </Link>
        </nav>
        <aside>
          <UserInfo>
            <strong>{name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </UserInfo>
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}

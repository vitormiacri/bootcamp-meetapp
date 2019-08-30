import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 0 1.3em;
`;

export const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
  height: 5.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 32px;
    height: 32px;
  }

  aside {
    display: flex;

    button {
      background: #f94d6a;
      width: 71px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      /* font-size: 1.1em; */
      transition: background 0.2s;
      padding: 0 1em;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
  }
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  margin-right: 1.5em;

  strong {
    color: #fff;
    font-size: 1.1em;
    margin-bottom: 0.3em;
  }

  a {
    color: #999;
    font-size: 0.9em;
  }
`;

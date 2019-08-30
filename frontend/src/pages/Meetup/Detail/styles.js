import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 300px;
    border-radius: 4px;
  }

  p {
    width: 100%;
    color: #fff;
    font-weight: normal;
    font-size: 1.2em;
    margin: 1em 0;
  }
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 0;
  margin-bottom: 1em;

  strong {
    color: #fff;
    font-size: 1.8em;
    font-weight: normal;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background: #d44059;
      border: 0;
      width: 116px;
      border-radius: 4px;
      padding: 0.5em 0;
      color: #fff;
    }

    .edit {
      background: #4dbaf9;
      margin-right: 0.7em;

      &:hover {
        background: ${darken(0.05, '#4DBAF9')};
      }
    }

    .cancel {
      background: #d44059;

      &:hover {
        background: ${darken(0.05, '#D44059')};
      }
    }
  }
`;

export const Date = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2em;

  strong {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;
    opacity: 0.6;
    margin-right: 1em;

    svg {
      margin-right: 0.5em;
    }
  }
`;

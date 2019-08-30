import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #22202c, #402845);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 20em;
  text-align: center;
  margin: 0 0.7em;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 2em;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      margin: 0 0 10px;
      padding: 0 20px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 0.8em;
    }

    button {
      background: #f94d6a;
      height: 50px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      margin-top: 1.8em;
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

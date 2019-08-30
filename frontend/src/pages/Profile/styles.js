import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    margin: 3em 1em 0;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      margin: 0 0 10px;
      padding: 0 20px;
      color: #fff;
      font-size: 1.15em;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 0.8em;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 5px 20px;
    }


    button {
      background: #f94d6a;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 1.15em;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 162px;
      padding: .7em .6em;
      align-self: flex-end;
      font-size: .9em;
      margin-top: 1em;

      svg {
        margin-right: .5em;
      }

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
`;

import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding-bottom: 1em;

  form {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    .react-datepicker-wrapper,
    .react-datepicker__input-container {
      width: 100%;
    }

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 50px;
      margin: 0 0 10px;
      padding: 0 20px;
      color: #999;
      width: 100%;
      font-weight: normal;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      width: 100%;
      border-radius: 4px;
      padding: 20px 20px;
      color: #999;
      margin-bottom: 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: #f94d6a;
      align-self: flex-start;
      margin: 0 0 0.8em;
    }

    .submit {
      display: flex;
      align-items: center;
      align-self: flex-end;
      justify-content: space-evenly;
      background: #f94d6a;
      height: 50px;
      color: #fff;
      border: 0;
      width: 180px;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
  }
`;

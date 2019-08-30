import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    width: 100%;
  }
`;
export const Info = styled.div`
  margin: 3em 0;
  display: flex;
  width: 100%;
  /* padding: 0 1.3em; */
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 1.8em;
    font-weight: normal;
    color: #FFF;
  }

  button {
    background: #f94d6a;
      width: 172px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-weight: normal;
      font-size: .875em;
      transition: background 0.2s;
      padding: .8em 1em;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      &:hover {
        background: ${darken(0.04, '#f94d6a')};
      }
    }
  }
`;

export const MeetupList = styled.button.attrs(props => ({
  disabled: props.past,
}))`
  width: 100%;
  background: transparent;
  border: 0;
  opacity: ${props => (props.past ? 0.5 : 1)};
  cursor: ${props => (props.past ? 'not-allowed' : 'pointer')};

  ${props =>
    !props.past
      ? css`
          &:hover {
            transform: translateY(-3px) translateX(3px);
            transition: all 0.2s;
          }
        `
      : ''}

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em 1.5em;
    margin: 0 0 0.5em;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.strong`
  color: #fff;
  font-weight: normal;
`;

export const Date = styled.div`
  display: flex;
  align-items: center;

  strong {
    display: flex;
    align-items: center;
    font-size: 0.875em;
    font-weight: normal;
    color: #999;
    margin-right: 1.5em;

    svg {
      margin-right: 0.3em;
    }
  }
`;

export const Empty = styled.div`
  width: 100%;
  color: #fff;
  text-align: center;
  margin-top: 2em;
  font-size: 1.5em;
`;

import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 10px;

  label {
    cursor: pointer;

    img {
      height: 300px;
      width: 960px;
      border-radius: 4px;
    }

    input {
      display: none;
    }
    > span {
      color: #f94d6a;
      margin: 10px 0;
    }
  }
`;

export const BannerDefault = styled.div`
  width: 960px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: #999;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
  }
`;

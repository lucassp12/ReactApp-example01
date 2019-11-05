import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate( 360deg);
  }
`;
export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &:nth-child(2n + 0) {
      background: #ededed;
    }
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const BtnDetails = styled.button`
  font-weight: bold;
  background: #11ad00;
  border: none;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  a {
    color: #fff;
    text-decoration: none;
  }

  &:hover {
    background: #7159c1;
  }
`;

export const BtnRemove = styled.button`
  margin-left: 5px;
  color: #fff;
  font-weight: bold;
  background: #bf2222;
  border: none;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: #7159c1;
  }
`;

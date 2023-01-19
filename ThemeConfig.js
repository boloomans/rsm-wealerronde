import { createGlobalStyle } from "styled-components"
import styled from "@emotion/styled";

export const lightTheme = {
  body: '#FFF',
  text: '#363537',
  pColor: '#374151',
  toggleBorder: '#FFF',
  background: '#ffffff',
}

export const darkTheme = {
  body: '#121212',
  text: '#FAFAFA',
  pColor: '#FFF',
  toggleBorder: '#6B8096',
  background: '#999',
}

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "white" : "primary"};
  color: ${props => props.primary ? "primary" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: url(/public/favicon.ico);
  background-repeat: no-repeat;
  background-size: 6px 10px;
  background-position: center right 30px;
  height: 100px;
`;

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    // font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    // transition: all 0.50s linear;
  }
`

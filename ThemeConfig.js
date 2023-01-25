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
  color: ${props => props.primary ? "primary" : "white"};

  font-size: 1em;
  border-radius: 50%; 
`;



export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    // font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    // transition: all 0.50s linear;
  }
`


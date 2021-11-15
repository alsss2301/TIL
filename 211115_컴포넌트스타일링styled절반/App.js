import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from './components/Button';


const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`; //해당 스타일을 가진 컴포넌트를 만들 수 있음.(여기선 AppBlock컴포넌트) 만약에 div 를 스타일링 하고 싶으면 styled.div, input 을 스타일링 하고 싶으면 styled.input 이런식

const ButtonGroup = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

function App() {
  return (
    <ThemeProvider
    theme={{
      palette: {
        blue: '#228be6',
        gray: '#495057',
        pink: '#f06595'
      }
    }}
  >
    <AppBlock>
    <ButtonGroup>
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="gray" size="large">
            BUTTON
          </Button>
          <Button color="gray">BUTTON</Button>
          <Button color="gray" size="small">
            BUTTON
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button color="pink" size="large">
            BUTTON
          </Button>
          <Button color="pink">BUTTON</Button>
          <Button color="pink" size="small">
            BUTTON
          </Button>
        </ButtonGroup>
    </AppBlock>
  </ThemeProvider>
  );
}

export default App;
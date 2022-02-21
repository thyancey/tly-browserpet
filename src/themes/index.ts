import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
  }

  /* prevent text selection */
  * {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  
  #root{
    margin:0 auto;
  }
  h1, h2, h3, h4{
    font-family: 'Bevan', cursive;
  }
  a, p, span, h5, h6{
    font-family: 'Cabin', sans-serif;
  }
  h1{
    font-size: 5rem;
  }
  h2{
    font-size: 4rem;
  }
  h3{
    font-size: 3.5rem;
  }
  h4{
    font-size: 2.5rem;
  }
  h5{
    font-size: 2rem;
  }
  p, span{
    font-size:1.5rem;
    line-height: 1.5rem;
  }

  html{
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Cabin', sans-serif;
    background-color: black;
    color: white;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`

/*
export const mixinFontFamily = (style) => {
  switch(style){
    case 'details' : return css`font-family: 'Roboto', sans-serif`;
    case 'display': return css`font-family: 'Bevan', cursive`;
    default: return css`font-family: 'Roboto', sans-serif`;
  }
}
*/
export const listColors = () => {
  return Object.keys(store.colors);
}


export const getColor = (colorId: tColor) => {
  return store.colors[colorId] as CssString; 
}

export const getShadow = (shadowId: tShadow) => {
  return store.shadows[shadowId] as CssString;
}

export const getBreakpoint = (breakpointId: tBreakpoint) => {
  return store.breakpoints[breakpointId] as CssString;
}

/* from pablo on https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors */
export const getShade = (colId: tColor, percent: number) => {
  const color = colors[colId] || colId;

  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = Math.round(R * (100 + percent) / 100);
  G = Math.round(G * (100 + percent) / 100);
  B = Math.round(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

type CssString = string;

type tShadow = 'z1' | 'z2' | 'z3';
const shadows = {
  z1: '-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.16)',
  z2: '-0.1rem 0.1rem .25rem .1rem rgba(0,0,0,0.36)',
  z3: '-.2rem .5rem 1rem .2rem rgba(0,0,0,.36)'
}
export type tColor = 'black' | 'grey' | 'grey_light' | 'white' | 'blue' | 'green' | 'yellow' | 'red' | 'purple';
const colors = {
  black: '#000000',
  grey: '#373737',
  grey_light: '#A39F8E',
  white: '#fef8dd',
  blue: '#1fb9f3',
  green: '#51f249',
  yellow: '#fff249',
  red: '#F55658',
  purple: '#6b1ff3'
}

type tBreakpoint = 'mobile_tiny' | 'mobile_medium' | 'mobile_large' | 'tablet' | 'desktop';
const breakpoints = {
  mobile_tiny: '300px',
  mobile_medium: '400px',
  mobile_large: '500px',
  tablet: '768px',
  desktop: '1024px'
}

type ThemeStore = {
  colors: typeof colors,
  shadows: typeof shadows,
  breakpoints: typeof breakpoints
}

export const store: ThemeStore = {
  colors: colors,
  shadows: shadows,
  breakpoints: breakpoints
}


export const mixinFontFamily = (style: 'details'|'display') => {
  switch(style){
    case 'details' : return css`font-family: 'Roboto', sans-serif`;
    case 'display': return css`font-family: 'Bevan', cursive`;
    default: return css`font-family: 'Roboto', sans-serif`;
  }
}

export const mixinBubble = () => {
  return css`
    border-radius:2rem;
    border: .5rem solid;
  `
}

export const mixinColorBubble = (background: tColor, borderAndText: tColor = 'white') => {
  return css`
    ${mixinBubble()}
    border-color: ${getColor(borderAndText)};
    color: ${getColor(borderAndText)};
    background-color: ${getColor(background)};
  `
}

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100%;
        font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
        overflow: hidden;
    }

    body{
        -webkit-font-smoothing: antialiased !important;
    }

    button {
        cursor: pointer;
    }
`;
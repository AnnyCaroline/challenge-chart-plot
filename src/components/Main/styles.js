import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
    -webkit-flex: 1; /* Safari 6.1+ */
    -ms-flex: 1; /* IE 10 */ 
    flex: 1;

    display: flex;
    flex-direction: column;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
`;

export const Box = styled.div`
    height: ${props => props.myheight};
    flex-grow: 0;
    height: auto;
    padding: 0px ${props => `${props.padding}px`};
`;

export const ReadjustBar = styled.div`
    cursor: ${props => (props.direction === 'row') ? 'ew-resize' : 'ns-resize'};
    flex: 0 0 auto;
    -webkit-flex: 0 0 auto; /* Safari 6.1+ */
    -ms-flex: 0 0 auto; /* IE 10 */ 
    display: flex;
    flex-direction: ${props => (props.direction === 'row') ? 'column' : 'row'};
    position: relative;
    top: ${props => (props.direction === 'row') ? '0px' : '-7px'};
    left: ${props => (props.direction === 'row') ? '-7px' : '0px'};
    z-index: 999;

    .line {
        background-color: black;
        height: ${props => (props.direction === 'row') ? 'auto' : '2px'};
        width: ${props => (props.direction === 'row') ? '2px' : 'auto'};
        flex: 1;
        -webkit-flex: 1; /* Safari 6.1+ */
        -ms-flex: 1; /* IE 10 */ 
        align-self: center;
    }

    .box {
        background-color: black;
        border-radius: 3px;
        width: ${props => (props.direction === 'row') ? '13px' : '30px'};
        height: ${props => (props.direction === 'row') ? '30px' : '13px'};
        margin: auto;
        display: flex;
        flex-direction: ${props => props.direction};
        justify-content: space-between;
        padding: ${props => (props.direction === 'row') ? '5px 4px' : '4px 5px'};

        div {
            height: ${props => (props.direction === 'row') ? 'auto' : '1px'};
            width: ${props => (props.direction === 'row') ? '1px' : 'auto'};
            background-color: gray;
        }
    }
`;

export const Bar = styled.div`
    background-color: #DDDEE1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.5em;
    height: ${props => props.height};
    align-items: center;
    padding: 15px 40px;
`;

const rotate = keyframes`
    from {
        -ms-transform: rotate(0deg); /* IE 9 */
        -webkit-transform: rotate(0deg); /* Safari 3-8 */
        transform: rotate(0deg);  
    }
    to {
        -ms-transform: rotate(360deg); /* IE 9 */
        -webkit-transform: rotate(360deg); /* Safari 3-8 */
        transform: rotate(360deg);        
    }
`;

export const Button = styled.button`
    background-color: #017EFF;
    border-radius: 5px;
    padding: 13px 10px;
    cursor: pointer;
    border: 0;
    color: #FFF;
    text-transform: uppercase;
    min-width: 50px;   
    margin-right: 10px;

    ${props =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}

    ${props =>
        (props.direction === 'row') &&
        css`
            svg {
                -ms-transform: rotate(90deg); /* IE 9 */
                -webkit-transform: rotate(90deg); /* Safari 3-8 */
                transform: rotate(90deg);
            }
        `}

    &:hover{
        background-color: #0054a8;
    }

    &:disabled, &[disabled]{
        background-color: gray;
    }
`;

export const ErrorMessage = styled.div`
    color: red;
    flex: 1;
    -webkit-flex: 1; /* Safari 6.1+ */
    -ms-flex: 1; /* IE 10 */ 
`;
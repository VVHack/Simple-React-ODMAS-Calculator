import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


class NumberKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleClick(this.props.digit);
    }
    render(){
        let xPos = this.props.x+ 10;
        let yPos = this.props.y + 10;
        return(
            <button className="NumberKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>{this.props.digit}</button> //
        );
    }
}

class EnterKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleClick();
    }
    render(){
        let xPos = this.props.x;
        let yPos = this.props.y;
        return(
            <button className="EnterKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>Enter</button> //
        );
    }
}

class ClearKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleClick();
    }
    render(){
        let xPos = this.props.x;
        let yPos = this.props.y;
        return(
            <button className="ClearKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>C</button> //
        );
    }
}

class CancelKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleClick();
    }
    render(){
        let xPos = this.props.x;
        let yPos = this.props.y;
        return(
            <button className="CancelKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>AC</button> //
        );
    }
}

class OperatorKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleClick(this.props.sign);
    }
    render(){
        let xPos = this.props.x;
        let yPos = this.props.y;
        return(
            <button className="OperatorKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>{this.props.sign}</button> //
        );
    }
}


class UpKey extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.handleUpKey();
    }
    render(){
        let xPos = this.props.x;
        let yPos = this.props.y;
        return(
            <button className="UpKey" style={{left: xPos, top: yPos}} onClick={this.onClick}>^</button> //
        );
    }
}

class Calculator extends React.Component{
    constructor(){
        super();
        this.state = {
            numString: "0",
            prevString: "",
            ans: "0",
            charArr: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpKey  = this.handleUpKey.bind(this);
    }
    eval(arr1){
        if(arr1.length==1){
            if(arr1[0]=='Ans') return this.state.ans;
            return arr1[0];
        }
        let arr2 = [];
        let operators = ['/','x','+','-'];
        for(let i=0;i<4;++i){
            arr2.push(arr1[arr1.length-1]);
            arr1.pop();
            while(arr1.length != 0){
                if(arr1[arr1.length-1]==operators[i]){
                    if(arr1[arr1.length-2]=='Ans'){ 
                        arr1[arr1.length-2] = this.state.ans;
                    }
                    if(arr2[arr2.length-1]=='Ans'){ 
                        arr2[arr2.length-1] = this.state.ans;
                    }
                    arr1.pop();
                    if(i===0){
                        arr2[arr2.length-1] = parseFloat(arr1[arr1.length-1]) / parseFloat(arr2[arr2.length-1]);
                    }
                    if(i===1){
                        arr2[arr2.length-1] = parseFloat(arr1[arr1.length-1]) * parseFloat(arr2[arr2.length-1]);
                    }
                    if(i===2){
                        arr2[arr2.length-1] = parseFloat(arr1[arr1.length-1]) + parseFloat(arr2[arr2.length-1]);
                    }
                    if(i===3){
                        arr2[arr2.length-1] = parseFloat(arr1[arr1.length-1]) - parseFloat(arr2[arr2.length-1]);
                        //document.write(arr1[arr1.length-1]);
                    }
                    arr1.pop();
                }
                else{
                    arr2.push(arr1[arr1.length-1]);
                    arr1.pop();
                    arr2.push(arr1[arr1.length-1]);
                    arr1.pop();
                }
            }
            arr1 = arr2.slice().reverse();
            arr2 = [];
        }
        return arr1[0];
    }
    handleClick(digit){
        let str = this.state.numString;
        if(str.length>=30) return;
        let arr = this.state.charArr;
        arr.push(digit);
        if(str=='0'){ 
            if(!(digit=='+' || digit=='-' || digit=='x' || digit=='/')) str='';
        }
        if(digit=='+' || digit=='-' || digit=='x' || digit=='/'){
            if(str[str.length-2]=='+' || str[str.length-2]=='-' || str[str.length-2]=='x' || str[str.length-2]=='/'){
                return;
            }
            str += ' ';
            digit += ' ';
        }
        if(digit=='Ans'){
            if(!(str[str.length-2]=='+' || str[str.length-2]=='-' || str[str.length-2]=='x' || str[str.length-2]=='/' || str=='')){
                return;
            }
        }

        if(str.slice(str.length-3, str.length)=='Ans'){
            if(!(digit=='+ ' || digit=='- ' || digit=='x ' || digit=='/ ')){
                return;
            }
        }

        str += digit;
        this.setState({
            numString: str,
            charArr: arr,
        });
    }
    handleEnter(){
        let str = this.state.numString;
        let arr = this.state.numString.split(" ");
        let ans = this.state.ans;
        ans = this.eval(arr);
        this.setState({
            numString: "0",
            prevString: str + ' = ' + ans,
            ans: ans,
            charArr: [],
        });
    }
    handleClear(){
        let str = this.state.numString;
        if(str=='0') return;
        if(str.slice(str.length-3, str.length)=='Ans' || str[str.length-1]==' ') str = str.slice(0, str.length-3);
        else str = str.slice(0, str.length-1);
        if(str=='') str='0';
        this.setState({
            numString: str,
        });
    }
    handleCancel(){
        this.setState({
            numString: '0',
            prevString: '',
            ans: "0",
            charArr: [],
        });
    }
    handleUpKey(){
        if(this.state.prevString=='') return;
        let idx = this.state.prevString.indexOf('=');
        this.setState({
            prevString: '',
            numString: this.state.prevString.slice(0, idx-1),
        });
    }
    prepareNumButtons(){
        let xSpace = 70;
        let ySpace = 50;
        var buttonArray = Array(9).fill(null);
        for(var i=0;i<9;++i){
            buttonArray.push(<NumberKey digit={i+1} x={(i%3)*xSpace} y={Math.floor(i/3)*ySpace} handleClick={this.handleClick} />);
        }
        buttonArray.push(<NumberKey digit={'.'} x={0} y={3*ySpace} handleClick={this.handleClick} />);
        buttonArray.push(<NumberKey digit={0} x={xSpace} y={3*ySpace} handleClick={this.handleClick} />);
        buttonArray.push(<NumberKey digit={'Ans'} x={2*xSpace} y={3*ySpace} handleClick={this.handleClick} />);
        return buttonArray;
    }
    render(){
        let buttons = this.prepareNumButtons();
        return (
            <div className="Calculator">
                <div className="Title"><p>Vedant's Simple Calculator</p></div>
                <div className="Screen">
                    <p style={{position: 'absolute', left: '10', top: '5'}}>{this.state.prevString}</p>
                    <p style={{position: 'absolute', left: '10', top: '40'}}>{this.state.numString}</p>
                </div>
                <div>
                    <OperatorKey sign='+' x={15} y={140} handleClick={this.handleClick} />;
                    <OperatorKey sign='-' x={85} y={140} handleClick={this.handleClick} />;
                    <OperatorKey sign='x' x={155} y={140} handleClick={this.handleClick} />;
                    <OperatorKey sign='/' x={225} y={140} handleClick={this.handleClick} />;
                </div>
                <div>
                    <UpKey x={245} y={180} handleUpKey={this.handleUpKey} />
                    <ClearKey x={240} y={220} handleClick={this.handleClear} />
                    <CancelKey x={235} y={260} handleClick={this.handleCancel} />
                    <EnterKey x={230} y={300} handleClick={this.handleEnter} />
                </div>
                <div className="NumberKeyPad">
                    {buttons}
                </div>
            </div>
        );
    }
}

//{buttons}


ReactDOM.render(<Calculator />, document.getElementById('root'));
registerServiceWorker();

// Oye chakde phatte


import {useReducer}from "react"
import DigitButton from "./DigitButton";
import operationButton from "./OperationButton";
import "./style.css";


export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}




function reducer(state,{type,payload}){
 switch(type){
  case ACTIONS.ADD_DIGIT:
    if(state.overWrite){
      return{
        ...state,
        currentOperand: payload.digit,
        overWrite: false,
      }
    }
    if(payload.load === "0" && state.currentOperand === "0") {
      return state
    
    }
    if(payload.load === "0" && state.currentOperand .includes(".")) {
      return state
    }
    return{
      ...state,
      currentOperand: '${currentOperand || "}${payload.digit}'
    }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand==null){
        return state
      }

     if(state.currentOperand ==null){
      return{
        ...state,
        operation:payload.operation,
      }
     }

      if(state.previousOperand==null){
        return{
          ...state,
          operation:payload.operation,
          previousOperand:state.currentOperand,
          currentOperand:null,
        }
      }
      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand:null
      }
    case ACTIONS.CLEAR:
      return {}
      case ACTIONS.EVALUATE:
        if(
          state.operation==null||
          state.currentOperand==null||
          state.previousOperand==null
        ){
          return state
        }
        return{
          ...state,
          overWrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state)
        }
 }
}


function evaluate({currentOperand,previousOperand,operation}){
  const prev=parseFloat(previousOperand)
  const current=parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation=""
  switch(operation){
    case "+":
  let computation = prev + current
  break
  case "-":
    computation=prev-current
  break
  case "*":
    computation=prev*current
  break
  case "/":
    computation=prev/current
  break
  }
  return computation.toString()
}






function App() {
  const[{currentOperand,previousOperand,operand},dispatch]=useReducer(reducer,{})
  dispatch({type:ACTIONS.ADD_DIGIT,paload:{digit:1}})
  
  
  
  
  return (
  <div className="calculater-grid">
    <div className="output">
      <div className="previous-operand">{previousOperand}{operand}</div>
      <div className="current-operand">{currentOperand}</div>
    </div>
     <button className="sapn-two" onClick={()=>({type:ACTIONS.CLEAR})}>Ac</button>
     <button>DEL</button>
     {/*< DigitButton digit="+" dispatch={dispatch}/>*/}
     
     < operationButton operation="+" dispatch={dispatch}/>
      < DigitButton digit="1" dispatch={dispatch}/>
    < DigitButton digit="2" dispatch={dispatch}/>
    < DigitButton digit="3" dispatch={dispatch}/>
    < operationButton operation="*" dispatch={dispatch}/>
     < DigitButton digit="4" dispatch={dispatch}/>
     < DigitButton digit="5" dispatch={dispatch}/>
     < DigitButton digit="6" dispatch={dispatch}/>
     < operationButton operation="+" dispatch={dispatch}/>
     < DigitButton digit="7" dispatch={dispatch}/>
     < DigitButton digit="8" dispatch={dispatch}/>
     < DigitButton digit="9" dispatch={dispatch}/>
     < operationButton operation="-" dispatch={dispatch}/>
     < DigitButton digit="." dispatch={dispatch}/>
     < DigitButton digit="0" dispatch={dispatch}/>
     <button className="sapn-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>=</button>


  </div>
  );
}

export default App;

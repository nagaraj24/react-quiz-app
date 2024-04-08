import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'; 
import questionBank from '../api/questionBank.json'


export default function Quiz() {

  const { id } = useParams()
  const [questionIndex, setquestionIndex] = useState(0);
  const [question, setQuestion] = useState( questionBank.find(q => q.id === parseInt(id)).questionbank[questionIndex]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [inCorrect, setInCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isNextBtnDisabled, setisNextBtnDisabled] = useState(true);
  const [isOkBtnDisabled, setisOkBtnDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [answerStatus, setAnswerStatus] = useState("");
  const [isShowResult, setIsShowResult] = useState(false);
  const [remaingTime, setRemainingTime] = useState(10);
  const [percentage, setPercentage] = useState(0);
  

  useEffect (()=>{
    const Remaingtimer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    },1000);
   
    return () => clearInterval(Remaingtimer);
  },[isCorrect, selectedOption]);

  useEffect (()=>{
    const timer = setTimeout(() => {
     
      if(!isCorrect && selectedOption === ''){
        setIsCorrect(false);
        handleNext();
      }
      else {
        setIsCorrect(true);
        handleNext();
      }
    },remaingTime * 1000);
    return () => clearTimeout(timer);
  },[questionIndex, isCorrect, selectedOption]);

  


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setisOkBtnDisabled(false);
  }
  const handleCheckAnswer = () =>{
    if(selectedOption === question.Answer){
      setIsCorrect(true);
      setAnswerStatus("Your Answer is correct");
      setScore(prevScore => prevScore+1);
    }
    else {
      setIsCorrect(false);
      setInCorrect(true);
      setAnswerStatus("Your Answer is wrong. Correct answer is "+question.Answer);
    }
    setisNextBtnDisabled(false);
    setisOkBtnDisabled(true);
 
    
  }

  const handleNext = () => {
    let totalQuestions = questionBank.find(q => q.id === parseInt(id)).questionbank;
    if(questionIndex < totalQuestions.length - 1){
      setquestionIndex(prevIndex => prevIndex + 1);
      setQuestion(totalQuestions[questionIndex + 1])
      setSelectedOption("");
      setIsCorrect(null);
      setAnswerStatus("");
      setisOkBtnDisabled(true);
      setisNextBtnDisabled(true);
      setRemainingTime(10);
    }
    else {
      setInCorrect(totalQuestions.length - score);
      setIsShowResult(true);
    }

    setPercentage(((100/totalQuestions.length)*score).toFixed());
  } 

  return (
    <>
    {!isShowResult ? (
      <div className="container mt-5">
      <h1>{questionIndex+1}</h1>
      <p>Remaing Time: {remaingTime} seconds</p>
      <h2 data-testid="question">Q.{question.Question}</h2>
      <div className="options">
  
      <div className="form-check">
        <input className="form-check-input" checked={selectedOption === 1} onChange={()=>handleOptionSelect(1)} name="options" data-testid="option-1"  type="radio" id={question.Option1} value={question.Option1} />
        <label className="form-check-label" htmlFor={question.Option1}>
          {question.Option1}
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" checked={selectedOption === 2} onChange={()=>handleOptionSelect(2)} name="options" data-testid="option-2"  type="radio" id={question.Option2} value={question.Option2} />
        <label className="form-check-label" htmlFor={question.Option2}>
          {question.Option2}
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" checked={selectedOption === 3} onChange={()=>handleOptionSelect(3)} name="options" data-testid="option-3"  type="radio" id={question.Option3} value={question.Option3} />
        <label className="form-check-label" htmlFor={question.Option3}>
          {question.Option3}
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" checked={selectedOption === 4} onChange={()=>handleOptionSelect(4)} name="options" data-testid="option-4"  type="radio" id={question.Option4} value={question.Option4} />
        <label className="form-check-label" htmlFor={question.Option4}>
          {question.Option4}
        </label>
      </div>
      </div>
      <div className="answers">
          <div data-testid="validate-answer" style={{color:isCorrect ? "green" : "red"}}>{answerStatus}</div>
      </div>
      <div className="button d-flex justify-content-between mt-3">
        <button className="btn btn-danger" onClick={handleCheckAnswer} data-testid="ok" disabled={isOkBtnDisabled}>Ok</button>
        <button className="btn btn-danger" onClick={handleNext} data-testid="next" disabled={isNextBtnDisabled}>Next</button>
      </div>
    </div>
    ) : (
        <div className='container text-center mt-5 ResultWrapper'>
          <h2 className='text-info'>Thanks for attempting the test</h2>
          <h1 data-testid="score" className='text-primary'>Your Score is: {score}</h1>
          <h4 data-testid="correct-question" className='text-success'>Total Correct:- {score}</h4>
          <h4 data-testid="incorrect-question" className='text-danger'>Total Incorrect:- {inCorrect}</h4>
          <h2 data-testid="percentage-question" className='text-success'>Total Percentage:- {percentage}%</h2>
          <Link to="/"><button className="btn btn-primary mt-3" data-testid = "attempt">Go Home</button>
            </Link>
        </div>
    )}
      
    </>
  )

 
  
}

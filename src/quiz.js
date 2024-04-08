import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useHistory } from 'react';
import questionnaires from '../api/questionnaires.json'


export default function Home(){
    const history = useHistory();

    const handleButtonClick = (id) => {
        history.push('/questionnaire/:'+id);
    };
  return (
      <>
      <div className="container">
            <h1>Questionnaires</h1>
            {
                questionnaires.map(question => (
                    <div key={question.id} className="card">
                        <div className="title" data-testid={"title-"+question.title}>{question.title}</div>
                        <div className="title mt-3" data-testid="questionnaire-number">No.of Questions: {question.questions}</div>
                        <button onClick={()=>handleButtonClick(question.id)} className="btn btn-primary mt-3" data-testid = "attempt">Attempt Quiz</button>
                    </div>
                ))
            }
      </div>
      
      </>
  );

}

import React from 'react';
import { Link} from 'react-router-dom';
import questionnaires from '../api/questionnaires.json'


export default function Home(){
   

   
  return (
      <>
      <div className="container">
            <h1>Questionnaires</h1>
            {
                questionnaires.map(question => (
                    <div key={question.id} className="card">
                        <div className="title" data-testid={"title-"+question.title}>{question.title}</div>
                        <div className="title mt-3" data-testid="questionnaire-number">No.of Questions: {question.questions}</div>
                        <Link to={`/questionnaire/${question.id}`}><button className="btn btn-primary mt-3" data-testid = "attempt">Attempt Quiz</button>
                        </Link>
                    </div>
                ))
            }
      </div>
      
      </>
  );

}

import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [state, setState] = useState({
      name: "Name",
      fullness: 20,
      happiness: 20,
      energy: 50,
      meals: 3,
      imgurl: 'https://images.vexels.com/media/users/3/134594/isolated/preview/cb4dd9ad3fa5ad833e9b38cb75baa18a-happy-emoji-emoticon-by-vexels.png',
      died: 0,
      win: 0
  });

  const [changes, setChanges] = useState({
      fullness: 0,
      happiness: 0,
      energy: 0,
      meals: 0,
  });


  // Playing with your Dojodachi costs 5 energy and gains a random amount of happiness between 5 and 10
  const doPlay = (e) => {
    

    setState({
        ...state,
        energy: state.energy-5,
        happiness: state.happiness+Math.floor(Math.random() * 10) + 5,
        imgurl: 'https://stmedia.stimg.co/ows_14514067624484.jpg?fit=crop&crop=faces'
    });
  };

  //Feeding your Dojodachi costs 1 meal and gains a random amount of fullness between 5 and 10 
  // (you cannot feed your Dojodachi if you do not have meals)
  const doFeed = (e) => {
    if(state.meals<1)
      return;

        setState({
          ...state,
          meals: state.meals-1,
          fullness: state.fullness+Math.floor(Math.random() * 10) + 5,
          imgurl: 'https://previews.123rf.com/images/3dgenerator/3dgenerator1707/3dgenerator170701484/83031194-emoji-emoticon-happy.jpg'
      });
      checkStatus();
  };

  //Working costs 5 energy and earns between 1 and 3 meals
  const doWork = (e) => {
        setState({
          ...state,
          meals: state.meals+Math.floor(Math.random() * 3) + 1,
          energy: state.energy- 5  ,
          imgurl: 'https://st.depositphotos.com/1001911/1554/v/450/depositphotos_15540341-stock-illustration-thumb-up-emoticon.jpg'
      });
      checkStatus();
  };


  //Sleeping earns 15 energy and decreases fullness and happiness each by 5
  const doSleep = (e) => {
        setState({
          ...state,
          energy: state.energy+15,
          fullness: state.fullness-5,
          happiness: state.happiness-5,
      });
      checkStatus();
  };

  const checkStatus = () => {
    //If energy, fullness, and happiness are all raised to over 100, you win! a restart button should be displayed.
    if(state.energy >100 && state.fullness>100 && state.happiness>100) {
          setState({
            ...state,
            win: 1,
        });
      }
      //If fullness or happiness ever drop to 0, you lose, and a restart button should be displayed.
      if(state.happiness <0){
        setState({
          ...state,
          died: 1,
      });
      }
  }

  const doRestart = () => {
      setState({
        ...state,
        fullness: 20,
        happiness: 20,
        energy: 50,
        meals: 3,
        imgurl: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/crazy-face.png',
        died: 1,
        win: 0
        });
  }

  

  return (
      <>
        <div className="container">
          <div className="row">
          <div className="col-md-3">
            <h4>Stats</h4>
            <p>
            Fullness
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{ width: `${state.fullness}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </p>
            <p>
            Happiness
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{ width: `${state.happiness}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </p>
            <p>
            Energy
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{ width: `${state.energy}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </p>
           <p>
           Meals
            <div class="progress">
              <div class="progress-bar" role="progressbar" style={{ width: `${state.meals}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>           </p>
            <h4>Actions</h4>
            <button onClick={doWork}>Work</button>
            <button onClick={doSleep}>Sleep</button>
            <button onClick={doFeed}>Eat</button>
            <button onClick={doPlay}>Play</button>
          </div>

          <div className="col-md-9">
            <h1>{state.name}</h1>
            <img src={state.imgurl} alt="emoji" width="200"/>


            {
              state.died===1 ?
                  <>
                    <h1>Your Datchi died</h1>
                    <button onClick={doRestart}>Restart</button>
                  </>
              : null
            }

            {
              state.win===1 ?
                  <>
                    <h1>You won</h1>
                    <button onClick={doRestart}>Restart</button>
                  </>
              : null
            }

          </div>

          </div>

        </div>

      </>    
  );
}

export default App;

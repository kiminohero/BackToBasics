import React, { Component } from "react";
import RandomNumber from "./RandomNumber";
import NumOpt from "./NumOpt";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attempt: 0, // Total Number of Attempts
      lApttempt: 0, // Lucky attempts
      wAttempts: 0, // Wrong Attempts
      luckNum: 0, // The Lucky Number Generated
      num: {}, // the Option numbers
      hide: true, // whether to hide the option numbers or not
      mssg: "", // Result Message
      mssgClss: "",
      success: null
    };
    this.baseState = this.state; // Storing the intial state of the application to reset at the end of game
  }

  setRandomValues(luckNum, num) {
    // generate random value to place the numbers in a random order in the options
    let i = Math.floor(Math.random() * 3);
    num[i] = luckNum;
    let j = 0,
      newNum;
    while (j < 3) {
      newNum = Math.floor(Math.random() * 100);
      if (j !== i) {
        while (
          Object.values(num).indexOf(newNum) !== -1 // Check for redundant numbers
        )
          newNum = Math.floor(Math.random() * 100);
        num[j] = newNum;
      }
      j++;
    }
    return num;
  }

  getLuckNum(cb) {
    // Generate a random Lucky number
    let number = Math.floor(Math.random() * 100);
    this.setState({ luckNum: number });
    let { num } = this.state;
    num = cb(number, num);
    this.setState({ num });
  }

  componentDidMount() {
    this.getLuckNum(this.setRandomValues);
  }

  ResultMessage = () => {
    // Generate result message
    let { lApttempt } = this.state;
    if (lApttempt >= 0 && lApttempt <= 3)
      this.setState({ mssg: "Bad Luck", mssgClss: "bdL" });
    else if (lApttempt >= 4 && lApttempt <= 6)
      this.setState({ mssg: "Good Luck", mssgClss: "gDL" });
    else if (lApttempt >= 7 && lApttempt <= 10)
      this.setState({ mssg: "Excellent Luck", mssgClss: "excL" });
  };

  clickedOpts = async value => {
    // Event triggered after any option is clicked
    let { luckNum, attempt, lApttempt, wAttempts } = this.state;
    try {
      await this.setState({ hide: false, attempt: attempt + 1 });

      if (value === luckNum)
        await this.setState({ lApttempt: lApttempt + 1, success: true });
      else await this.setState({ wAttempts: wAttempts + 1, success: false });
      if (attempt + 1 === 10) {
        this.ResultMessage();
      }
    } catch (err) {
      console.log(err);
    }
  };

  onClick = () => {
    // play next round
    this.getLuckNum(this.setRandomValues);
    this.setState({ hide: true, success: null });
  };

  playAgain = async () => {
    // when all ten rounds are done
    try {
      await this.setState(this.baseState);
      this.componentDidMount();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="game">
        <h1>Luck Calculator</h1>
        <div className="attmpt">
          <div>Number of Attempts: {this.state.attempt} / 10 </div>
          <div>
            <div>Lucky Attempts: {this.state.lApttempt}</div>
            <div>Wrong Attempts: {this.state.wAttempts}</div>
          </div>
        </div>
        <RandomNumber luckNum={this.state.luckNum} />
        <NumOpt
          clickedOpt={this.clickedOpts}
          opts={this.state.num}
          hide={this.state.hide}
          success={this.state.success}
        />
        {this.state.attempt > 0 &&
        this.state.attempt < 10 &&
        this.state.hide === false ? (
          <button className="nxtRnd" onClick={this.onClick}>
            play next round <div></div>
          </button>
        ) : null}
        {this.state.attempt === 10 ? (
          <h2 className={`mssg ${this.state.mssgClss}`}>{this.state.mssg}</h2>
        ) : null}
        {this.state.attempt === 10 ? (
          <button className="nxtRnd" onClick={this.playAgain}>
            play Again <div></div>
          </button>
        ) : null}
      </div>
    );
  }
}

export default App;

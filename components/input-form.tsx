
import React from 'react';
import { EventHandler } from '../services/event-handler.service';
import { ExcuseService as ExcuseService } from '../services/excuses.service';
import { PetitionService } from '../services/petition.service';
import { AppEvents, ButtonState } from '../shared/enums';

const PetitionTemplate = 'please answer the following question';

const PetitionInputId = 'petition-input';
const QuestionInputId = 'question-input';
const AnswerId = 'answer';
const Delimiter = '.';

let maskInput = false;
let delimiterCount = 0;
let petitionTemplateIndex = 0;

export interface InputFormProps {
  petition: string;
  maskedPetition: string;
  question: string;
  askButtonText: string;
  answerText: string;
  inputDisabled: boolean;
}


export default class InputForm extends React.Component<{}, InputFormProps> {


  constructor(props: any) {

    super(props);

    this.state = this.defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  get defaultState() {
    return {
      petition: '',
      maskedPetition: '',
      question: '',
      askButtonText: ButtonState.Ask,
      answerText: '',
      inputDisabled: false
    }
  }


  handleChange(event: any) {

    switch (event.target.id) {
      case PetitionInputId:
        this.maskPetitionInput(event);
        break;

      case QuestionInputId:
        this.setState({ question: event.target.value });
        break;
    }
  }


  maskPetitionInput(event: any) {

    const keyPressed = event.nativeEvent.data;

    this.setState({ petition: this.state.petition + keyPressed });

    if (!keyPressed) {

      if (event.nativeEvent.inputType === 'deleteContentBackward') {
        this.setState({ maskedPetition: this.state.maskedPetition.slice(0, -1) });

      } else {
        this.setState({ maskedPetition: this.state.maskedPetition + ' ' });
      }

      return;
    }

    if (keyPressed === Delimiter) {

      if (delimiterCount === 0) { // start masking input

        maskInput = true;
        delimiterCount = 1;

        const petition = this.state.petition.trim();
        const wordsArr = petition.split(' ');
        const lastTypedWord = wordsArr[wordsArr.length - 1];
        petitionTemplateIndex = PetitionTemplate.lastIndexOf(lastTypedWord.toLowerCase());

        if (petitionTemplateIndex === -1) {
          petitionTemplateIndex = 0;

        } else {
          petitionTemplateIndex += lastTypedWord.length;
        }

      } else if (delimiterCount === 1) {

        maskInput = false;
        delimiterCount = 2;

        let character = PetitionTemplate[petitionTemplateIndex];
        character = character ? character : ' ';
        this.setState({ maskedPetition: this.state.maskedPetition + character });
        petitionTemplateIndex += 1;

        return;
      }
    }

    if (maskInput) {

      let character = PetitionTemplate[petitionTemplateIndex];
      character = character ? character : ' ';
      this.setState({ maskedPetition: this.state.maskedPetition + character });
      petitionTemplateIndex += 1;

    } else {
      this.setState({ maskedPetition: this.state.maskedPetition + keyPressed })
    }
  }


  handleSubmit(event: any) {

    event.preventDefault();

    if (this.state.askButtonText === ButtonState.AskAgain) {
      this.resetValues();
      return;
    }

    this.emitThinkingEvent(true);

    this.setState({
      askButtonText: ButtonState.Thinking,
      inputDisabled: true
    });

    const petition = this.state.petition;

    setTimeout(() => {
      PetitionService.processPetition(petition,
        this.handleSuccess.bind(this), this.handleFailure.bind(this));
    }, 2000);

  }


  handleSuccess(answerText: string) {

    this.setState({
      askButtonText: ButtonState.AskAgain,
      answerText: answerText
    });
  }


  handleFailure(invalidFormat: boolean) {

    const excuse = ExcuseService.fetchExcuse(invalidFormat);

    this.setState({
      askButtonText: 'Ask again',
      answerText: excuse
    });
  }

  resetValues() {
    this.setState({ ...this.defaultState });
    maskInput = false;
    petitionTemplateIndex = 0;
    delimiterCount = 0;
  }


  emitThinkingEvent(enable: boolean) {

    EventHandler.getHandler().emit(AppEvents.Thinking, enable);
  }


  render() {

    const inputDisabledClass = this.state.inputDisabled ? ' disabled' : '';
    const inputClasses = "placeholder-gray-500 w-9/12 text-white max-w-screen-md p-3 mt-10 rounded-none" + inputDisabledClass;

    return (
      <div className="content">
        <div className="text-2xl ml-24">
          <form className="flex flex-col justify-center"
            onSubmit={this.handleSubmit}>

            {/* petition input */}
            <input className={inputClasses}
              id={PetitionInputId}
              name="petition"
              type="text"
              placeholder="Write your petition"
              value={this.state.maskedPetition}
              onChange={this.handleChange}
              autoComplete="off"
              required />

            {/* question input */}
            <input className={inputClasses}
              id={QuestionInputId}
              name="question"
              type="text"
              placeholder="Write what you want to know"
              value={this.state.question}
              onChange={this.handleChange}
              autoComplete="off"
              required />

            {/* ask button */}
            <button id="ask-button" className="rounded w-40 text-white p-2 mt-10 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-400 hover:to-blue-600">
              {this.state.askButtonText}
            </button>

          </form>
        </div>

        <div id={AnswerId} className="text-6xl text-white ml-24 mt-20">{this.state.answerText}</div>
      </div>
    );
  }
}
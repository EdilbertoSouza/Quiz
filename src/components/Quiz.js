import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimButton from './AnimButton'
import LongText from './LongText';

const { width, height } = Dimensions.get('window')

let data = []
const jsonData = {
  "quiz": {
    "quiz1": {
      "question1": {
        "correctoption": "option3",
        "options": {
          "option1": "Java",
          "option2": "PHP",
          "option3": "Javascript",
          "option4": "IOS"
        },
        "question": "React Native é uma biblioteca ?"
      },
      "question2": {
        "correctoption": "option4",
        "options": {
          "option1": "XML",
          "option2": "YML",
          "option3": "HTML",
          "option4": "JSX"
        },
        "question": "A sintaxe das tags usada em React Native é ?"
      },
      "question3": {
        "correctoption": "option1",
        "options": {
          "option1": "Single root DOM node",
          "option2": "Double root DOM node",
          "option3": "Multiple root DOM node",
          "option4": "None of the above"
        },
        "question": "Um aplicativo construído com React Native geralmente tem ?"
      },
      "question4": {
        "correctoption": "option2",
        "options": {
          "option1": "mutable",
          "option2": "immutable",
          "option3": "variable",
          "option4": "none of the above"
        },
        "question": "Elementos React Native são ?"
      },
      "question5": {
        "correctoption": "option3",
        "options": {
          "option1": "functions",
          "option2": "array",
          "option3": "components",
          "option4": "json data"
        },
        "question": "React Native permite dividir a interface do usuário em partes independentes e reutilizáveis que são chamadas de ?"
      }
    }
  }
}

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.qno = 0
    this.score = 0

    const jdata = jsonData.quiz.quiz1
    data = Object.keys(jdata).map(function (k) { return jdata[k] });
    this.state = {
      question: data[this.qno].question,
      options: data[this.qno].options,
      correctoption: data[this.qno].correctoption,
      countCheck: 0
    }
  }

  prev() {
    if (this.qno > 0) {
      this.qno--
      this.setState({ question: data[this.qno].question, options: data[this.qno].options, correctoption: data[this.qno].correctoption })
    }
  }

  next() {
    if (this.qno < data.length - 1) {
      this.qno++
      this.setState({ countCheck: 0, question: data[this.qno].question, options: data[this.qno].options, correctoption: data[this.qno].correctoption })
    } else {
      this.props.quizFinish(this.score * 100 / 5)
    }
  }

  _answer(status, ans) {
    if (status == true) {
      const count = this.state.countCheck + 1
      this.setState({ countCheck: count })
      if (ans == this.state.correctoption) {
        this.score += 1
      }
    } else {
      const count = this.state.countCheck - 1
      this.setState({ countCheck: count })
      if (this.state.countCheck < 1 || ans == this.state.correctoption) {
        //this.score -= 1
      }
    }
  }

  render() {
    let _this = this
    const currentOptions = this.state.options
    const options = Object.keys(currentOptions).map(function (k) {
      return (
        <View key={k} >
          <AnimButton countCheck={_this.state.countCheck} onColor={"#757575"} effect={"tada"} _onPress={(status) => _this._answer(status, k)} text={currentOptions[k]} />
        </View>
      )
    });

    return (
      <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.oval} >
              <Image style={styles.image} source={require('../../assets/img_react.png')} />
              <LongText style={styles.container} label="" content={this.state.question} />
              {options}
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.next()} >
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10, paddingLeft: 10, borderRadius: 10, backgroundColor: "#757575" }}>
                  <Icon name="md-arrow-round-forward" size={30} color="white" />
                </View>
              </TouchableOpacity >
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  oval: {
    width: width * 80 / 100,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: '10%',
    height: '10%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 30
  },
});
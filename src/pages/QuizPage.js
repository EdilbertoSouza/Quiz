import React, { Component } from 'react';
import Quiz from '../components/Quiz';
import {
    StyleSheet,
    StatusBar,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

export default class QuizPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quizFinish: false,
            score: 0
        }
    }

    static navigationOptions = {
        title: "Quiz - Perguntas",
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#6ca2f7',
            borderBottomWidth: 1,
            borderBottomColor: '#C5C5C5',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 20,
        }
    };

    _onPressBack() {
        const { goBack } = this.props.navigation
        goBack()
    }
    _quizFinish(score) {
        this.setState({ quizFinish: true, score: score })
        this.updateResult(score)

    }
    async updateResult(score) {
        try {
            const uid = await firebase.auth().currentUser.uid;
            result = await firebase.database().ref(`result/${uid}/`).set({score: score});            
        } catch (error) {
            console.log(error.toString())
        }
    };

    _scoreMessage(score) {
        if (score <= 30) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>Você precisa estudar</Text>
                <Text style={styles.score}>Você marcou {score}%</Text>
            </View>)
        } else if (score > 40 && score < 80) {
            return (<View style={styles.innerContainer} >
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>Seu conhecimento é bom</Text>
                <Text style={styles.score}>Você marcou {score}% </Text>
            </View>)
        } else if (score >= 80) {
            return (<View style={styles.innerContainer}>
                <View style={{ flexDirection: "row" }} >
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                    <Icon name="trophy" size={30} color="white" />
                </View>
                <Text style={styles.score}>Seu conhecimento é muito bom!</Text>
                <Text style={styles.score}>Você marcou {score}% </Text>
            </View>)
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                {this.state.quizFinish ? <View style={styles.container}>
                    <View style={styles.circle}>
                        {this._scoreMessage(this.state.score)}
                    </View>
                </View> : <Quiz quizFinish={(score) => this._quizFinish(score)} />}
            </View>
        );
    }
}

const scoreCircleSize = 300
const styles = StyleSheet.create({
    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scoreCircleSize,
        height: scoreCircleSize,
        borderRadius: scoreCircleSize / 2,
        backgroundColor: "#757575"
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
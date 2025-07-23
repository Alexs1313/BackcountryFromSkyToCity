import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { BlurView } from '@react-native-community/blur';

import { quiz } from '../data/quiz';
import SmallGradientButton from '../components/SmallGradientButton';
import LargeGradientButton from '../components/LargeGradientButton';
import MediumGradientButton from '../components/MediumGradientButton';
import { facts } from '../data/facts';

const { height } = Dimensions.get('window');

const Quiz = () => {
  const navigation = useNavigation();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  const handleSelectOption = selectedOption => {
    const isCorrectAnswer = quiz[currentQuestionIdx].answer == selectedOption;

    setIsCorrect(isCorrectAnswer);
    setSelectedOption(selectedOption);

    if (currentQuestionIdx === quiz.length - 1) {
      setTimeout(() => {
        if (isCorrectAnswer) {
          setScore(score + 1);
          setIsVisibleModal(true);
          return;
        }
        setShowResult(true);
      }, 1300);
    } else {
      isCorrectAnswer
        ? setTimeout(() => {
            setIsVisibleModal(true);
            setScore(score + 1);
          }, 800)
        : setTimeout(() => {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
            setIsCorrect(false);
            setSelectedOption(null);
          }, 1300);
    }
  };

  const handleNextQuestion = () => {
    setIsVisibleModal(false);
    setCurrentQuestionIdx(currentQuestionIdx + 1);
    setIsCorrect(false);
    setSelectedOption(null);
    if (currentQuestionIdx === quiz.length - 1) setShowResult(true);
  };

  const tryAgain = () => {
    setShowResult(false);
    setCurrentQuestionIdx(0);
    setIsCorrect(false);
    setSelectedOption(null);
    setScore(0);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `QUIZ COMPLETE!
YOUR SCORE: ${score}/10`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {isVisibleModal && (
          <BlurView style={styles.blurBg} blurType="dark" blurAmount={3} />
        )}

        {showResult ? (
          <View>
            <Text style={[styles.headerTitle, { marginLeft: 0 }]}>
              {`TEST YOUR KNOWLEDGE
ABOUT NEW ZEALAND`}
            </Text>

            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>QUIZ COMPLETE!</Text>

              <Image
                source={require('../assets/images/onboardSecond.png')}
                style={styles.resultImage}
              />

              <Text style={styles.score}>YOUR SCORE: {score}/10</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.resultButtonsWrap}>
                <LargeGradientButton title={'TRY AGAIN'} onPress={tryAgain} />
                <MediumGradientButton
                  onPress={handleShare}
                  style={{ marginTop: 12 }}
                />
              </View>

              <LargeGradientButton
                title={'BACK HOME'}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.headerTitle}>
                {`      TEST YOUR KNOWLEDGE
ABOUT NEW ZEALAND`}
              </Text>
              <SmallGradientButton
                title={'BACK'}
                style={{ position: 'absolute' }}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.questionQuantity}>
                QUESTION #{currentQuestionIdx + 1}
              </Text>
              <Text style={styles.question}>
                {quiz[currentQuestionIdx].question}
              </Text>
            </View>
            <View style={{ marginTop: 11, gap: 11 }}>
              {quiz[currentQuestionIdx].options.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.7}
                  style={[
                    styles.optionContainer,
                    selectedOption === option
                      ? isCorrect
                        ? { backgroundColor: '#33FF00' }
                        : { backgroundColor: '#FF0000' }
                      : { backgroundColor: '#000000' },
                  ]}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={styles.option}>{option.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
      {isVisibleModal && (
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Image source={require('../assets/icons/modalStar.png')} />
              <Text style={styles.modalTitle}>
                {` HOLD ON TO THE
 CORRECT ANSWER, FACT!`}
              </Text>

              <Text style={styles.fact}>{randomFact.toUpperCase()}</Text>

              <LargeGradientButton
                onPress={handleNextQuestion}
                title={'CONTINUE'}
                style={{ marginTop: 17 }}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0B0C',
    paddingTop: height * 0.105,
    padding: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginLeft: 30,
  },
  questionQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  question: {
    fontFamily: 'Poppins-Black',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  fact: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#fff',
    width: '80%',
  },
  resultTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  score: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
  },
  option: {
    fontFamily: 'Poppins-Black',
    fontSize: 15,
    color: '#fff',
  },
  questionContainer: {
    width: '100%',
    minHeight: 160,
    paddingTop: 37,
    padding: 28,
    backgroundColor: '#000000',

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 14,

    borderRadius: 44,
    marginTop: 51,
  },
  optionContainer: {
    width: '100%',
    paddingVertical: 37,
    padding: 33,
    backgroundColor: '#000000',

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 14,
    borderRadius: 44,
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  modalContainer: {
    alignItems: 'center',
    top: 200,
    zIndex: 10,
    overflow: 'hidden',
  },
  modal: {
    backgroundColor: '#000000',
    width: '90%',
    borderRadius: 44,
    padding: 28,
    paddingTop: 52,
  },
  modalTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 20,
    color: '#fff',
    marginTop: 13,
    marginBottom: 29,
  },
  resultContainer: {
    width: '100%',
    paddingVertical: 28,
    paddingTop: 22,
    paddingBottom: 48,
    backgroundColor: '#000000',
    alignItems: 'center',
    marginTop: 51,
    marginBottom: 21,

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 14,
    borderRadius: 44,
  },
  resultImage: {
    width: 208,
    height: 271,
  },
  resultButtonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 8,
  },
});

export default Quiz;

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
// import Animated, {
//   Layout,
//   SlideInUp,
//   SlideOutUp,
//   FadeOut,
// } from 'react-native-reanimated';
// import { places } from '../data/places';

// // Your predefined card array
// const myCards = [
//   { id: '1', title: 'Card 1', description: 'This is card one' },
//   { id: '2', title: 'Card 2', description: 'This is card two' },
//   { id: '3', title: 'Card 3', description: 'This is card three' },
//   { id: '4', title: 'Card 4', description: 'This is card four' },
// ];

// const AnimatedListFromArray = () => {
//   const [visibleCards, setVisibleCards] = useState([]);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const indexRef = useRef(0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (!isAnimating) return;

//     intervalRef.current = setInterval(() => {
//       const nextCard = places[indexRef.current];
//       if (!nextCard) {
//         clearInterval(intervalRef.current);
//         setIsAnimating(false);
//         return;
//       }

//       setVisibleCards(prev => [nextCard, ...prev]);
//       indexRef.current += 1;
//     }, 2000);

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [isAnimating]);

//   const startAnimation = () => {
//     indexRef.current = 0;
//     setVisibleCards([]);
//     setIsAnimating(true);
//   };

//   const renderItem = ({ item, index }) => {
//     const isLast = index === visibleCards.length - 1;

//     return (
//       <Animated.View
//         entering={SlideInUp.springify().damping(20)}
//         exiting={isLast ? FadeOut.duration(300) : SlideOutUp.duration(300)}
//         layout={Layout.springify()}
//         style={styles.cardWrapper}
//       >
//         <Text>ddddd</Text>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={visibleCards}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         scrollEnabled={false}
//         contentContainerStyle={{ paddingTop: 10 }}
//       />

//       {!isAnimating && indexRef.current < myCards.length && (
//         <Pressable onPress={startAnimation} style={styles.button}>
//           <Text style={styles.buttonText}>Start Animation</Text>
//         </Pressable>
//       )}
//     </View>
//   );
// };

// export default AnimatedListFromArray;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   cardWrapper: {
//     overflow: 'hidden',
//   },
//   button: {
//     backgroundColor: '#1f1f1f',
//     padding: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

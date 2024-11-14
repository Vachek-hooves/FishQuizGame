const renderOption = (option, index) => {
    const isSelected = selectedAnswer === option;
    const isCorrect = option === currentQuestion.correctOption;
    const isWrong = isSelected && !isCorrect;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          isSelected && styles.selectedOption,
          selectedAnswer && isCorrect && styles.correctOption,
          isWrong && styles.wrongOption,
        ]}
        onPress={() => handleAnswer(option)}
        disabled={selectedAnswer !== null}
      >
        <View style={styles.optionContent}>
          <View style={styles.optionLeft}>
            <View style={[
              styles.letterCircle,
              isSelected && styles.selectedLetterCircle,
              selectedAnswer && isCorrect && styles.correctLetterCircle,
              isWrong && styles.wrongLetterCircle,
            ]}>
              <Text style={[
                styles.letterText,
                (isSelected || selectedAnswer && isCorrect) && styles.selectedLetterText
              ]}>
                {LETTERS[index]}
              </Text>
            </View>
            <Text style={[
              styles.optionText,
              isSelected && styles.selectedOptionText,
              selectedAnswer && isCorrect && styles.correctOptionText,
              isWrong && styles.wrongOptionText,
            ]}>
              {option}
            </Text>
          </View>
          {selectedAnswer && (isCorrect ? (
            <Icon name="checkmark-circle" size={24} color="#4CD964" />
          ) : isWrong ? (
            <Icon name="close-circle" size={24} color="#FF3B30" />
          ) : null)}
        </View>
      </TouchableOpacity>
    );
  };

  export default renderOption;
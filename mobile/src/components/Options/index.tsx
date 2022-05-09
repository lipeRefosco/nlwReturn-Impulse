
import React from 'react';
import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { FeedbackTypes } from '../Widget';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';

interface OptionsProps {
  onFeedbackChange: (feedbackType : FeedbackTypes) => void;
}

export function Options({
  onFeedbackChange
} : OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe Seu feedback</Text>
        <View style={styles.options}>
          {
            Object.entries(feedbackTypes).map(([key, value]) => {
              return <Option
                key={key}
                title={value.title}
                image={value.image}
                onPress={() => onFeedbackChange(key as FeedbackTypes)}
              />
            })
          }
      </View>
      <Copyright />
    </View>
  );
}
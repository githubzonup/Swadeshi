import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const Option = props => {
  const {label, onPress, active} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {backgroundColor: active ? '#311b92' : '#ffffff'},
      ]}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.optionStyle, {color: active ? '#ffffff' : '#000000'}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
  },
  optionStyle: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
  },
});

export default Option;

import React, {useState} from 'react';
import {View, Modal, StyleSheet, VirtualizedList, Button} from 'react-native';
import Option from './components/Option';
import {handlePressOption} from './utils';

const MultipleSelect = props => {
  const {options, onChange, visible} = props;
  const [selectedValues, setSelectedValues] = useState([]);

  function handleOnChange() {
    const values = selectedValues?.map(option => option?.value);
    onChange && onChange(values);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <VirtualizedList
            data={options}
            initialNumToRender={4}
            renderItem={({item}) => {
              const isActive = selectedValues?.find(
                selectedOption => selectedOption?.key === item?.key,
              );
              return (
                <Option
                  active={!!isActive}
                  onPress={() =>
                    handlePressOption(selectedValues, setSelectedValues, item)
                  }
                  label={item?.label}
                />
              );
            }}
            keyExtractor={item => item.key}
            getItemCount={item => item?.length}
            getItem={(data, index) => data[index] || {}}
            style={styles.listOverlay}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.submitButton}
              title="Select"
              color="#311b92"
              onPress={() => handleOnChange()}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: 300,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    borderRadius: 4,
    paddingTop: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  listOverlay: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  submitButton: {
    width: '100%',
  },
});

export default MultipleSelect;

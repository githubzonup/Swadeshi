export function handlePressOption(selectedValues, setSelectedValues, option) {
  const foundOption = selectedValues?.find(
    selectedOption => selectedOption?.key === option?.key,
  );

  if (foundOption) {
    const newSelectedOptions = selectedValues?.filter(
      selectedOption => selectedOption?.key !== foundOption?.key,
    );

    setSelectedValues(newSelectedOptions);
  }

  if (!foundOption) {
    const newSelectedOptions = [...selectedValues, option];
    setSelectedValues(newSelectedOptions);
  }
}

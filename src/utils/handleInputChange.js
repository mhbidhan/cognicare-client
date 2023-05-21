function handleInputChange(name, value, setState) {
  return setState((state) => ({ ...state, [name]: value }));
}

export default handleInputChange;

export const required = (value) => {
  if (value) {
    return undefined;
  }
  return true;
};

export const requiredWithText = (value) => {
  if (value) {
    return undefined;
  }
  return 'Do not leave me empty..';
};

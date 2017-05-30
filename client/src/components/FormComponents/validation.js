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

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const matchingPasswords = (values) => {
  const errors = {};
  const { verifyNewPassword, newPassword } = values;

  if (newPassword !== verifyNewPassword) {
    errors.newPassword = 'Passwords must match..';
    errors.verifyNewPassword = 'Passwords must match..';
  }

  return errors;
};

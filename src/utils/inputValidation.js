import Strings from './constants/Strings';

export const validateUser = user => {
  const errors = {};

  if (!user.name.trim()) {
    errors.name = Strings.errors.name;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email.trim()) {
    errors.email = Strings.errors.emailRequired;
  } else if (!emailRegex.test(user.email)) {
    errors.email = Strings.errors.emailInvalid;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!user.password.trim()) {
    errors.password = Strings.errors.passwordRequired;
  } else if (user.password.length < 6) {
    errors.password = Strings.errors.passwordWeak;
  } else if (!passwordRegex.test(user.password)) {
    errors.password = Strings.errors.passwordInvalid;
  }

  return errors;
};

export const validateLoginUser = user => {
  const errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email.trim()) {
    errors.email = Strings.errors.emailRequired;
  } else if (!emailRegex.test(user.email)) {
    errors.email = Strings.errors.emailInvalid;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!user.password.trim()) {
    errors.password = Strings.errors.passwordRequired;
  } else if (user.password.length < 6) {
    errors.password = Strings.errors.passwordWeak;
  } else if (!passwordRegex.test(user.password)) {
    errors.password = Strings.errors.passwordInvalid;
  }

  return errors;
};

export const validateUpdateUser = user => {
  const errors = {};

  if (!user.name.trim()) {
    errors.name = Strings.errors.name;
  }

  return errors;
};

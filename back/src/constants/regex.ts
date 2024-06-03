export const password =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@;.:_\-/])[A-Za-z\d@;.:_\-/]{6,16}$/;

export const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

export const matchKey = (key: string) => {
  return new RegExp(`{${key}}`, 'g');
};

export const convertFullName = (name: string, surname: string) => {
  return `${name} ${surname}`;
};

export const getInitialLetters = (name: string, surname: string) => {
  return `${name.trim().charAt(0).toUpperCase()}${surname
    .trim()
    .charAt(0)
    .toUpperCase()}`;
};

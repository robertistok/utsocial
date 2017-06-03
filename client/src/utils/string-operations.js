export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function onlyFirstLetters(string) {
  return string.match(/\b([A-Z0-9])/g).join('');
}

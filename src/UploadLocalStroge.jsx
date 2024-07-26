export const UploadLocalStorage = () => {
    if (localStorage.getItem('statsCorrect') === null) {
        localStorage.setItem('statsCorrect', 0);
      }
      if (localStorage.getItem('statsIncorrect') === null) {
        localStorage.setItem('statsIncorrect', 0);
      }
      if (localStorage.getItem('statsHints') === null) {
        localStorage.setItem('statsHints', 0);
      }
      if (localStorage.getItem('statsAVG') === null) {
        localStorage.setItem('statsAVG', 0);
      }
}

export function getTheme(){
  const styles=getComputedStyle(document.documentElement);
  return{
    bgColor:styles.getPropertyValue('--background-color').trim(),
    textColor:styles.getPropertyValue('--text-color').trim(),
  };
}

export function getTheme(element:HTMLElement){
  const styles=getComputedStyle(element);
  return{
    bgColor:styles.getPropertyValue('--background-color').trim(),
    textColor:styles.getPropertyValue('--text-color').trim(),
  };
}

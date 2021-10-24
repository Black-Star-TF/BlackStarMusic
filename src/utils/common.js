export function changeTheme(theme){
  if(theme === '' || theme === undefined){
    theme = 'light'
  }
  document.body.setAttribute('data-theme', theme);
}
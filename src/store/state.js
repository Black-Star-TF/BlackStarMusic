
import pkg from '../../package.json';

// 初始化localStorage数据
if(!JSON.parse(localStorage.getItem('settings'))){
  const lacalData = {
    settings: {
      theme: 'light'
    }
  }
  localStorage.setItem('settings', JSON.stringify(lacalData))
}



 
export default {
  settings: JSON.parse(localStorage.getItem('settings')),
  data: JSON.parse(localStorage.getItem('data')) || {},
  userProfile: JSON.parse(localStorage.getItem('userProfile')) || null,
}
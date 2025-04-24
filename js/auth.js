/**
 * 用户身份验证模块
 * 用于验证用户是否已登录，未登录时重定向到登录页面
 */

// 免登录页面列表 - 这些页面不需要登录即可访问
const PUBLIC_PAGES = [
  '/pages/login.html',
  '/login.html',
  // 可以添加其他不需要登录验证的页面
];

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否已登录
 */
export function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * 检查当前页面是否需要登录
 * @returns {boolean} 当前页面是否需要登录验证
 */
export function isAuthRequired() {
  const currentPath = window.location.pathname;
  // 检查当前路径是否在免登录页面列表中
  return !PUBLIC_PAGES.some(path => currentPath.endsWith(path));
}

/**
 * 重定向到登录页面
 */
export function redirectToLogin() {
  window.location.href = '/pages/login.html';
}

/**
 * 验证用户登录状态并在必要时重定向
 * 在需要登录验证的页面中调用此函数
 */
export function validateAuth() {
  // 如果当前页面需要登录验证且用户未登录，则重定向到登录页面
  if (isAuthRequired() && !isLoggedIn()) {
    console.log('用户未登录，正在重定向到登录页面...');
    redirectToLogin();
  }
}

/**
 * 获取用户信息
 * @returns {Object} 用户信息对象
 */
export function getUserInfo() {
  return {
    username: localStorage.getItem('username'),
    avatarUrl: localStorage.getItem('avatarUrl'),
    // 可以添加其他需要获取的用户信息
  };
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem('isLoggedIn');
  redirectToLogin();
}

// 自动执行验证
validateAuth(); 
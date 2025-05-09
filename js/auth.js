// js/auth.js
import { Storage } from '/js/main.js';

/**
 * 检查用户是否已完成首次登录流程。
 * 如果未完成且当前不在登录页，则重定向到登录页。
 */
export function checkFirstLoginExperience() {
  // 从 localStorage 获取标记，注意 Storage.get 会自动 JSON.parse
  const hasCompleted = Storage.get('hasCompletedLoginFlow');
  const isLoginPage = window.location.pathname.endsWith('/login.html') || window.location.pathname.endsWith('/login');

  if (hasCompleted !== true && !isLoginPage) {
    console.log('首次登录流程未完成，正在重定向到登录页面...');
    window.location.href = '/pages/login.html';
  }
}

/**
 * 标记用户已完成首次登录流程。
 * 仅在标记尚未设置时执行一次。
 */
export function markLoginFlowCompleted() {
  // 检查标记是否已存在且为 true
  if (Storage.get('hasCompletedLoginFlow') !== true) {
    // 如果不存在或不为 true，则设置标记
    Storage.save('hasCompletedLoginFlow', true);
    console.log('首次登录流程完成标记已设置到 localStorage。');
  }
}
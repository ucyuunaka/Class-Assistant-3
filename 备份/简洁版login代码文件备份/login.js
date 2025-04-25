document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-success-button');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // 跳转到 index.html
            // 使用相对路径，Vite 会处理好基础路径
            window.location.href = '/index.html';
        });
    } else {
        console.error('登录按钮未找到！');
    }
});
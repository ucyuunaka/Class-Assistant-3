// 登录与注册系统
// 基于login-signup-demo的combined-login-signup.js，但进行了适配改造

// 默认头像路径 - 使用项目内的资源
const DEFAULT_AVATAR_URL = "/public/lib/images/default-avatar.jpg";

// 登录注册系统类
class LoginSignupSystem {
    constructor() {
        // 配置选项，使用默认值
        this.config = {
            defaultAvatarUrl: DEFAULT_AVATAR_URL,
            welcomeTemplate: {
                login: "欢迎回来，{username}!",
                signup: "欢迎加入，{username}!"
            },
            generalWelcomeText: "嗨，欢迎使用课堂助手",
            autoInit: true
        };
        
        // 添加操作类型跟踪变量
        this.isLoginOperation = true; // 默认为登录操作
        
        // 自动初始化
        if (this.config.autoInit) {
            this.init();
        }
    }
    
    // 初始化方法
    init(userConfig = {}) {
        // 合并用户配置
        this.config = { ...this.config, ...userConfig };
        
        // 初始化表单状态
        this.initFormState();
        
        // 绑定事件监听器
        this.bindEventListeners();
        
        // 设置鼠标悬停效果
        this.setupHoverEffects();
        
        // 使用默认头像
        this.updateUserAvatar(this.config.defaultAvatarUrl);
        
        // 检查本地存储是否有用户信息
        this.checkStoredUserInfo();
        
        console.log("登录注册系统初始化完成");
    }
    
    // 创建一个Promise包装的延时函数，用于替代嵌套的setTimeout
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 初始化表单状态
    initFormState() {
        $('#signup-form').addClass('form-flip-out');
        
        // 检测浏览器
        if (navigator.userAgent.toLowerCase().match(/firefox/)) {
            $('.browser-warning').removeClass('hidden');
            this.delay(6000).then(() => {
                $('.browser-warning').addClass('hidden');
            });
        }
    }
    
    // 检查本地存储中的用户信息
    checkStoredUserInfo() {
        const storedUsername = localStorage.getItem('username');
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        
        if (storedUsername) {
            console.log("发现已存储的用户信息:", storedUsername);
        }
        
        if (storedAvatarUrl) {
            this.updateUserAvatar(storedAvatarUrl);
        }
    }
    
    // ================ 表单切换通用逻辑 ================
    // 绑定事件监听器
    bindEventListeners() {
        $('#to-signup').click((e) => {
            e.preventDefault();
            this.switchForm('login', 'signup');
        });
        
        $('#to-login').click((e) => {
            e.preventDefault();
            this.switchForm('signup', 'login');
        });
        
        // 登录表单输入验证
        this.setupInputValidation('.login-email', 'icon-paper-plane');
        this.setupInputValidation('.login-password', 'icon-lock');
        
        // 登录表单阶段转换
        this.setupFormStageTransition(
            '.login-form .next-button.email', 
            '.login-form .email-section', 
            '.login-form .password-section', 
            "登录：账号输入完成"
        );
        
        // 登录表单完成处理
        $('.login-form .next-button.password').click(async () => {
            await this.handleFormSuccess(
                '登录', 
                '.login-form .password-section', 
                '.login-form .login-success', 
                '.login-email'
            );
        });
        
        // 注册表单输入验证
        this.setupInputValidation('.signup-email', 'icon-paper-plane');
        this.setupInputValidation('.signup-password', 'icon-lock');
        this.setupInputValidation('.repeat-password', 'icon-repeat-lock');
        
        // 注册表单阶段转换
        this.setupFormStageTransition(
            '.signup-form .next-button.signup-email', 
            '.signup-form .email-section', 
            '.signup-form .password-section', 
            "注册：账号输入完成"
        );
        
        this.setupFormStageTransition(
            '.signup-form .next-button.signup-password', 
            '.signup-form .password-section', 
            '.signup-form .repeat-password-section', 
            "注册：密码输入完成"
        );
        
        // 注册表单完成处理
        $('.signup-form .next-button.repeat-password').click(async () => {
            await this.handleFormSuccess(
                '注册', 
                '.signup-form .repeat-password-section', 
                '.signup-form .signup-success', 
                '.signup-email'
            );
        });
        
        // 进入系统按钮事件绑定
        $('#enter-system').click(() => {
            console.log("用户点击了进入系统按钮");
            // 这里不需要特别处理，因为链接会直接跳转到首页
        });
    }
    
    // 通用表单切换函数
    async switchForm(fromType, toType) {
        this.isLoginOperation = (toType === 'login'); // 更新操作类型
        const fromForm = $(`#${fromType}-form`);
        const toForm = $(`#${toType}-form`);
        
        // 当前表单翻转隐藏
        fromForm.removeClass('form-flip-in').addClass('form-flip-out');
        
        // 等待翻转动画完成
        await this.delay(600);
        
        fromForm.addClass('hidden');
        toForm.removeClass('hidden');
        
        // 给浏览器一点时间处理DOM变化
        await this.delay(50);
        
        toForm.removeClass('form-flip-out').addClass('form-flip-in');
        if (toType === 'signup') {
            $('body').addClass('signup-mode');
        } else {
            $('body').removeClass('signup-mode');
        }
        
        // 动画完成后重置表单
        await this.delay(600);
        this.resetForms(false); // 传递false参数表示不重置动画类
    }
    
    // 修改resetForms函数，添加参数控制是否重置动画类
    resetForms(resetAnimation = true) {
        // 重置表单状态
        $('.input-section').removeClass('fold-up');
        $('.email-section').removeClass('fold-up');
        $('.password-section').addClass('folded');
        $('.repeat-password-section').addClass('folded');
        $('.icon-paper-plane, .icon-lock, .icon-repeat-lock').removeClass('next');
        $('.success').css("marginTop", "-75px");
        $('input').val('');
        
        // 仅当resetAnimation为true时重置动画类
        if (resetAnimation) {
            $('#window').removeClass('flip');
            $('.login-form, .signup-form').removeClass('form-flip-in form-flip-out');
            // 重置欢迎页面元素动画状态
            $('.welcome-element').css({
                'opacity': '0',
                'transform': 'translateY(-30px)'
            });
        }
    }
    
    // ================ 通用表单输入处理 ================
    
    // 鼠标悬停效果 - 通用部分
    setupHoverEffects() {
        $('.next-button').hover(function(){
            $(this).css('cursor', 'pointer');
        });
    }
    
    // 设置输入字段验证和图标变化 - 通用函数
    setupInputValidation(inputSelector, iconClass) {
        $(inputSelector).on("change keyup paste", function(){
            const iconSelector = $(this).closest('.form-base').find(`.${iconClass}`);
            if ($(this).val()) {
                iconSelector.addClass("next");
            } else {
                iconSelector.removeClass("next");
            }
        });
    }
    
    // 设置表单阶段转换 - 通用函数
    setupFormStageTransition(buttonSelector, currentSectionSelector, nextSectionSelector, logMessage) {
        $(buttonSelector).click(function(){
            console.log(logMessage);
            $(currentSectionSelector).addClass("fold-up");
            $(nextSectionSelector).removeClass("folded");
        });
    }
    
    // 处理表单完成后的操作 - 通用函数
    async handleFormSuccess(formType, lastSectionSelector, successSelector, usernameSelector) {
        console.log(`${formType}：完成输入`);
        $(lastSectionSelector).addClass("fold-up");
        $(successSelector).css("marginTop", 0);
        
        // 获取用户账号并更新欢迎页面的用户名和头像
        const username = $(usernameSelector).val();
        this.updateUserName(username);
        this.saveUserInfo(username);
        
        // 先预先准备好欢迎元素（位置和透明度设为0），但不立即显示
        // 这样在翻转后它们会更快地显示出来
        $('.welcome-element').css({
            'opacity': '0',
            'transform': 'translateY(-20px)', // 缩短初始位移距离
            'transition-duration': '0.4s'     // 加快过渡动画速度
        });
        
        // 显示成功后2秒，执行卡片翻转到欢迎页面
        await this.delay(2000);
        
        // 在翻转的同时准备好欢迎元素，减少等待时间
        setTimeout(function() {
            $('.welcome-element').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 200); // 在翻转开始后的200ms触发元素显示
        
        $('#window').addClass('flip');
    }
    
    // 保存用户信息到本地存储
    saveUserInfo(username) {
        if (username && username.length > 0) {
            localStorage.setItem('username', username);
            localStorage.setItem('isLoggedIn', 'true');
            // 在实际应用中，这里应该还有更多的用户信息处理
            console.log("用户信息已保存:", username);
        }
    }
    
    // 从用户名参数更新欢迎界面的用户名显示
    updateUserName(username) {
        if (username && username.length > 0) {
            // 构建欢迎文本
            let welcomeText;
            if (this.isLoginOperation) {
                welcomeText = this.config.welcomeTemplate.login.replace('{username}', username);
            } else {
                welcomeText = this.config.welcomeTemplate.signup.replace('{username}', username);
            }
            
            // 设置用户名和欢迎文本
            $('.user-name').text(username);
            $('.welcome').text(welcomeText);
        } else {
            // 如果没有提供用户名，使用通用欢迎文本
            $('.welcome').text(this.config.generalWelcomeText);
            $('.user-name').text("用户");
        }
    }
    
    // 更新欢迎页面的头像
    updateUserAvatar(avatarUrl) {
        if (avatarUrl) {
            // 尝试预加载图片，确保头像显示正常
            const img = new Image();
            img.onload = function() {
                $('.avatar').attr('src', avatarUrl);
                // 同时保存到本地存储，以便其他页面使用
                localStorage.setItem('avatarUrl', avatarUrl);
            };
            img.onerror = function() {
                // 如果加载失败，使用默认头像
                $('.avatar').attr('src', DEFAULT_AVATAR_URL);
                localStorage.setItem('avatarUrl', DEFAULT_AVATAR_URL);
            };
            img.src = avatarUrl;
        } else {
            // 如果没有提供URL，使用默认头像
            $('.avatar').attr('src', DEFAULT_AVATAR_URL);
        }
    }
    
    // 使用Promise重构重置动画函数
    resetAnimation() {
        const win = $('#window');
        
        // 使用Promise链替代回调嵌套
        win.stop().fadeOut(500)
            .promise()
            .then(() => {
                // 重置状态
                win.attr('style', '');
                win.removeClass('flip');
                
                // 重置登录表单
                this.resetForms();
                
                // 默认显示登录表单
                return this.switchForm('signup', 'login'); // 使用通用切换函数
            })
            .then(() => {
                // 显示窗口并开始新的动画
                win.fadeIn(500);
            })
            .catch((error) => {
                console.error("动画重置过程中出错:", error);
            });
    }
    
    // 退出登录
    logout() {
        // 清除本地存储中的登录状态
        localStorage.removeItem('isLoggedIn');
        // 不清除用户名和头像，保留这些信息以便再次登录时使用
        
        // 重定向到登录页面
        window.location.href = '/pages/login.html';
    }
}

// 创建实例并初始化
document.addEventListener('DOMContentLoaded', () => {
    const loginSystem = new LoginSignupSystem();
    
    // 将实例暴露到全局，以便其他页面可以使用
    window.LoginSignupSystem = loginSystem;
});

// 检查用户是否已登录，如果已登录且当前在登录页面，则跳转到首页
(function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoginPage = window.location.pathname.includes('/login.html');
    
    if (isLoggedIn && isLoginPage) {
        // 已登录状态下访问登录页面，自动跳转到首页
        console.log("用户已登录，正在跳转到首页...");
        window.location.href = '/index.html';
    }
})();

// 公开的退出登录方法，供其他页面调用
window.logoutSystem = function() {
    if (window.LoginSignupSystem) {
        window.LoginSignupSystem.logout();
    } else {
        // 如果实例不存在，直接清除登录状态并跳转
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/pages/login.html';
    }
};

export { LoginSignupSystem }; 
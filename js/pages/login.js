// 登录与注册系统
// 基于 login-signup-demo 的 JS，但保留了 localStorage 和跳转逻辑

// 默认头像路径 - 使用项目内的资源
const DEFAULT_AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg"; // 确保此路径有效

// 登录注册系统类
class LoginSignupSystem {
    constructor() {
        // 配置选项
        this.config = {
            defaultAvatarUrl: DEFAULT_AVATAR_URL,
            welcomeTemplate: {
                login: "欢迎回来，{username}!", // {username} 将被替换为 NetID
                signup: "欢迎加入，{username}!"  // {username} 将被替换为 NetID
            },
            generalWelcomeText: "嗨，欢迎使用课堂助手",
            autoInit: true
        };

        // 操作类型跟踪变量
        this.isLoginOperation = true; // 默认为登录操作

        // 移除自动初始化，改为在DOMContentLoaded中执行
        // if (this.config.autoInit) {
        //     this.init();
        // }
    }

    // 初始化方法
    init(userConfig = {}) {
        // 合并用户配置
        this.config = { ...this.config, ...userConfig };

        // 确保窗口元素没有阻止动画的类
        $('#window').removeClass('flip');
        
        // 初始化表单状态 (使用 Demo 逻辑)
        this.initFormState();

        // 绑定事件监听器 (使用 Demo 逻辑，但保留必要功能)
        this.bindEventListeners();

        // 设置鼠标悬停效果 (使用 Demo 逻辑)
        this.setupHoverEffects();

        // 使用默认或存储的头像
        const storedAvatarUrl = localStorage.getItem('avatarUrl');
        this.updateUserAvatar(storedAvatarUrl || this.config.defaultAvatarUrl);

        // 检查本地存储是否有用户信息 (保留)
        this.checkStoredUserInfo();

        console.log("登录注册系统初始化完成 (已更新)");
    }

    // Promise 包装的延时函数 (来自 Demo)
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 初始化表单状态 (来自 Demo)
    initFormState() {
        $('#signup-form').addClass('hidden form-flip-out'); // 初始隐藏注册表单并设置翻转状态
        // 移除以下一行，以允许正确显示初始动画
        // $('#login-form').addClass('form-flip-in'); // 确保登录表单初始可见

        // 检测浏览器 (保留)
        if (navigator.userAgent.toLowerCase().match(/firefox/)) {
            $('.browser-warning').removeClass('hidden');
            this.delay(6000).then(() => {
                $('.browser-warning').addClass('hidden');
            });
        }
    }

    // 检查本地存储中的用户信息 (保留)
    checkStoredUserInfo() {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            console.log("发现已存储的用户信息:", storedUsername);
            // 如果需要，可以在这里预填充用户名，但当前设计不需要
        }
    }

    // ================ 表单切换通用逻辑 (来自 Demo) ================
    // 绑定事件监听器 (整合 Demo 逻辑，保留必要功能)
    bindEventListeners() {
        $('#to-signup').click((e) => {
            e.preventDefault();
            this.switchForm('login', 'signup');
        });

        $('#to-login').click((e) => {
            e.preventDefault();
            this.switchForm('signup', 'login');
        });

        // 登录表单输入验证 (使用 Demo 逻辑, 注意图标类名已在 HTML 更新)
        this.setupInputValidation('.login-email', 'icon-paper-plane'); // icon for fa-id-card-o
        this.setupInputValidation('.login-password', 'icon-lock');

        // 登录表单阶段转换 (使用 Demo 逻辑)
        this.setupFormStageTransition(
            '.login-form .next-button.email',
            '.login-form .email-section',
            '.login-form .password-section',
            "登录：NetID 输入完成"
        );

        // 登录表单完成处理 (整合 Demo 动画和保留逻辑)
        $('.login-form .next-button.password').click(async () => {
            await this.handleFormSuccess(
                '登录',
                '.login-form .password-section',
                '.login-form .login-success',
                '.login-email' // 选择器获取 NetID
            );
        });

        // 注册表单输入验证 (使用 Demo 逻辑)
        this.setupInputValidation('.signup-email', 'icon-paper-plane'); // icon for fa-id-card-o
        this.setupInputValidation('.signup-password', 'icon-lock');
        this.setupInputValidation('.repeat-password', 'icon-repeat-lock');

        // 注册表单阶段转换 (使用 Demo 逻辑)
        this.setupFormStageTransition(
            '.signup-form .next-button.signup-email',
            '.signup-form .email-section',
            '.signup-form .password-section',
            "注册：NetID 输入完成"
        );

        this.setupFormStageTransition(
            '.signup-form .next-button.signup-password',
            '.signup-form .password-section',
            '.signup-form .repeat-password-section',
            "注册：密码输入完成"
        );

        // 注册表单完成处理 (整合 Demo 动画和保留逻辑)
        $('.signup-form .next-button.repeat-password').click(async () => {
            await this.handleFormSuccess(
                '注册',
                '.signup-form .repeat-password-section',
                '.signup-form .signup-success',
                '.signup-email' // 选择器获取 NetID
            );
        });

        // 移除 Demo 的 'trigger-anim-replay' 按钮逻辑
    }

    // 通用表单切换函数 (来自 Demo)
    async switchForm(fromType, toType) {
        this.isLoginOperation = (toType === 'login'); // 更新操作类型
        const fromForm = $(`#${fromType}-form`);
        const toForm = $(`#${toType}-form`);

        // 当前表单翻转隐藏
        fromForm.removeClass('form-flip-in').addClass('form-flip-out');

        // 等待翻转动画完成
        await this.delay(600); // 使用固定的动画时间

        fromForm.addClass('hidden'); // 动画结束后再隐藏
        toForm.removeClass('hidden'); // 显示目标表单

        // 给浏览器一点时间处理DOM变化
        await this.delay(50);

        // 目标表单翻转显示
        toForm.removeClass('form-flip-out').addClass('form-flip-in');

        if (toType === 'signup') {
            $('body').addClass('signup-mode');
        } else {
            $('body').removeClass('signup-mode');
        }

        // 动画完成后重置表单字段，但不重置动画类
        await this.delay(600);
        this.resetForms(false);
    }

    // 重置表单函数 (来自 Demo，保留 resetAnimation 参数)
    resetForms(resetAnimation = true) {
        // 重置表单状态
        $('.input-section').removeClass('fold-up');
        $('.email-section').removeClass('fold-up'); // 确保 email section 也重置
        $('.password-section').addClass('folded');
        $('.repeat-password-section').addClass('folded');
        $('.icon-paper-plane, .icon-lock, .icon-repeat-lock').removeClass('next'); // 重置图标状态
        $('.success').css("marginTop", "-75px"); // 重置成功提示位置
        $('input.form-input').val(''); // 清空所有表单输入

        // 仅当 resetAnimation 为 true 时重置动画类 (用于 Demo 的 replay，当前版本不直接使用)
        if (resetAnimation) {
            $('#window').removeClass('flip');
            $('.login-form, .signup-form').removeClass('form-flip-in form-flip-out');
            // 重置欢迎页面元素动画状态
            $('.welcome-element').css({
                'opacity': '0',
                'transform': 'translateY(-20px)',
                'transition-duration': '0.4s'
            });
        }
    }

    // ================ 通用表单输入处理 (来自 Demo) ================

    // 鼠标悬停效果 (来自 Demo)
    setupHoverEffects() {
        $('.next-button').hover(function(){
            $(this).css('cursor', 'pointer');
        });
        // 确保 .animated-button 内的图标也有指针效果
         $('.animated-button span i').hover(function(){
            $(this).css('cursor', 'pointer');
        });
    }

    // 设置输入字段验证和图标变化 (来自 Demo)
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


    // 设置表单阶段转换 (来自 Demo)
    setupFormStageTransition(buttonSelector, currentSectionSelector, nextSectionSelector, logMessage) {
        $(buttonSelector).click(function(){
            // 检查当前输入框是否有内容，防止空内容进入下一步
            const $currentInput = $(currentSectionSelector).find('.form-input');
            if (!$currentInput.val()) {
                console.log("输入不能为空");
                // 可以添加一些视觉提示，比如输入框抖动
                $currentInput.focus();
                return; // 阻止进入下一步
            }

            console.log(logMessage);
            $(currentSectionSelector).addClass("fold-up");
            $(nextSectionSelector).removeClass("folded");
        });
    }


    // 处理表单完成后的操作 (整合 Demo 动画和保留逻辑)
    async handleFormSuccess(formType, lastSectionSelector, successSelector, netIdSelector) {
        // 检查最后一步输入框是否有内容
        const $lastInput = $(lastSectionSelector).find('.form-input');
         if (!$lastInput.val()) {
            console.log("输入不能为空");
            $lastInput.focus();
            return; // 阻止提交
        }

        console.log(`${formType}：完成输入`);
        $(lastSectionSelector).addClass("fold-up");
        $(successSelector).css("marginTop", 0); // 显示成功消息

        // 获取用户 NetID
        const netId = $(netIdSelector).val();

        // 更新欢迎页面的用户名 (使用 NetID)
        this.updateUserName(netId);

        // **保留：保存用户信息到 localStorage**
        this.saveUserInfo(netId); // 使用 NetID 作为 username

        // 预设欢迎元素动画初始状态 (来自 Demo)
        $('.welcome-element').css({
            'opacity': '0',
            'transform': 'translateY(-20px)', // 缩短初始位移距离
            'transition-duration': '0.4s'     // 加快过渡动画速度
        });

        // 等待成功消息显示一段时间
        await this.delay(1500); // 稍微缩短等待时间

        // 触发卡片翻转
        $('#window').addClass('flip');

        // 在翻转动画开始后不久，触发欢迎元素的入场动画 (来自 Demo)
        setTimeout(() => {
            $('.welcome-element').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 200); // 在翻转开始后的 200ms 触发

        // **保留：等待翻转动画完成 + 短暂延迟后跳转到首页**
        await this.delay(600 + 500); // 等待翻转动画 + 500ms
        console.log("登录/注册成功，正在跳转到首页...");
        window.location.href = '/index.html';
    }

    // 保存用户信息到本地存储 (保留)
    saveUserInfo(username) { // 参数现在是 NetID
        if (username && username.length > 0) {
            localStorage.setItem('username', username);
            localStorage.setItem('isLoggedIn', 'true');
            // 头像URL 在 updateUserAvatar 中保存
            console.log("用户信息已保存 (NetID):", username);
        } else {
             console.warn("尝试保存空的 NetID");
        }
    }

    // 更新欢迎界面的用户名显示 (保留，使用 NetID)
    updateUserName(netId) {
        if (netId && netId.length > 0) {
            const username = netId; // 直接使用 NetID
            let welcomeText;
            if (this.isLoginOperation) {
                welcomeText = this.config.welcomeTemplate.login.replace('{username}', username);
            } else {
                welcomeText = this.config.welcomeTemplate.signup.replace('{username}', username);
            }
            $('.user-name').text(username); // 显示 NetID
            $('.welcome').text(welcomeText);
        } else {
            $('.welcome').text(this.config.generalWelcomeText);
            $('.user-name').text("用户");
        }
    }

    // 更新欢迎页面的头像 (保留)
    updateUserAvatar(avatarUrl) {
        const finalAvatarUrl = avatarUrl || this.config.defaultAvatarUrl;
        const img = new Image();
        img.onload = () => {
            $('.avatar').attr('src', finalAvatarUrl);
            localStorage.setItem('avatarUrl', finalAvatarUrl); // 保存最终使用的 URL
        };
        img.onerror = () => {
            console.error("加载头像失败:", avatarUrl, "将使用默认头像。");
            $('.avatar').attr('src', this.config.defaultAvatarUrl);
            localStorage.setItem('avatarUrl', this.config.defaultAvatarUrl); // 保存默认头像 URL
        };
        img.src = finalAvatarUrl;
    }

    // 退出登录 (保留)
    logout() {
        localStorage.removeItem('isLoggedIn');
        // 保留 username 和 avatarUrl
        console.log("用户已退出登录");
        window.location.href = '/pages/login.html'; // 重定向到登录页
    }
}

// 创建实例并初始化 (修改为在DOM完全加载后执行初始化)
document.addEventListener('DOMContentLoaded', () => {
    // 确保 jQuery 已加载
    if (typeof jQuery === 'undefined') {
        console.error("jQuery 未加载，登录系统无法初始化。");
        return;
    }
    
    // 创建登录系统实例
    const loginSystem = new LoginSignupSystem();
    
    // 使用短延时确保动画能够被正确触发
    setTimeout(() => {
        // 确保动画元素准备就绪
        $('#login-form').removeClass('form-flip-in');
        // 初始化登录系统
        loginSystem.init();
        // 延迟添加登录表单的显示类
        setTimeout(() => {
            $('#login-form').addClass('form-flip-in');
        }, 100);
    }, 10);
    
    window.LoginSignupSystem = loginSystem; // 暴露到全局
});

// 检查用户是否已登录，如果已登录且当前在登录页面，则跳转到首页 (保留)
(function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoginPage = window.location.pathname.includes('/pages/login.html');

    if (isLoggedIn && isLoginPage) {
        console.log("用户已登录，正在跳转到首页...");
        window.location.href = '/index.html';
    }
})();

// 公开的退出登录方法 (保留)
window.logoutSystem = function() {
    if (window.LoginSignupSystem && typeof window.LoginSignupSystem.logout === 'function') {
        window.LoginSignupSystem.logout();
    } else {
        // Fallback
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/pages/login.html';
    }
};

// 导出模块 (保留)
export { LoginSignupSystem };
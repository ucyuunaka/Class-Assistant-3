// 导入滚动动画组件
import { initScrollAnimation } from "/components/scrollAnimation/scrollAnimation.js";
// 导入模态框组件
import { showConfirmModal } from "/components/modals/modals.js";

document.addEventListener("DOMContentLoaded", function () {
  // 初始化滚动动画
  initScrollAnimation(".animate-on-scroll", {
    threshold: 0.1,
    once: true,
  });

  // --- 基本信息编辑 ---
  const editBasicInfoBtn = document.getElementById("edit-basic-info");
  const saveBasicInfoBtn = document.getElementById("save-basic-info");
  const cancelBasicInfoBtn = document.getElementById("cancel-basic-info");
  const saveBasicInfoBtnGroup = document.getElementById("save-basic-info-btn-group");
  const basicInfoInputs = document.querySelectorAll("#basic-info-form input");

  // 保存原始值，用于取消时恢复
  const originalBasicInfoValues = {};

  if (editBasicInfoBtn) {
    editBasicInfoBtn.addEventListener("click", function () {
      // 启用输入框
      basicInfoInputs.forEach((input) => {
        originalBasicInfoValues[input.id] = input.value;
        input.disabled = false;
      });

      // 显示保存按钮
      if (saveBasicInfoBtnGroup) saveBasicInfoBtnGroup.style.display = "block";
      // 隐藏编辑按钮
      if (editBasicInfoBtn) editBasicInfoBtn.style.display = "none";
    });
  }

  if (cancelBasicInfoBtn) {
    cancelBasicInfoBtn.addEventListener("click", function () {
      // 恢复原始值并禁用输入框
      basicInfoInputs.forEach((input) => {
        input.value = originalBasicInfoValues[input.id] || "";
        input.disabled = true;
      });

      // 隐藏保存按钮
      if (saveBasicInfoBtnGroup) saveBasicInfoBtnGroup.style.display = "none";
      // 显示编辑按钮
      if (editBasicInfoBtn) editBasicInfoBtn.style.display = "block";
    });
  }

  if (saveBasicInfoBtn) {
    saveBasicInfoBtn.addEventListener("click", function () {
      // 在实际应用中，这里会发送数据到服务器

      // 禁用输入框
      basicInfoInputs.forEach((input) => {
        input.disabled = true;
      });

      // 隐藏保存按钮
      if (saveBasicInfoBtnGroup) saveBasicInfoBtnGroup.style.display = "none";
      // 显示编辑按钮
      if (editBasicInfoBtn) editBasicInfoBtn.style.display = "block";

      // 更新用户名显示
      const userNameElement = document.querySelector(".user-name");
      const fullNameInput = document.getElementById("full-name");
      if (userNameElement && fullNameInput) {
        userNameElement.textContent = fullNameInput.value;
      }


      // 显示成功消息
      displaySaveMessage("基本信息已更新");
    });
  }

  // 教育经历编辑
  const editEducationBtn = document.getElementById("edit-education");
  const saveEducationBtn = document.getElementById("save-education");
  const cancelEducationBtn = document.getElementById("cancel-education");
  const saveEducationBtnGroup = document.getElementById(
    "save-education-btn-group"
  );
  const educationInputs = document.querySelectorAll("#education-form input");

  // 保存原始值，用于取消时恢复
  const originalEducationValues = {};

  if (editEducationBtn) {
    editEducationBtn.addEventListener("click", function () {
      // 启用输入框
      educationInputs.forEach((input) => {
        originalEducationValues[input.id] = input.value;
        input.disabled = false;
      });

      // 显示保存按钮
      if (saveEducationBtnGroup) saveEducationBtnGroup.style.display = "block";
      // 隐藏编辑按钮
      if (editEducationBtn) editEducationBtn.style.display = "none";
    });
  }

  if (cancelEducationBtn) {
    cancelEducationBtn.addEventListener("click", function () {
      // 恢复原始值并禁用输入框
      educationInputs.forEach((input) => {
        input.value = originalEducationValues[input.id] || "";
        input.disabled = true;
      });

      // 隐藏保存按钮
      if (saveEducationBtnGroup) saveEducationBtnGroup.style.display = "none";
      // 显示编辑按钮
      if (editEducationBtn) editEducationBtn.style.display = "block";
    });
  }

  if (saveEducationBtn) {
    saveEducationBtn.addEventListener("click", function () {
      // 在实际应用中，这里会发送数据到服务器

      // 禁用输入框
      educationInputs.forEach((input) => {
        input.disabled = true;
      });

      // 隐藏保存按钮
      if (saveEducationBtnGroup) saveEducationBtnGroup.style.display = "none";
      // 显示编辑按钮
      if (editEducationBtn) editEducationBtn.style.display = "block";

      // 显示成功消息
      displaySaveMessage("教育经历已更新");
    });
  }

  // 创建自定义弹窗函数
  function createCustomConfirmDialog(title, imgSrc, message, confirmCallback, cancelCallback) {
    // 创建弹窗背景层
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    
    // 创建弹窗主体
    const dialog = document.createElement('div');
    dialog.style.backgroundColor = 'var(--background-color, white)';
    dialog.style.borderRadius = 'var(--border-radius, 8px)';
    dialog.style.boxShadow = 'var(--shadow, 0 4px 12px rgba(0,0,0,0.15))';
    dialog.style.width = '300px';
    dialog.style.maxWidth = '95%';
    dialog.style.padding = '20px';
    dialog.style.textAlign = 'center';
    
    // 创建标题
    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
    titleElem.style.marginTop = '0';
    titleElem.style.marginBottom = '15px';
    
    // 创建图片预览
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'cover';
    img.style.border = '3px solid var(--primary-color, #0078d4)';
    img.style.marginBottom = '15px';
    
    // 创建消息文本
    const messageElem = document.createElement('p');
    messageElem.textContent = message;
    messageElem.style.marginBottom = '20px';
    
    // 创建按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.gap = '10px';
    
    // 创建确认按钮
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '使用此头像';
    confirmBtn.className = 'btn'; // 使用现有的按钮样式
    confirmBtn.onclick = function() {
      document.body.removeChild(overlay);
      confirmCallback && confirmCallback();
    };
    
    // 创建取消按钮
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '取消';
    cancelBtn.className = 'btn btn-outline'; // 使用现有的按钮样式
    cancelBtn.onclick = function() {
      document.body.removeChild(overlay);
      cancelCallback && cancelCallback();
    };
    
    // 组合弹窗元素
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(confirmBtn);
    dialog.appendChild(titleElem);
    dialog.appendChild(img);
    dialog.appendChild(messageElem);
    dialog.appendChild(buttonContainer);
    overlay.appendChild(dialog);
    
    // 添加到body
    document.body.appendChild(overlay);
    
    // 添加ESC键关闭功能
    const escHandler = function(e) {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        document.removeEventListener('keydown', escHandler);
        cancelCallback && cancelCallback();
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  // 头像上传
  const avatarInput = document.getElementById("avatar-input");
  const userAvatar = document.getElementById("user-avatar");

  // 页面加载时从localStorage加载头像
  if (userAvatar) {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      userAvatar.src = savedAvatar;
      // 触发一个自定义事件，通知其他组件更新头像
      const avatarUpdateEvent = new CustomEvent('user-avatar-updated', {
        detail: { avatarSrc: savedAvatar }
      });
      document.dispatchEvent(avatarUpdateEvent);
    }
  }

  if (avatarInput && userAvatar) {
    avatarInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        // 检查文件大小 (限制为2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
          displaySaveMessage("图片大小不能超过2MB", "error");
          this.value = ""; // 清空文件选择
          return;
        }
        
        // 检查文件类型
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
          displaySaveMessage("请选择图片文件 (JPG, PNG, GIF)", "error");
          this.value = ""; // 清空文件选择
          return;
        }
        
        const reader = new FileReader();
        const inputElement = this; // 保存input元素引用
        
        reader.onload = function (e) {
          const avatarSrc = e.target.result;
          
          // 使用自定义确认对话框
          createCustomConfirmDialog(
            "更改头像",
            avatarSrc,
            "确定使用此图片作为您的新头像吗？",
            // 确认回调
            function() {
              // 更新头像
              userAvatar.src = avatarSrc;
              
              // 保存头像到localStorage
              localStorage.setItem('userAvatar', avatarSrc);
              
              // 触发一个自定义事件，通知其他组件更新头像
              const avatarUpdateEvent = new CustomEvent('user-avatar-updated', {
                detail: { avatarSrc: avatarSrc }
              });
              document.dispatchEvent(avatarUpdateEvent);
              
              // 显示成功消息
              displaySaveMessage("头像已更新");
            },
            // 取消回调
            function() {
              // 用户取消，不做任何改变
              inputElement.value = "";
            }
          );
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 修改密码
  const changePasswordBtn = document.getElementById("change-password-btn");
  // 打开密码模态框
  if (changePasswordBtn) {
    changePasswordBtn.addEventListener("click", function () {
      window.showNotification("\"修改密码\"功能暂未实现", "info");
    });
  }
  // 更换手机号
  const changePhoneBtn = document.getElementById("change-phone-btn");
  if (changePhoneBtn) {
    changePhoneBtn.addEventListener("click", function () {
      window.showNotification("\"更换手机\"功能暂未实现", "info");
    });
  }

  function displaySaveMessage(message, type = "success") {
    window.showNotification(message, type);
  }
});

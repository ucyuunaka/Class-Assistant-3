# Notifications 通知组件

## 组件概述

Notifications 组件用于在页面右上角显示临时的反馈信息，如操作成功、失败、警告或一般信息。它支持自动消失、手动关闭，并能显示可选的操作按钮。组件会自动管理通知容器的创建和样式的加载。

## 核心功能

| 功能           | 描述                                                                 | CSS 类/JS 相关                                       |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| 多类型通知     | 支持显示 'info', 'success', 'warning', 'error' 四种类型的通知，带有不同样式和图标。 | `.notification-*`, `showNotification(type)`          |
| 自动/手动关闭  | 通知可以在指定时间后自动消失，也可以通过点击关闭按钮手动关闭。         | `duration` 参数, `.notification-close`, `notificationObj.close()` |
| 数量限制       | 限制同时显示在屏幕上的通知数量（默认为 3，可通过 localStorage 配置）。 | `limitNotificationsCount()`, `getMaxNotificationsCount()` |
| 操作按钮       | 支持在通知中添加一个可选的操作按钮，并绑定点击回调函数。               | `hasAction`, `action` 参数, `.notification-action`   |
| 自动初始化     | 组件会自动创建通知容器 (`.notification-container`) 并加载所需 CSS。    | `initNotificationContainer()`, `loadNotificationStyles()` |
| 便捷开发提示   | 提供 `showDevelopingNotification()` 函数快速显示“功能开发中”的警告。   | `showDevelopingNotification()`                       |
| 动画效果       | 通知出现和消失时带有平滑的滑入/淡出动画效果。                        | `@keyframes slideIn`, `@keyframes fadeOut`, `.fade-in`, `.fade-out` |
| 主题兼容       | 使用 CSS 变量，能自动适应亮色/暗色主题切换。                         | `var(--*)`, `[data-theme="dark"]`                    |

## CSS 样式概述 (`notifications.css`)

`notifications.css` 定义了通知系统的视觉表现：

-   **容器**: `.notification-container` 固定在页面右上角，管理通知的排列和间距。
-   **通知主体**: `.notification` 定义了单个通知的基本样式，包括背景、颜色、边框、阴影、圆角、内边距和入场动画 (`slideIn`)。
-   **类型样式**: `.notification-success`, `.notification-error`, `.notification-warning`, `.notification-info` 通过不同的左边框颜色、背景色和图标颜色来区分通知类型。`.notification-warning` 还带有一个脉冲动画。
-   **内容与图标**: `.notification-content` 和内部的 `i` 标签定义了文本和图标的样式。
-   **关闭按钮**: `.notification-close` 提供了关闭通知的按钮样式和交互效果。
-   **操作按钮**: `.notification-action` 定义了可选操作按钮的样式，并根据通知类型调整颜色。
-   **动画**: `@keyframes slideIn` 和 `@keyframes fadeOut` 定义了通知出现和消失的动画。`.fade-out` 类用于触发消失动画。
-   **深色模式**: 使用 `[data-theme="dark"]` 选择器调整了在暗色主题下的背景色、阴影和按钮悬停效果。
-   **响应式**: 使用 `@media (max-width: 768px)` 调整了在移动设备上的容器位置、最大宽度、通知内边距、字体大小和间距。

## JavaScript API 概述 (`notifications.js`)

`notifications.js` 提供了用于显示通知的函数：

-   **`showNotification(message, type = 'info', duration = 3000, hasAction = false, action = null)`**:
    -   **功能**: 创建并显示一个通知。
    -   **参数**:
        -   `message` (string): 通知内容。
        -   `type` (string): 通知类型 ('info', 'success', 'warning', 'error')。默认 'info'。
        -   `duration` (number): 自动关闭的延迟时间（毫秒）。`0` 或负数表示不自动关闭。默认 3000。
        -   `hasAction` (boolean): 是否显示操作按钮。默认 `false`。
        -   `action` (object): 操作按钮配置，包含 `text` (string, 按钮文字) 和 `onClick` (function, 点击回调)。仅当 `hasAction` 为 `true` 时有效。
    -   **返回值**: 一个通知对象 `{ close(), element }`，允许手动调用 `close()` 方法关闭该通知。
-   **`showDevelopingNotification(featureName = '', duration = 3000)`**:
    -   **功能**: 显示一个类型为 'warning' 的“功能开发中”提示。
    -   **参数**:
        -   `featureName` (string): 可选的功能名称。
        -   `duration` (number): 自动关闭延迟。默认 3000。

## 配置与初始化

组件在 `DOMContentLoaded` 事件触发后会自动执行初始化：

1.  调用 `loadNotificationStyles()` 加载 CSS。
2.  调用 `initNotificationContainer()` 确保通知容器存在。

之后，可以通过调用全局的 `window.showNotification()` 或 `window.showDevelopingNotification()` (或通过模块导入使用) 来显示通知。

```javascript
// 显示一个成功通知，5秒后自动关闭
showNotification('操作成功完成！', 'success', 5000);

// 显示一个错误通知，不自动关闭
showNotification('发生了一个严重错误。', 'error', 0);

// 显示一个带操作按钮的信息通知
showNotification('有新版本可用。', 'info', 10000, true, {
  text: '立即更新',
  onClick: () => {
    console.log('开始更新...');
    // 执行更新逻辑
  }
});

// 显示功能开发中提示
showDevelopingNotification('用户管理');
```

## 使用示例

```javascript
// 导入 (如果使用模块)
// import { showNotification, showDevelopingNotification } from '/components/notifications/notifications.js';

// 示例按钮点击事件
document.getElementById('saveButton').addEventListener('click', () => {
  // 模拟保存操作
  const success = Math.random() > 0.3; // 模拟成功或失败

  if (success) {
    showNotification('设置已成功保存。', 'success');
  } else {
    showNotification('保存失败，请重试。', 'error', 5000); // 错误信息显示长一点
  }
});

document.getElementById('betaFeatureButton').addEventListener('click', () => {
  showDevelopingNotification('高级统计图表');
});
```

## 定制与扩展

-   **CSS 变量**: 可以通过覆盖 `notifications.css` 中使用的 CSS 变量（如 `--primary-color`, `--success-color`, `--background-color`, `--text-color` 等）来定制颜色方案。
-   **通知数量**: 可以通过在 `localStorage` 中设置 `maxNotifications` 项来改变同时显示的最大通知数量。
-   **图标**: 默认使用 Font Awesome 图标 (`fas fa-*`)，可以通过修改 `notifications.js` 中的 `icon` 变量或直接在 CSS 中覆盖图标样式来更换图标库或样式。
-   **动画**: 可以修改 `@keyframes` 或 `transition` 属性来改变动画效果。
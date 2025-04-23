# Sidebar 侧边栏组件

## 组件概述

Sidebar 组件提供了一个可展开/收缩的侧边导航栏，用于组织和展示主要的导航链接。它支持响应式布局，在不同设备尺寸下提供合适的交互体验，并能适应亮色和暗色主题。

## 核心功能

| 功能                 | 描述                                                         | CSS 类/属性/JS 相关                                     |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| 动态加载内容/样式    | 组件初始化时自动加载 HTML 模板和 CSS 样式                    | `loadSidebarContent()`, `loadStyles()`                  |
| 展开/收缩            | 桌面端悬停展开，移动端通过按钮切换                           | `.sidebar:hover`, `.sidebar.active`, `toggleSidebar()`  |
| 响应式布局           | 自动适应不同屏幕尺寸，调整布局和交互方式                     | `@media (max-width: 768px)`, `setupMobileToggle()`      |
| 主题切换 (亮/暗)     | 支持通过 `data-theme` 属性切换亮色和暗色模式                 | `[data-theme="dark"]`, `listenForThemeChanges()`        |
| 菜单导航             | 点击菜单项可跳转到指定页面                                   | `.sidebar-item[data-href]`, 事件委托处理                |
| 当前页高亮           | 自动高亮与当前 URL 匹配的菜单项                              | `.sidebar-item.active`, `highlightCurrentMenuItem()`    |
| 用户头像显示/更新    | 显示用户头像，并能从 `localStorage` 加载或通过事件更新       | `.sidebar-profile-img`, `loadUserAvatar()`, `listenForAvatarUpdates()` |
| 触摸优化             | 为触摸设备提供更好的点击反馈和滚动处理                       | `.touch-active`, `setupTouchHandlers()`                 |
| 桌面悬停遮罩         | 桌面端侧边栏展开时显示半透明遮罩层，增强聚焦效果             | `.sidebar-hover-overlay`, `initSidebarHover()`          |
| 移动端切换按钮与遮罩 | 移动端提供独立的切换按钮和全屏遮罩层                         | `.sidebar-toggle`, `.sidebar-overlay`, `setupMobileToggle()` |

## HTML 结构概述 (`sidebar.html`)

`sidebar.html` 文件定义了侧边栏的静态结构，主要包括：

-   `.sidebar-btn`: 顶部的模拟窗口按钮。
-   `.sidebar-profile`: 用户信息区域，包含头像 (`.sidebar-profile-img`) 和文本 (`.sidebar-profile-text`)。
-   `.sidebar-line`: 分隔线。
-   `.sidebar-title`: 菜单区域的标题。
-   `.sidebar-menu`: 包含多个菜单项 (`.sidebar-item`) 的容器。
-   `.sidebar-item`: 单个菜单项，包含左侧图标 (`.sidebar-icon-left`)、文本 (`.sidebar-text`)、右侧图标 (`.sidebar-icon-right`) 和高亮条 (`.sidebar-light`)。使用 `data-href` 属性指定链接目标。

## CSS 样式概述 (`sidebar.css`)

`sidebar.css` 文件负责定义组件的所有视觉样式和交互效果：

-   **基础样式**: `.sidebar` 类定义了宽度、高度、背景、圆角、过渡等基本属性。
-   **展开/收缩**: 通过 `:hover` (桌面) 和 `.active` (移动) 伪类/类控制宽度和内部元素（文本、图标、分隔线）的显隐与过渡。
-   **主题支持**: 使用 `[data-theme="dark"]` 属性选择器为暗色模式提供覆盖样式。
-   **响应式布局**: 使用 `@media` 查询针对不同屏幕尺寸（特别是 `max-width: 768px`）调整侧边栏的显隐方式、交互逻辑和布局。
-   **内部元素样式**: 定义了按钮组、用户头像、分隔线、菜单标题、菜单项（图标、文本、高亮条）等具体元素的样式。
-   **遮罩层**: `.sidebar-hover-overlay` (桌面悬停) 和 `.sidebar-overlay` (移动端激活) 的样式。
-   **切换按钮**: `.sidebar-toggle` (移动端) 的样式。

## JavaScript API 概述 (`sidebar.js`)

`sidebar.js` 文件通过 `Sidebar` 类封装了组件的逻辑：

-   **`constructor(containerId)`**: 初始化 Sidebar 实例，指定容器 ID。
-   **`init()`**: 组件入口方法，加载样式和内容，设置事件监听。
-   **`loadStyles()`**: 动态加载 `sidebar.css`。
-   **`loadSidebarContent()`**: 通过 `fetch` 加载 `sidebar.html` 并插入容器，然后调用 `initSidebar()`。
-   **`initSidebar()`**: 设置菜单项点击事件、高亮当前项、处理移动端切换逻辑。
-   **`toggleSidebar(show = null)`**: 控制侧边栏的显示/隐藏状态（主要用于移动端）。
-   **`highlightCurrentMenuItem(pageName)`**: 根据当前页面路径高亮对应的菜单项。
-   **`setupMobileToggle()`**: 创建并设置移动端切换按钮和遮罩层的事件。
-   **`initSidebarHover()`**: 设置桌面端悬停时显示/隐藏遮罩层的逻辑。
-   **`loadUserAvatar()`**: 从 `localStorage` 加载用户头像。
-   **`listenForAvatarUpdates()`**: 监听 `user-avatar-updated` 自定义事件以更新头像。
-   **`listenForThemeChanges()`**: 监听 `themeChanged` 自定义事件（尽管当前 CSS 已处理主题切换）。
-   **`setupTouchHandlers()`**: 添加针对触摸设备的优化处理。

## 配置与初始化

要使用 Sidebar 组件，需要在 HTML 中放置一个容器元素，并通过 JavaScript 初始化 `Sidebar` 类：

```html
<!-- HTML 容器 -->
<div id="sidebar-container"></div>
```

```javascript
// JavaScript 初始化
import { Sidebar } from '/components/sidebar/sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  new Sidebar('sidebar-container');
});
```

## 响应式设计

-   **桌面端 ( > 768px )**: 侧边栏默认收缩为窄条（110px），鼠标悬停时展开（280px），并显示半透明遮罩层 (`.sidebar-hover-overlay`)。主内容区和页脚通过 `.sidebar-active` 类和 CSS 调整 `padding-left` 或 `margin-left` 来适应侧边栏宽度。
-   **移动端 ( <= 768px )**: 侧边栏默认完全隐藏 (`width: 0`)。通过一个固定定位的切换按钮 (`.sidebar-toggle`) 控制其显示/隐藏。激活时，侧边栏展开（280px）并覆盖在内容之上，同时显示一个全屏遮罩层 (`.sidebar-overlay`)。主内容区和页脚不随侧边栏状态改变边距。

## 主题支持

组件通过 CSS 的 `[data-theme="dark"]` 属性选择器原生支持亮色和暗色主题。当 `<html>` 或 `<body>` 标签具有 `data-theme="dark"` 属性时，会自动应用暗色模式下的样式（如背景色、文本颜色、边框颜色等）。

## 用户头像

-   组件初始化时会尝试从 `localStorage` 中的 `userAvatar` 项加载用户头像 URL 并显示在 `.sidebar-profile-img img` 中。
-   组件会监听 `document` 上的 `user-avatar-updated` 自定义事件。当该事件触发时，会使用事件 `detail.avatarSrc` 中的新 URL 更新侧边栏头像。

## 使用示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sidebar 示例</title>
    <!-- 引入 Remixicon 图标库 -->
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet"/>
    <!-- 引入主样式 (假设包含主题变量等) -->
    <link rel="stylesheet" href="/css/styles.css">
    <!-- 引入主题样式 -->
    <link rel="stylesheet" href="/css/themes/themes.css">
</head>
<body>
    <!-- 侧边栏容器 -->
    <aside id="sidebar-container"></aside>

    <!-- 主内容区域 -->
    <main class="content sidebar-active">
        <h1>页面主内容</h1>
        <!-- 其他页面元素 -->
    </main>

    <!-- 页脚 -->
    <footer class="footer">
        <!-- 页脚内容 -->
    </footer>

    <!-- 引入主 JS -->
    <script type="module" src="/js/main.js"></script>
    <!-- 引入主题切换 JS -->
    <script type="module" src="/js/themes.js"></script>
    <!-- 初始化 Sidebar -->
    <script type="module">
        import { Sidebar } from '/components/sidebar/sidebar.js';
        new Sidebar('sidebar-container');
    </script>
</body>
</html>
```

**注意:** 上述示例假设你已正确设置了 Remixicon 图标库、主样式 (`styles.css`)、主题样式 (`themes.css`) 以及相关的 JS 文件 (`main.js`, `themes.js`)。确保 `Sidebar` 类及其依赖项可通过模块导入。

## 定制与扩展

-   **CSS 变量**: 可以通过覆盖 `sidebar.css` 中使用的 CSS 变量（如 `--primary-color`, `--text-color`, `--background`, `--shadow-lg` 等）来定制颜色、阴影等。
-   **JavaScript**: 可以扩展 `Sidebar` 类或在外部监听其触发的事件（如果需要）来实现更复杂的交互。
-   **HTML 模板**: 可以直接修改 `sidebar.html` 来调整侧边栏的静态内容和结构。
# Header 顶栏组件

## 组件概述

Header 组件用于在页面顶部显示标题、副标题和操作按钮，支持两种不同的展示模式：首页大型顶栏和普通页面小型顶栏，提供了灵活的配置选项和响应式布局。

## 核心功能

| 功能         | 描述                               | CSS 类                                         | JS 方法                                    |
| ------------ | ---------------------------------- | ---------------------------------------------- | ------------------------------------------ |
| 两种展示模式 | 支持首页大型顶栏和普通页面小型顶栏 | `.home-header`, `.page-header`                 | `renderHomeHeader()`, `renderPageHeader()` |
| 可配置标题   | 提供可自定义的标题和副标题         | `.home-header-title`, `.page-header-title`     | 通过 constructor 参数配置                  |
| 按钮组管理   | 支持添加多个操作按钮               | `.home-header-buttons`, `.page-header-buttons` | `renderButtons()`                          |
| 灵活按钮位置 | 支持底部或右侧按钮位置             | `.page-header-right`                           | 通过 buttonPosition 参数配置               |
| 自定义背景   | 支持自定义背景样式                 | 通过 backgroundClass 参数配置                  | 通过 options 配置                          |
| 响应式布局   | 在不同设备尺寸下自适应显示         | 媒体查询                                       | -                                          |

## 顶栏结构

| 模式         | 主要元素 | CSS 类                    | 描述                   |
| ------------ | -------- | ------------------------- | ---------------------- |
| 首页模式     | 容器     | `.home-header`            | 首页大型顶栏容器       |
|              | 内容区域 | `.home-header-content`    | 包含标题、文本和按钮   |
|              | 标题     | `.home-header-title`      | 大号标题文本           |
|              | 描述文本 | `.home-header-text`       | 副标题或说明文本       |
|              | 按钮组   | `.home-header-buttons`    | 一组操作按钮           |
|              | 装饰元素 | `.home-header-decoration` | 背景装饰效果           |
| 普通页面模式 | 容器     | `.page-header`            | 普通页面小型顶栏容器   |
|              | 标题     | `.page-header-title`      | 页面标题               |
|              | 副标题   | `.page-header-subtitle`   | 页面副标题             |
|              | 按钮组   | `.page-header-buttons`    | 一组操作按钮           |
|              | 右侧布局 | `.page-header-right`      | 标题左侧、按钮右侧布局 |

## 配置选项

| 参数                    | 类型    | 默认值       | 描述                                |
| ----------------------- | ------- | ------------ | ----------------------------------- |
| containerId             | String  | -            | 顶栏容器的 DOM 元素 ID              |
| options.isHomePage      | Boolean | false        | 是否使用首页样式顶栏                |
| options.title           | String  | '页面标题'   | 顶栏标题文本                        |
| options.subtitle        | String  | '页面副标题' | 顶栏副标题或描述文本                |
| options.buttons         | Array   | []           | 按钮配置数组                        |
| options.buttonPosition  | String  | 'bottom'     | 按钮位置，可选值：'right'或'bottom' |
| options.backgroundClass | String  | ''           | 自定义背景样式类                    |

## 按钮配置

每个按钮对象应包含以下属性：

| 属性      | 类型    | 描述                     |
| --------- | ------- | ------------------------ |
| text      | String  | 按钮显示文本             |
| url       | String  | 按钮链接地址             |
| isPrimary | Boolean | 是否为主要按钮，影响样式 |
| className | String  | 可选的自定义 CSS 类      |

## 响应式特性

- 在移动设备上减少内边距和字体大小
- 按钮支持自动换行
- 自适应不同屏幕尺寸
- 保持渐变背景效果在各种尺寸下的视觉一致性

## 使用示例

### 首页样式顶栏

```html
<!-- 在页面中创建顶栏容器 -->
<div id="home-header"></div>

<!-- 初始化首页样式顶栏 -->
<script type="module">
  import { Header } from "/components/header/header.js";

  new Header("home-header", {
    isHomePage: true,
    title: "课堂助手",
    subtitle: "高效管理你的学习计划与成绩记录",
    buttons: [
      { text: "开始使用", url: "/pages/login.html", isPrimary: true },
      { text: "了解更多", url: "/pages/about.html", isPrimary: false },
    ],
  });
</script>
```

### 普通页面顶栏

```html
<!-- 在页面中创建顶栏容器 -->
<div id="page-header"></div>

<!-- 初始化普通页面顶栏 -->
<script type="module">
  import { Header } from "/components/header/header.js";

  new Header("page-header", {
    isHomePage: false,
    title: "课程管理",
    subtitle: "添加、编辑和管理你的课程",
    buttons: [
      { text: "添加课程", url: "/pages/add-course.html", isPrimary: true },
    ],
    buttonPosition: "right",
  });
</script>
```

## 自定义与扩展

顶栏组件支持通过以下方式进行自定义：

1. **背景样式**: 通过 backgroundClass 参数自定义背景
2. **按钮样式**: 通过按钮配置中的 className 自定义按钮样式
3. **CSS 变量**: 组件使用 CSS 变量，可以通过调整以下变量改变外观
   - `--primary-color`: 主题色
   - `--gradient-end`: 渐变结束色
   - `--border-radius-lg`: 顶栏底部圆角

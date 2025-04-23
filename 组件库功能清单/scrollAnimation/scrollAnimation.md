# ScrollAnimation 滚动动画组件

## 组件概述

ScrollAnimation 组件用于在页面滚动时，为进入视口的元素添加优雅的淡入或浮现动画效果。它利用 `IntersectionObserver` API 来高效地检测元素的可见性，并通过添加 CSS 类来触发预定义的动画。

## 核心功能

| 功能           | 描述                                                                 | CSS 类/JS 相关                                       |
| -------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| 视口检测       | 使用 `IntersectionObserver` 检测元素是否滚动进入或离开视口。         | `IntersectionObserver`, `initScrollAnimation()`        |
| 动画触发       | 当元素进入视口时，为其添加指定的激活 CSS 类（默认为 `.active`）。    | `.active`, `options.activeClass`                     |
| 多种动画效果   | 提供多种预设的 CSS 动画变体（如淡入、上下左右浮现、缩放）。        | `.fade-up`, `.fade-down`, `.fade-left`, `.fade-right`, `.zoom-in` |
| 动画延迟       | 支持通过 CSS 类为动画添加不同的延迟时间，方便创建序列动画。          | `.delay-100`, `.delay-200`, ..., `.delay-500`        |
| 配置选项       | 可配置触发动画的可见性阈值、激活类名以及动画是否只触发一次。         | `options.threshold`, `options.activeClass`, `options.once` |
| 自动加载样式   | 组件初始化时会自动检查并加载所需的 `scrollAnimation.css` 文件。      | `loadScrollAnimationStyles()`                        |
| 手动控制       | 返回一个控制器对象，允许手动刷新观察列表或停止所有观察。             | `controller.refresh()`, `controller.disconnect()`    |

## CSS 样式概述 (`scrollAnimation.css`)

`scrollAnimation.css` 定义了动画的基础状态、激活状态、不同的动画变体以及延迟效果：

-   **基础动画类**: `.animate-on-scroll` 定义了元素在动画触发前的初始状态（通常是隐藏的，如 `opacity: 0`）和过渡效果 (`transition`)。
-   **动画变体类**:
    -   `.fade-up`, `.fade-down`, `.fade-left`, `.fade-right`: 定义元素从不同方向平移进入的初始 `transform` 状态。
    -   `.zoom-in`: 定义元素从小到大缩放进入的初始 `transform` 状态。
-   **激活状态类**: `.active` 类（或通过 `options.activeClass` 自定义）定义了元素动画完成后的最终状态（通常是 `opacity: 1` 和 `transform: none`）。
-   **延迟类**: `.delay-*` 类通过 `transition-delay` 属性为动画添加延迟。

## JavaScript API 概述 (`scrollAnimation.js`)

`scrollAnimation.js` 主要提供了一个导出函数 `initScrollAnimation` 来初始化和控制动画：

-   **`initScrollAnimation(selector = '.animate-on-scroll', options = {})`**:
    -   **功能**: 初始化滚动动画。查找匹配 `selector` 的元素，并使用 `IntersectionObserver` 监视它们。当元素满足 `options.threshold` 定义的可见性条件时，添加 `options.activeClass`。
    -   **参数**:
        -   `selector` (string): CSS 选择器，用于指定哪些元素需要应用滚动动画。默认为 `.animate-on-scroll`。
        -   `options` (object): 配置对象，包含：
            -   `threshold` (number): 触发动画的元素可见比例 (0 到 1)。默认为 `0.1`。
            -   `activeClass` (string): 元素进入视口时添加的 CSS 类名。默认为 `'active'`。
            -   `once` (boolean): 动画是否只触发一次。`true` 表示触发后即停止观察，`false` 表示元素离开视口后移除 `activeClass`，再次进入时重新触发。默认为 `true`。
    -   **返回值**: 一个控制器对象，包含 `refresh()` 和 `disconnect()` 方法，或者在未找到元素时返回 `undefined`。

## 配置与初始化

该组件通常在页面加载完成后自动初始化，查找所有带有 `.animate-on-scroll` 类的元素并应用默认动画设置。

```javascript
// 默认初始化 (在 scrollAnimation.js 文件末尾自动执行)
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimation(); // 使用默认选择器 '.animate-on-scroll' 和默认选项
});
```

也可以手动调用 `initScrollAnimation` 并传入自定义参数：

```javascript
// 手动初始化，指定不同选择器和选项
import { initScrollAnimation } from '/components/scrollAnimation/scrollAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
  // 为所有 .card 元素应用动画，阈值为 0.5，且可重复触发
  const cardAnimator = initScrollAnimation('.card', {
    threshold: 0.5,
    once: false
  });

  // 为所有 .special-item 应用动画，使用自定义激活类 'is-visible'
  const specialAnimator = initScrollAnimation('.special-item', {
    activeClass: 'is-visible'
  });

  // 如果后续动态添加了 .card 元素，可以手动刷新
  // someFunctionThatAddsCards();
  // if (cardAnimator) {
  //   cardAnimator.refresh();
  // }
});
```

## 使用示例

在 HTML 元素上添加基础动画类 `.animate-on-scroll`（或自定义的选择器类），并可以组合使用动画变体类和延迟类。

```html
<!-- 默认动画效果 -->
<div class="animate-on-scroll">默认淡入浮现</div>

<!-- 从左侧滑入，延迟 200ms -->
<div class="animate-on-scroll fade-left delay-200">左侧滑入</div>

<!-- 缩放进入，延迟 400ms -->
<div class="animate-on-scroll zoom-in delay-400">缩放进入</div>

<!-- 使用自定义选择器 .card，从下方滑入 -->
<div class="card fade-up">卡片内容</div>

<!-- 使用自定义选择器 .special-item，从右侧滑入，自定义激活类 -->
<div class="special-item fade-right">特殊条目</div>
```

当这些元素滚动到视口内（默认可见 10%）时，JavaScript 会自动为其添加 `.active` 类（或自定义的激活类），从而触发 CSS 中定义的过渡动画。

## 定制与扩展

-   **CSS**: 可以通过修改 `scrollAnimation.css` 文件来调整现有的动画效果（如过渡时间、变换效果）或添加新的动画变体类。
-   **JavaScript**: 可以在调用 `initScrollAnimation` 时传入不同的 `selector` 和 `options` 来为不同类型的元素应用不同的动画行为。
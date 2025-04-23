# Buttons 按钮组件

## 组件概述

Buttons 组件提供丰富的交互按钮 UI 元素，支持多种样式和交互效果，主要用于网页中的用户交互操作。

## 核心功能

| 功能         | 描述                       | CSS 类/属性                | JS 方法                   |
| ------------ | -------------------------- | -------------------------- | ------------------------- |
| 涟漪点击效果 | 点击按钮时产生扩散动画效果 | `.btn-ripple`              | `initRippleEffect()`      |
| 加载状态     | 显示加载中状态，禁用点击   | `.btn-loading`             | `setButtonLoading()`      |
| 二次确认     | 点击按钮前需进行确认       | `[data-confirm]`           | `createConfirmButton()`   |
| 开关切换     | 切换按钮的开启/关闭状态    | `.btn-toggle`              | `setToggleState()`        |
| 徽章提示     | 在按钮上显示数字标记       | `.btn-badge`               | `setButtonBadge()`        |
| 颜色自适应   | 根据背景自动调整文本颜色   | `[data-auto-color="true"]` | `updateButtonTextColor()` |
| 展开按钮     | 可横向或纵向展开的按钮     | `.btn-expand`              | -                         |

## 按钮类型

| 类型     | CSS 类           | 描述               |
| -------- | ---------------- | ------------------ |
| 基础按钮 | `.btn`           | 基本按钮样式       |
| 主要按钮 | `.btn-primary`   | 主色调按钮         |
| 次要按钮 | `.btn-secondary` | 次要色调按钮       |
| 成功按钮 | `.btn-success`   | 表示成功的绿色按钮 |
| 警告按钮 | `.btn-warning`   | 表示警告的黄色按钮 |
| 危险按钮 | `.btn-danger`    | 表示危险的红色按钮 |
| 文本按钮 | `.btn-text`      | 仅文本样式按钮     |
| 轮廓按钮 | `.btn-outline-*` | 带轮廓的按钮变体   |

## 尺寸变体

| 尺寸     | CSS 类       | 描述               |
| -------- | ------------ | ------------------ |
| 小尺寸   | `.btn-sm`    | 小型按钮           |
| 默认尺寸 | `.btn`       | 标准尺寸按钮       |
| 大尺寸   | `.btn-lg`    | 大型按钮           |
| 超大尺寸 | `.btn-xl`    | 特大号按钮         |
| 块级按钮 | `.btn-block` | 占满容器宽度的按钮 |

## 按钮组

| 类型       | CSS 类                | 描述             |
| ---------- | --------------------- | ---------------- |
| 水平按钮组 | `.btn-group`          | 水平排列的按钮组 |
| 垂直按钮组 | `.btn-group-vertical` | 垂直排列的按钮组 |

## 公共 API

| 方法                                               | 功能                 | 参数                                                          |
| -------------------------------------------------- | -------------------- | ------------------------------------------------------------- |
| `initButtons()`                                    | 初始化所有按钮组件   | 无                                                            |
| `setButtonLoading(btn, isLoading)`                 | 设置按钮加载状态     | btn: 按钮元素/选择器, isLoading: 是否为加载状态               |
| `createConfirmButton(selector, message, callback)` | 创建二次确认按钮     | selector: 按钮选择器, message: 确认消息, callback: 确认后回调 |
| `setButtonBadge(btn, count)`                       | 设置按钮徽章计数     | btn: 按钮元素/选择器, count: 显示数字                         |
| `setToggleState(btn, isActive)`                    | 设置切换按钮状态     | btn: 按钮元素/选择器, isActive: 是否激活                      |
| `updateButtonTextColor(button)`                    | 根据背景更新文本颜色 | button: 按钮元素                                              |

## 辅助功能与响应式

- 支持键盘焦点状态 (`:focus-visible`)
- 针对触摸设备优化
- 响应式尺寸调整
- 暗色模式适配

## 使用示例

```html
<!-- 基本按钮 -->
<button class="btn btn-primary">主要按钮</button>

<!-- 加载状态按钮 -->
<button class="btn btn-primary" data-loading-text="加载中...">保存</button>

<!-- 带确认按钮 -->
<button class="btn btn-danger" data-confirm="确定要删除吗？">删除</button>

<!-- 切换按钮 -->
<button class="btn btn-toggle" data-on-text="开启" data-off-text="关闭">
  切换
</button>

<!-- 带徽章的按钮 -->
<button class="btn btn-primary btn-badge">
  消息
  <span class="badge">5</span>
</button>
```

## 定制与扩展

该组件允许通过 CSS 变量和扩展 API 进行定制。可以通过 CSS 自定义属性修改颜色、圆角和过渡效果，通过 JS API 扩展按钮行为。

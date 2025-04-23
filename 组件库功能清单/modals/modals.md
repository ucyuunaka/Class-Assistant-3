# Modals 模态弹窗组件

## 组件概述

Modals 组件提供了一套完整的模态弹窗解决方案，用于创建各种类型的弹出窗口，包括基础弹窗、确认弹窗、警告弹窗、成功弹窗和错误弹窗等。组件支持多种尺寸、类型和按钮布局选项，适用于不同的交互场景。

## 核心功能

| 功能         | 描述                       | CSS 类             | JS 方法                                        |
| ------------ | -------------------------- | ------------------ | ---------------------------------------------- |
| 基础模态弹窗 | 创建和显示基本模态弹窗     | `.modal-container` | `showModal()`, `Modal.show()`                  |
| 确认弹窗     | 显示带确认和取消按钮的弹窗 | `.modal-container` | `showConfirmModal()`                           |
| 警告弹窗     | 显示警告类型的确认弹窗     | `.modal-warning`   | `showWarningModal()`                           |
| 危险操作弹窗 | 显示危险操作确认弹窗       | `.modal-danger`    | `showDangerModal()`                            |
| 成功提示弹窗 | 显示带成功图标的提示弹窗   | `.modal-success`   | `showSuccessModal()`                           |
| 错误提示弹窗 | 显示带错误图标的提示弹窗   | `.modal-danger`    | `showErrorModal()`                             |
| 已有弹窗管理 | 管理已存在于 DOM 中的弹窗  | `.modal-container` | `Modal.showExisting()`, `Modal.hideExisting()` |
| 自动关闭处理 | ESC 键和背景点击关闭       | -                  | 内部处理                                       |

## 弹窗类型

| 类型     | CSS 类             | 描述               |
| -------- | ------------------ | ------------------ |
| 基础弹窗 | `.modal-container` | 基本模态弹窗样式   |
| 信息弹窗 | `.modal-info`      | 蓝色主题的信息弹窗 |
| 成功弹窗 | `.modal-success`   | 绿色主题的成功弹窗 |
| 警告弹窗 | `.modal-warning`   | 黄色主题的警告弹窗 |
| 危险弹窗 | `.modal-danger`    | 红色主题的危险弹窗 |

## 弹窗尺寸

| 尺寸     | CSS 类              | 内容宽度         |
| -------- | ------------------- | ---------------- |
| 默认尺寸 | -                   | max-width: 500px |
| 小型     | `.modal-sm`         | max-width: 400px |
| 大型     | `.modal-lg`         | max-width: 700px |
| 超大型   | `.modal-xl`         | max-width: 900px |
| 全屏     | `.modal-fullscreen` | 95%宽度和高度    |

## 按钮样式

| 样式     | CSS 类                 | 描述               |
| -------- | ---------------------- | ------------------ |
| 主要按钮 | `.modal-btn-primary`   | 蓝色背景主要按钮   |
| 成功按钮 | `.modal-btn-success`   | 绿色背景成功按钮   |
| 警告按钮 | `.modal-btn-warning`   | 黄色背景警告按钮   |
| 危险按钮 | `.modal-btn-danger`    | 红色背景危险按钮   |
| 次要按钮 | `.modal-btn-secondary` | 透明背景带边框按钮 |

## 按钮布局

| 布局     | CSS 类                   | 描述         |
| -------- | ------------------------ | ------------ |
| 右对齐   | - (默认)                 | 按钮右侧对齐 |
| 居中对齐 | `.modal-footer.centered` | 按钮居中对齐 |
| 两端对齐 | `.modal-footer.spaced`   | 按钮均匀分布 |
| 左对齐   | `.modal-footer.left`     | 按钮左侧对齐 |
| 垂直排列 | `.modal-footer.stacked`  | 按钮垂直排列 |

## 公共 API

| 方法                   | 功能             | 参数                                                     |
| ---------------------- | ---------------- | -------------------------------------------------------- |
| `showModal()`          | 显示基本模态弹窗 | title, content, buttons, options                         |
| `showConfirmModal()`   | 显示确认弹窗     | title, message, confirmCallback, cancelCallback, options |
| `showWarningModal()`   | 显示警告弹窗     | title, message, confirmCallback, options                 |
| `showDangerModal()`    | 显示危险操作弹窗 | title, message, confirmCallback, options                 |
| `showSuccessModal()`   | 显示成功提示弹窗 | title, message, callback, options                        |
| `showErrorModal()`     | 显示错误提示弹窗 | title, message, callback, options                        |
| `Modal.show()`         | 底层弹窗创建方法 | options 对象                                             |
| `Modal.close()`        | 关闭当前弹窗     | -                                                        |
| `Modal.showExisting()` | 显示已存在的弹窗 | modalElement, options                                    |
| `Modal.hideExisting()` | 隐藏已存在的弹窗 | modalElement                                             |

## 响应式特性

- 小屏幕下自动调整内容宽度和布局
- 移动设备上按钮垂直排列以便于点击
- 弹窗内容支持溢出滚动
- 弹窗高度自适应内容，但不超过视口高度的 90%

## 使用示例

### 基础模态弹窗

```javascript
showModal("操作提示", "您确定要继续吗？", [
  {
    text: "取消",
    type: "secondary",
    onClick: () => console.log("已取消"),
  },
  {
    text: "确认",
    type: "primary",
    onClick: () => console.log("已确认"),
  },
]);
```

### 确认弹窗

```javascript
showConfirmModal(
  "删除确认",
  "确定要删除这条记录吗？此操作无法撤销。",
  () => console.log("确认删除"),
  () => console.log("已取消")
);
```

### 成功提示弹窗

```javascript
showSuccessModal("操作成功", "您的数据已成功保存！", () =>
  console.log("关闭成功提示")
);
```

### 危险操作弹窗

```javascript
showDangerModal("危险操作", "此操作将永久删除所有数据，确定继续吗？", () =>
  console.log("确认危险操作")
);
```

## 自定义与扩展

模态弹窗组件支持多种自定义选项：

1. **尺寸定制**: 通过 size 参数可选择不同大小的弹窗
2. **按钮布局**: 通过 footerAlign 参数调整按钮排列方式
3. **按钮文本**: 通过 buttonText、confirmText、cancelText 等参数自定义按钮文本
4. **回调函数**: 提供 onOpen 和 onClose 回调函数处理弹窗生命周期事件
5. **背景点击**: 通过 closeOnBackdrop 参数控制点击背景是否关闭弹窗

/**
 * 该脚本主要负责处理用户在示例页面上的交互，包括：
 * 1. 初始化页面状态（如得分显示）。
 * 2. 监听用户事件（如按钮点击）。
 * 3. 根据用户输入更新页面内容（如分数）。
 * 4. 提供基本的输入验证和错误处理提示。
 *
 * 主要依赖的 DOM 元素 ID:
 * - score-display: 用于显示得分。
 * - submit-btn: 用于触发表单提交或特定操作的按钮。
 * - user-input: 用户输入框。
 */

// --- 全局作用域变量 ---
let score = 0; // 用于追踪用户的当前得分，初始为 0
const MAX_ATTEMPTS = 3; // 常量：允许的最大尝试次数
let currentAttempts = 0; // 当前尝试次数

// --- DOM 元素引用 ---
// 预先获取常用的 DOM 元素，提高性能并方便管理
const scoreDisplayElement = document.getElementById('score-display');
const submitButtonElement = document.getElementById('submit-btn');
const userInputElement = document.getElementById('user-input');

// --- 函数定义 ---

/**
 * 计算两个数字的和。
 * 这是一个纯函数示例，用于演示 JSDoc 的详细用法。
 *
 * @param {number} num1 第一个加数。
 * @param {number} num2 第二个加数。
 * @returns {number} 两个数字的和。
 * @throws {TypeError} 如果任一参数不是数字类型。
 */
function addNumbers(num1, num2) {
  // 严格检查输入类型
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    // 抛出类型错误，更符合函数契约
    throw new TypeError('输入无效：两个参数必须都是数字。');
    // console.error('输入无效：两个参数必须都是数字。'); // 或者仅打印错误
    // return NaN; // 返回 NaN 也是一种选择，取决于错误处理策略
  }
  // 返回计算结果
  return num1 + num2;
}

/**
 * 更新页面上的得分和尝试次数显示。
 * 查找对应的 DOM 元素并更新其文本内容。
 * 进行了空检查，以防元素不存在。
 */
function updateStatusDisplay() {
  // 更新得分显示
  if (scoreDisplayElement) {
    scoreDisplayElement.textContent = `得分: ${score}`;
  } else {
    // NOTE: 得分显示元素是核心 UI 的一部分，如果找不到，可能表示 HTML 结构有问题。
    console.warn('警告：未找到得分显示元素 "#score-display"。');
  }

  // TODO: 添加尝试次数的显示更新逻辑
  // const attemptsElement = document.getElementById('attempts-display');
  // if (attemptsElement) {
  //   attemptsElement.textContent = `尝试次数: ${currentAttempts}/${MAX_ATTEMPTS}`;
  // }
}

/**
 * 处理用户提交答案的逻辑。
 *
 * @param {Event} event 事件对象，用于阻止默认行为等。
 */
function handleSubmit(event) {
  // 1. 阻止默认事件（例如表单提交可能导致页面刷新）
  event.preventDefault();
  console.log('提交事件已被拦截。');

  // 2. 检查是否已达最大尝试次数
  if (currentAttempts >= MAX_ATTEMPTS) {
      alert(`你已经尝试了 ${MAX_ATTEMPTS} 次，不能再提交了！`);
      // FIXME: 应该禁用提交按钮，而不是每次都弹窗提示。
      // submitButtonElement.disabled = true; // 示例：禁用按钮
      return; // 提前退出函数
  }

  // 3. 获取用户输入值
  const userAnswer = userInputElement ? userInputElement.value.trim() : ''; // 获取并去除首尾空格
  console.log(`用户输入: "${userAnswer}"`);

  // 4. 简单的输入验证 (示例：不允许为空)
  if (userAnswer === '') {
    alert('请输入答案后再提交！');
    return; // 输入为空，退出处理
  }

  // 5. 核心逻辑：判断答案是否正确 (示例逻辑)
  const correctAnswer = 'correct'; // 假设正确答案是 'correct'
  if (userAnswer.toLowerCase() === correctAnswer) {
    // 5.1 正确答案处理
    alert('回答正确！');
    score++; // 分数增加
    // 重置尝试次数或进行其他操作...
  } else {
    // 5.2 错误答案处理
    alert('回答错误，请再试一次！');
    currentAttempts++; // 尝试次数增加
  }

  // 6. 更新页面显示状态（得分、尝试次数等）
  updateStatusDisplay();

  // 7. 清空输入框，方便下次输入 (可选)
  if (userInputElement) {
    userInputElement.value = '';
  }

  // 8. 检查是否用完尝试次数 (在更新之后检查)
  if (currentAttempts >= MAX_ATTEMPTS) {
      alert(`尝试次数已用完！最终得分: ${score}`);
      // FIXME: 同样，这里应该禁用输入和提交功能
      if (submitButtonElement) submitButtonElement.disabled = true;
      if (userInputElement) userInputElement.disabled = true;
  }
}


// --- 事件监听器设置 ---

// 确保按钮存在后再添加监听器，防止脚本因元素未找到而报错
if (submitButtonElement) {
  // 为提交按钮添加点击事件监听器，回调函数为 handleSubmit
  submitButtonElement.addEventListener('click', handleSubmit);
  console.log('提交按钮的点击事件监听器已设置。');
} else {
  // 如果找不到按钮，这是一个关键错误，需要记录
  console.error('错误：无法找到提交按钮 "#submit-btn"，交互功能将无法使用！');
}

// --- 初始化代码 ---
// 页面加载完成后立即执行的代码

// 1. 初始化页面状态显示
updateStatusDisplay();
console.log('页面状态显示已初始化。');

// 2. 可以在这里执行其他初始化任务，例如从 localStorage 读取之前的得分等。
// try {
//   const savedScore = localStorage.getItem('userScore');
//   if (savedScore !== null) {
//     score = parseInt(savedScore, 10) || 0; // 读取并转换为数字，失败则为0
//     updateStatusDisplay();
//   }
// } catch (error) {
//   console.error('从 localStorage 读取分数时出错:', error);
// }

console.log('脚本初始化完成。');
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-control-regex": 0, // 禁止在正则表达式中使用控制字符
    "no-unused-vars": 1, // 不能有声明后未被使用的变量或参数
    'generator-star-spacing': 0, // 生成器函数*的前后空格
    "block-spacing": 0,
    "comma-dangle": 0, // 对象字面量项尾不能有逗号
    "no-console":1, // 禁止使用console
    "semi": 0, // 语句强制分号结尾
    "quotes": 0, // 引号类型 `` "" ''
    "space-before-function-paren": 0, // 函数定义时括号前面要不要有空格
  }
};

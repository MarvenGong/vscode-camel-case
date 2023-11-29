const vscode = require('vscode');
const { toCamelCase } = require('./utils/string-utils');
const fs = require('fs');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function(context) {
  console.log('恭喜，您的扩展“vscode-camel-case”已被激活！');
  // 注册命令
  context.subscriptions.push(vscode.commands.registerCommand('extension.toCamelCase', (context) => {
    console.log('开始转换');
    console.log(context);
    const { path } = context;
    const content = fs.readFileSync(path).toString();
    // 替换json对象的key中的下划线为大驼峰
    const str = content.replace(/(^[a-z].*_+.*:)/g, (p, m) => {
      const subline2ThoughLine = m.replaceAll('_', '-');
      // console.error(p)
      return `${toCamelCase(subline2ThoughLine, true)}:`;
    });
    // const str2 = str.replace(/^\.([[a-z][_]+)[a-zA-Z]$/g, (p, m) => {
    //   const subline2ThoughLine = m.replaceAll('_', '-');
    //   // console.error(p)
    //   return `.${toCamelCase(subline2ThoughLine, true)}`;
    // });
    // 替换对象属性读取中点后面的属性下划线为大驼峰
    console.info(str);
    fs.writeFileSync(path, str);
    // vscode.window.showInformationMessage(content);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('extension.toCamelSingle', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    const { selection, document } = editor;
    // console.log(toCamelCase(subline2ThoughLine, true));
    editor.edit((editBuilder) => {
      editor.selections.forEach((sel) => {
        const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
        const text = document.getText(range);
        const subline2ThoughLine = text.replaceAll('_', '-');
        editBuilder.replace(range, toCamelCase(subline2ThoughLine, true));
      });
    });
  }));
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
  console.log('您的扩展“vscode-camel-case”已被释放！');
};

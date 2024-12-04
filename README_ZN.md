# AML-2024-Fall-Website

此项目使用 [Create React App](https://github.com/facebook/create-react-app) 引导创建。

## 可用的脚本

在项目目录中，你可以运行：

### `yarn start`

在开发模式下运行应用程序。`<br />`
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

如果你进行编辑，页面将会重新加载。`<br />`
你还会在控制台中看到任何 lint 错误。

### `yarn test`

启动测试运行器，在交互监视模式下运行。`<br />`
参见关于 [运行测试](https://facebook.github.io/create-react-app/docs/running-tests) 的部分以了解更多信息。

### `yarn build`

为生产环境构建应用程序到 `build` 文件夹。`<br />`
它在生产模式下正确打包 React，并优化构建以获得最佳性能。

构建是缩小化的，文件名包括哈希值。`<br />`
你的应用程序已准备好部署！

参见关于 [部署](https://facebook.github.io/create-react-app/docs/deployment) 的部分以了解更多信息。

### `yarn eject`

**注意：这是一个单向操作。一旦你 `eject`，就不能回头了！**

如果你对构建工具和配置选择不满意，你可以随时 `eject`。该命令将从项目中移除单一构建依赖项。

相反，它会将所有配置文件和传递依赖项（如 webpack、Babel、ESLint 等）直接复制到你的项目中，因此你可以完全控制它们。除了 `eject` 之外的所有命令仍然有效，但它们将指向复制的脚本，因此你可以对其进行调整。这时候，你就是完全自己掌控了。

你并不需要使用 `eject`。为小型和中型部署准备的精选功能集是合适的，你也不应该觉得有义务使用此功能。然而，我们理解这个工具会更有用，如果你可以在你准备好时自定义它。

## 了解更多

你可以在 [Create React App 文档](https://facebook.github.io/create-react-app/docs/getting-started) 中了解更多信息。

要学习 React，请查阅 [React 文档](https://reactjs.org/)。

### 代码分割

此部分已移至此处: https://facebook.github.io/create-react-app/docs/code-splitting

### 分析包大小

此部分已移至此处: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### 制作渐进式 Web 应用

此部分已移至此处: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### 高级配置

此部分已移至此处: https://facebook.github.io/create-react-app/docs/advanced-configuration

### 部署

此部分已移至此处: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` 无法缩小化

此部分已移至此处: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## mp4 转换

```sh
ffmpeg -i input.mp4 \
       -c:v libx264 -b:v 186k -r 15.17 \
       -c:a aac -b:a 56k -ar 32000 -ac 1 \
       -vf "scale=1920:1080" \
       output.mp4
```

# VSCode

amVim

## 配置同步

使用 sync 插件同步配置
[**code-settings-sync**](https://github.com/shanalikhan/code-settings-sync)

## Steps To Get a Personal Access Token from GitHub

前往创建一个 gist
**选择 gist 选项**

**Go to [Settings](https://github.com/settings) / [Developer settings](https://github.com/settings/tokens) / [Personal access tokens](https://github.com/settings/tokens) / Generate New Token**

![Goto Settings / Developer settings / Personal Access Tokens](https://shanalikhan.github.io/img/github1.PNG)

![Select Scopes](https://shanalikhan.github.io/img/github2.PNG)
This extension requires a Personal Access Token from your GitHub account. You can create one by simply following the steps shown in the pictures below. Make sure you add **Gist** in scope.

---

Get an Access Token.
这个 Token 是关键 需要保存好
![Get Access Token](https://shanalikhan.github.io/img/github3.PNG)

## Upload Your Settings For the first time

**上传个人设置**

**Press Shift + Alt + U it will ask your GitHub account access token.**

> Type ">Sync" In Command Palette into order download / upload

This will automatically open your GitHub settings page, allowing you to generate a new token for the application, as explained in the previous section. This token will allow the extension to create gists.

Enter the GitHub token in the window and click enter.

![github account access token](https://shanalikhan.github.io/img/upload1.png)

---

上传了个人的设置后会得到 gistId 以后需要通过这个 id 去下载

**Upload your settings automatically and the extension gives you Gist ID in the system message.**
Gist ID is needed to access the data you have uploaded with your token. Copy this Gist ID in order to download the settings to other machines.

![uploaded automatically](https://shanalikhan.github.io/img/upload2.png)

You can always **verify created gist** on the following url:

> https://gist.github.com/{your_userName}/{gist_id}

Here is the gif of the complete process when you execute the Upload command (Might take some time to load)

![Upload](https://media.giphy.com/media/xT9IglKxSqs2Wdwq2c/source.gif)

## Download your Settings

**Press Shift + Alt + D it will ask your GitHub Gist ID.**

> Type ">Sync" In Command Palette into order download / upload

**Enter Your GitHub Token.**

Enter the GitHub token in the window and click enter.

![github account access token](https://shanalikhan.github.io/img/upload1.png)

**Enter Your Gist ID.**

You need to enter your Gist ID in order to download the files you have uploaded with Shift + Alt + U.

![Enter Your Gist ID](https://shanalikhan.github.io/img/download2.png)

**Settings Downloaded.**
You are Done! All your files are downloaded

![Enter Your Gist ID](https://shanalikhan.github.io/img/download3.png)

Here is the gif of the complete process when you execute the Download command (Might take time to load)

![Download](https://media.giphy.com/media/xT9Iglsi3CS9noE8tW/source.gif)

## Reset Token / Gist Settings

> Type ">Sync" In Command Palette and select Reset Token and Gist Settings

GitHub Gist: 102c28923e722af04b2ec1a66ed24141

---

## 设置终端

[如何将 VS Code 和 Cmder 整合](https://blog.csdn.net/leonhe27/article/details/81210000)
[【使用教程】CMDer，Window 下 CMD 的替代者](http://www.mamicode.com/info-detail-2180882.html)

默认 termail 改成 cmder

```
"terminal.integrated.env.windows": {"CMDER_ROOT": "[cmder_root]"},
"terminal.integrated.shellArgs.windows": ["/k", "[cmder_root]\\vendor\\init.bat"],
```

修改环境变量
变量名 CMDER_HOME
变量值 CMDER 解压包的绝对路径

PATH 里面添加%CMDER_HOME%

cmd 中执行 ： `Cmder.exe /REGISTER ALL`

---

alias 别名

```
set PATH=%ConEmuBaseDir%\Scripts;%PATH%
set LANG=zh_CN.UTF-8
ls=ls --show-control-chars -F
alias ll=ls -al --show-control-chars --color $*
alias gs=git status
alias gl=git log
alias ga=git add
alias gc=git commit
pwd=cd
clear=cls
```

## 这样就可以在 CMDER 中使用 gl 来代替 git log 等了

**解决中文乱码**
在设置中修改 startup-> Environment
set LANG=zh_CN.UTF-8 解决中文乱码问题

可以利用 Tab，自动路径补全(爽,赞！)；
可以利用 Ctrl+T 建立新页签；
利用 Ctrl+W 关闭页签;
还可以透过 Ctrl+Tab 切换页签;
Alt+F4：关闭所有页签
Alt+Shift+1：开启 cmd.exe
Alt+Shift+2：开启 powershell.exe
Alt+Shift+3：开启 powershell.exe (系统管理员权限)
Ctrl+1：快速切换到第 1 个页签
Ctrl+n：快速切换到第 n 个页签( n 值无上限)
Alt + enter： 切换到全屏状态；
Ctr+r 历史命令搜索;
End, Home, Ctrl : Traversing text with as usual on Windows

# vscode 识别提别的标准 如@，vue 开发中也很好用

[jsconfig](https://code.visualstudio.com/docs/languages/jsconfig)
根目录下产创建 `jsconfig.json`

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

# editorconfig 没有生效

这只为 `true`
editor.detectIndentation

# vscode 在编辑转中打开
https://www.barretlee.com/blog/2017/04/21/something-about-vsc/


[记一次vscode升级后，格式化Vue出现的问题](https://www.cnblogs.com/lggggg/p/7703818.html)

VSCode中使用vetur插件格式化vue文件时，stylus代码会自动加上大括号、冒号和分号
```js
// 以下为stylus配置
"stylusSupremacy.insertColons": false, // 是否插入冒号
"stylusSupremacy.insertSemicolons": false, // 是否插入分好
"stylusSupremacy.insertBraces": false, // 是否插入大括号
"stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
"stylusSupremacy.insertNewLineAroundBlocks": false // 两个选择器中是否换行
```


别人的一段vocode配置
```js
{ // VScode主题配置
    "editor.tabSize": 2,
    "editor.lineHeight": 24,
    "editor.renderLineHighlight": "none",
    "editor.renderWhitespace": "none",
    "editor.fontFamily": "Consolas",
    "editor.fontSize": 15,
    "editor.cursorBlinking": "smooth",
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.formatOnPaste": true,
    // 是否允许自定义的snippet片段提示,比如自定义的vue片段开启后就可以智能提示
    "editor.snippetSuggestions": "top",
    "workbench.iconTheme": "vscode-great-icons",
    "workbench.colorTheme": "One Dark Pro Vivid",
    "workbench.startupEditor": "newUntitledFile",
    "html.suggest.angular1": false,
    "html.suggest.ionic": false,
    "files.trimTrailingWhitespace": true,
    // vetur插件格式化使用beautify内置规则
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // VScode 文件搜索区域配置
    "search.exclude": {
        "**/dist": true,
        "**/build": true,
        "**/elehukouben": true,
        "**/.git": true,
        "**/.gitignore": true,
        "**/.svn": true,
        "**/.DS_Store": true,
        "**/.idea": true,
        "**/.vscode": false,
        "**/yarn.lock": true,
        "**/tmp": true
    },
    // 排除文件搜索区域，比如node_modules(贴心的默认设置已经屏蔽了)
    "files.exclude": {
        "**/.idea": true,
        "**/yarn.lock": true,
        "**/tmp": true
    },
    // 配置文件关联，以便启用对应的智能提示，比如wxss使用css
    "files.associations": {
        "*.vue": "vue",
        "*.wxss": "css"
    },
    // 配置emmet是否启用tab展开缩写
    "emmet.triggerExpansionOnTab": true,
    // 配置emmet对文件类型的支持，比如vue后缀文件按照html文件来进行emmet扩写
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html",
        "javascript": "javascriptreact",
        // xml类型文件默认都是单引号，开启对非单引号的emmet识别
        "xml": {
            "attr_quotes": "single"
        }
    },
    // 在react的jsx中添加对emmet的支持
    "emmet.includeLanguages": {
        "jsx-sublime-babel-tags": "javascriptreact"
    },
    // 是否开启eslint检测
    "eslint.enable": false,
    // 文件保存时，是否自动根据eslint进行格式化
    "eslint.autoFixOnSave": false,
    // eslint配置文件
    "eslint.options": {
        "plugins": [
            "html",
            "javascript",
            {
                "language": "vue",
                "autoFix": true
            },
            "vue"
        ]
    },
    // eslint能够识别的文件后缀类型
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue",
        "typescript",
        "typescriptreact"
    ],
    // 快捷键方案,使用sublime的一套快捷键
    "sublimeTextKeymap.promptV3Features": true,
    // 格式化快捷键 shirt+alt+F
    // prettier进行格式化时是否安装eslint配置去执行，建议false
    "prettier.eslintIntegration": true,
    // 如果为true，将使用单引号而不是双引号
    "prettier.singleQuote": true,
    // 细节,配置gitlen中git提交历史记录的信息显示情况
    "gitlens.advanced.messages": {
        "suppressCommitHasNoPreviousCommitWarning": false,
        "suppressCommitNotFoundWarning": false,
        "suppressFileNotUnderSourceControlWarning": false,
        "suppressGitVersionWarning": false,
        "suppressLineUncommittedWarning": false,
        "suppressNoRepositoryWarning": false,
        "suppressResultsExplorerNotice": false,
        "suppressUpdateNotice": true,
        "suppressWelcomeNotice": false
    },
    // 开启apicloud在vscode中的wifi真机同步
    "apicloud.port": "23450",
    // 设置apicloud在vscode中的wifi真机同步根目录
    "apicloud.subdirectories": "/apiclouduser",
    // git是否启用自动拉取
    "git.autofetch": true,
}


```
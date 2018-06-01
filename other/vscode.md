# VSCode

## 配置同步

使用 sync 插件同步配置
[**code-settings-sync**](https://github.com/shanalikhan/code-settings-sync)




## Steps To Get a Personal Access Token from GitHub
前往创建一个gist
**选择gist 选项**


**Go to [Settings](https://github.com/settings) / [Developer settings](https://github.com/settings/tokens) / [Personal access tokens](https://github.com/settings/tokens) / Generate New Token**


![Goto Settings / Developer settings / Personal Access Tokens](https://shanalikhan.github.io/img/github1.PNG)

![Select Scopes](https://shanalikhan.github.io/img/github2.PNG)
This extension requires a Personal Access Token from your GitHub account. You can create one by simply following the steps shown in the pictures below. Make sure you add **Gist** in scope.


------


Get an Access Token.
这个Token 是关键 需要保存好
![Get Access Token](https://shanalikhan.github.io/img/github3.PNG)



## Upload Your Settings For the first time
**上传个人设置**

**Press Shift + Alt + U it will ask your GitHub account access token.**

> Type ">Sync" In Command Palette into order download / upload

This will automatically open your GitHub settings page, allowing you to generate a new token for the application, as explained in the previous section. This token will allow the extension to create gists.

Enter the GitHub token in the window and click enter.

![github account access token](https://shanalikhan.github.io/img/upload1.png)



------

上传了个人的设置后会得到 gistId 以后需要通过这个id去下载

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

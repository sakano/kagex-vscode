# KAG/KAGEX for Visual Studio Code

日本語版のREADMEは[こちら](https://github.com/sakano/kagex-vscode/blob/master/README-ja.md)にあります。

Adds KAG/KAGEX language support for Visual Studio Code.

I recommend installing [tjs-vscode](https://marketplace.visualstudio.com/items?itemName=Biscrat.tjs-vscode) for syntax highlighting between "iscript" and "endscript".


# Features
- Syntax highlighting
- Ctags support
- Some snippets. Currently only for emb, if, ignore, iscript, macro
- The codes between ";#region" and ";#endregion" can be folded


# Optional: Ctags support
You must install ctags to use code navigation features such as "Go to Definition and "Peek definition". You can go to the definition of [macro] tags.
## Installation
1. Install ctags and put it in your system path. I recommend [Exuberant Ctags](http://ctags.sourceforge.net/).
2. Install [ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx) to Visual Studio Code.

## Update index file
1. Open the directory which contains ks files with Visual Studio Code.
2. Press Ctrl+Shift+P to open command palette.
3. Execute the command "KAGEX: Update Ctags File".

Now ".tags" file is created in your directory and you can use [ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx) features.

## Settings
### kagex.ctagsRunOnSave
If it is true, ctags index file is automatically recreated when ks file is saved. It is false by default.

### kagex.ctagsFilePath
Ctags index file name. It is ".tags" by default.

### kagex.ctagsRootpath
Relative path from the workspace where ctags search ks files. It is "" by default and all ks files in workspace are searched.
For example, if it is "src\\", only files in src directory are searched.

### kagex.ctagsFileExtensions
File extensions which are searched as ks file. By default, only ".ks" file is handled as ks file.

### kagex.ctagsExtraOption
Extra command-line options which are passed when ctags executed.


# Issues
Submit the [issues](https://github.com/sakano/kagex-vscode/issues) if you find any bug or have any suggestion.

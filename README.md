# KAG/KAGEX for Visual Studio Code

日本語版のREADMEは[こちら](https://github.com/sakano/kagex-vscode/blob/master/README-ja.md)にあります。

Adds KAG/KAGEX language support for Visual Studio Code.

I recommend installing [tjs-vscode](https://marketplace.visualstudio.com/items?itemName=Biscrat.tjs-vscode) for syntax highlighting between "iscript" and "endscript".


# Features
- Syntax highlighting
- Ctags support
- Some snippets. Currently only for emb, if, ignore, iscript, macro
- The codes between ";#region" and ";#endregion" can be folded
- The Reference search pallet to open API references


# Refrence search palette
You can open API references with your browser by following the steps
1. Push Ctrl+Shift+P to open the Command Pallet.
3. Execute the command "KAGEX: Open reference search palette".
3. Input tag name to open the reference.
"Ctrl+Shift+Alt+R" is default shortcut key to open reference search palette.

## Configuration
You can choose references to search by following configuration. By default, KAGEX reference reference is enabled.
```js
  "kagex.referencePalletEnable": {
    "kag3": false, // KAG3 reference
    "kagex": true, // KAGEX reference
  }
```


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

## Configuration
You can change ctags behavior by the following configuration.
```js
  "kagex.ctagsProcess": [
    {
      "tagFilePath": ".tags", // Path to Ctags' index file
      "searchPath": "", // Path to the directory where ctags search ks files
      "searchRecursive": true, // Whether search ks files recursively
      "runOnSave": false, // Whether recreate the index file automatically when ks file is saved
      "fileExtensions": [ // File extesions to be searched as ks file
        ".ks"
      ],
      "extraOption": "" // Command-line options which will be passed to ctags
    }
  ]
```
If you want to generate multiple index files, define multiple settings in kagex.ctagsProcess.

Below is the example to generate index files in src and out directory.
```js
  "kagex.ctagsProcess": [
    // Search ks files in src directory and generate "src/.tags"
    {
      "tagFilePath": "src/.tags",
      "searchPath": "src/",
      "searchRecursive": true,
      "runOnSave": true,
    },
    // Search ks files in out directory and generate "out/.tags"
    {
      "tagFilePath": "out/.tags",
      "searchPath": "out/",
      "searchRecursive": true,
      "runOnSave": true,
    }
  ]
```


# Issues
Submit the [issues](https://github.com/sakano/kagex-vscode/issues) if you find any bug or have any suggestion.

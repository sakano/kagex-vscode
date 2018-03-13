# KAG/KAGEX for Visual Studio Code

Visual Studio CodeにKAG/KAGEXファイル用の機能を追加します。

あわせて[tjs-vscode](https://marketplace.visualstudio.com/items?itemName=Biscrat.tjs-vscode)もインストールすると[iscript]と[endscript]の間もシンタックスハイライトが使えます。

# 機能
- シンタックスハイライト。
- Ctagsをサポート。
- emb, if, ignore, iscript, macroのスニペット。
- 「;#region」と「;#endregion」で囲まれた部分の折りたたみ。
- リファレンス検索パレットでAPIリファレンスを開けます。


# リファレンス検索パレット
次の手順でAPIリファレンスを開けます。
1. Ctrl+Shift+Pを押してコマンドパレットを開きます。
2. 「KAGEX: Open reference search palette」というコマンドを実行します。
3. リファレンスを開きたいクラス名を入力します。
デフォルトでは「Ctrl+Shift+Alt+R」がリファレンス検索パレットを開くキーボードショートカットです。

## 設定
次の設定で使用するリファレンスを変更できます。デフォルトではKAGEXリファレンスが使われます。
```js
  "kagex.referencePalletEnable": {
    "kag3": false, // KAG3リファレンス
    "kagex": true, // KAGEXリファレンス
  }
```


# Ctagsサポートについて
「定義へ移動」や「定義をここに表示」などの機能を使うにはCtagsをインストールする必要があります。[macro]タグの定義に飛べます。

## インストール手順
1. Ctagsをインストールしてパスが通った場所に配置します。[exuberant ctags 日本語対応版](http://hp.vector.co.jp/authors/VA025040/ctags/)を使うことをお勧めします。
2. Visual Studio Codeに[ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx)をインストールします。

## インデックスファイルの更新
1. ksファイルが入ったディレクトリをVisual Studio Codeで開きます。
2. 「Ctrl+Shift+P」を押してコマンドパレットを開きます
3. 「KAGEX: Update Ctags File」というコマンドを実行します。

以上で、「.tags」というファイルが開いたディレクトリに作成され[ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx)の機能を使えるようになります。

## 設定
次の設定でCtagsの動作を変更できます。
```js
  "kagex.ctagsProcess": [
    {
      "tagFilePath": ".tags", // Ctagsのインデックスファイルへのパス
      "searchPath": "", // Ctagsがksファイルを検索するディレクトリへのパス
      "searchRecursive": true, // ksファイルを再帰的に検索するか
      "runOnSave": false, // ksファイルが保存されたときに自動的にインデックスファイルを再生成するか
      "fileExtensions": [ // ksファイルとして検索されるファイル拡張子
        ".ks"
      ],
      "extraOption": "" // Ctagsに渡す追加のコマンドラインオプション
    }
  ]
```
複数のインデックスファイルを生成するにはkagex.ctagsProcessに複数設定してください。

次の設定はsrcディレクトリとoutディレクトリにインデックスファイルを生成する例です。
```js
  "kagex.ctagsProcess": [
    // srcディレクトリ内のksファイルを検索してsrc/.tagsを生成する
    {
      "tagFilePath": "src/.tags",
      "searchPath": "src/",
      "searchRecursive": true,
      "runOnSave": true,
    },
    // outディレクトリ内のksファイルを検索してout/.tagsを生成する
    {
      "tagFilePath": "out/.tags",
      "searchPath": "out/",
      "searchRecursive": true,
      "runOnSave": true,
    }
  ]
```


# 連絡先
バグや機能追加の提案などは[issues](https://github.com/sakano/kagex-vscode/issues)に連絡してください。

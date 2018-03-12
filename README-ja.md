# KAG/KAGEX for Visual Studio Code

Visual Studio CodeにKAG/KAGEXファイル用の機能を追加します。

あわせて[tjs-vscode](https://marketplace.visualstudio.com/items?itemName=Biscrat.tjs-vscode)もインストールすると[iscript]と[endscript]の間もシンタックスハイライトが使えます。

# 機能
- シンタックスハイライト。
- Ctagsをサポート。
- emb, if, ignore, iscript, macroのスニペット。
- 「;#region」と「;#endregion」で囲まれた部分の折りたたみ。


# Ctagsサポートについて
「定義へ移動」や「定義をここに表示」などの機能を使うにはCtagsをインストールする必要があります。[macro]タグの定義に飛べます。

## インストール手順
1. Ctagsをインストールしてパスが通った場所に配置します。[exuberant ctags 日本語対応版](http://hp.vector.co.jp/authors/VA025040/ctags/)を使うことをお勧めします。
2. Visual Studio Codeに[ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx)をインストールします。

## インデックスファイルの更新
1. ksファイルが入ったディレクトリをVisual Studio Codeで開きます。
2. 「Ctrl+Shift+P」を押してコマンドパレットを開きます
3. 「KAGEX: Update Ctags File」というコマンドを実行します。

以上で、「.tags」というファイルが開いたディレクトリに作成されctagsx[ctagsx](https://marketplace.visualstudio.com/items?itemName=jtanx.ctagsx)の機能を使えるようになります。

## 設定
### kagex.ctagsRunOnSave
trueならksファイルが保存されたときにインデックスファイルを自動的に再生成するようになります。デフォルトではfalseです。

### kagex.ctagsFilePath
インデックスファイルの名前です。デフォルトでは".tags"です

### kagex.ctagsRootpath
ctagsがksファイルを検索するディレクトリへの、ワークスペースからの相対パスです。デフォルトの""ではワークスペースの全てのksファイルが検索されます。
例えば、"src\\"と設定するとワークスペースのsrcディレクトリ以下のksファイルのみが検索されます。

### kagex.ctagsFileExtensions
ctagsのファイル検索時にksファイルとして認識される拡張子です。デフォルトでは拡張子が".ks"のファイルのみがksファイルとして扱われます。

### kagex.ctagsExtraOption
ctagsを実行するときに渡される追加のコマンドラインオプションです。


# 連絡先
バグや機能追加の提案などは[issues](https://github.com/sakano/kagex-vscode/issues)に連絡してください。

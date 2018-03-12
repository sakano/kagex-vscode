'use strict';
import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
const exec = require('child_process').exec;

class CTagsSupportProvider {
    private ctagsFilePath: string = ".tags";
    private ctagsRootPath: string = "";
    private ctagsExtraOption: string = "";
    private langmap: string = "";
    private runOnSave: boolean = false;

    public constructor() {
        this.loadConfiguration();
    }

    private loadConfiguration() {
        const config = vscode.workspace.getConfiguration("kagex");

        this.ctagsFilePath = config.get<string>("ctagsFilePath", ".tags");
        this.ctagsRootPath = config.get<string>("ctagsRootPath", "");
        this.ctagsExtraOption = config.get<string>("ctagsExtraOption", "");

        const ctagsFileExtensions = config.get<string[]>("ctagsFileExtensions", [".ks"]);
        this.langmap = ctagsFileExtensions.join("");

        this.runOnSave = config.get<boolean>("ctagsRunOnSave", false);
    }


    public updateCtags() {
        const rootPath = vscode.workspace.rootPath;
        if (rootPath === undefined) {
            vscode.window.showErrorMessage("No project currently opened");
            return;
        }

        if (this.ctagsFilePath === "") {
            vscode.window.showErrorMessage("kagex.ctagsFilePath is empty");
            return;
        }

        if (this.langmap.length === 0) {
            vscode.window.showErrorMessage("kagex.ctagsFileExtensions is empty");
            return;
        }

        exec("ctags" +
            " \"--langdef=kagex\"" +
            ` \"--langmap=kagex:${this.langmap}\"` +
            " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*([a-zA-Z0-9_]+)/\\1/m,macro/\"" +
            " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*\\\"(.+?)\\\"/\\1/m,macro/\"" +
            " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*'(.+?)'/\\1/m,macro/\"" +
            " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*([a-zA-Z0-9_]+)/\\1/m,macro/\"" +
            " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*\\\"(.+?)\\\"/\\1/m,macro/\"" +
            " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*'(.+?)'/\\1/m,macro/\"" +
            ` ${this.ctagsExtraOption} -f \"${rootPath}\\${this.ctagsFilePath}\" -R \"${rootPath}\\${this.ctagsRootPath}*\"`,
            (err: any, stdout: any, stderr: any) => {
                if (err !== null) {
                    vscode.window.showErrorMessage("ctags:" + err);
                }
            });
    }

    public onDidSaveTextDocument(document: vscode.TextDocument) {
        if (this.runOnSave && document.languageId === "kagex") {
            this.updateCtags();
        }
    }

    public onDidChangeConfiguration() {
        this.loadConfiguration();
    }
}

export function activate(ctx: ExtensionContext): void {
    const ctagsSupportProvider = new CTagsSupportProvider();
    ctx.subscriptions.push(vscode.commands.registerCommand("kagex.updateCtags", () => {
        ctagsSupportProvider.updateCtags();
    }));
    ctx.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => {
        ctagsSupportProvider.onDidSaveTextDocument(document);
    }));
    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
        ctagsSupportProvider.onDidChangeConfiguration();
    }));
}

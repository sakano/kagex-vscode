'use strict';
import * as vscode from 'vscode';
const exec = require('child_process').exec;

type CtagsProcess = {
    tagFilePath: string;
    searchPath: string;
    searchRecursive: boolean;
    runOnSave: boolean;
    fileExtensions: string[];
    extraOption: string;
    [index: string]: string | boolean | string[];
};

export class CTagsSupportProvider {
    private process: CtagsProcess[] = [];
    private readonly defaultProcess: CtagsProcess = {
        "tagFilePath": ".tags",
        "searchPath": "",
        "searchRecursive": true,
        "runOnSave": false,
        "fileExtensions": [
            ".ks"
        ],
        "extraOption": ""
    };
    private readonly processKeys: string[] = [];

    private readonly runOnSaveLanguages: string[] = [];

    public constructor() {
        for (const key in this.defaultProcess) {
            if (this.defaultProcess.hasOwnProperty(key)) {
                this.processKeys.push(key);
            }
        }
        this.loadConfiguration();
    }

    private loadConfiguration() {
        const toString = Object.prototype.toString;

        this.process = vscode.workspace.getConfiguration("kagex").ctagsProcess;
        if (this.process === undefined) {
            this.process = [this.defaultProcess];
        } else {
            this.process.forEach((p, index) => {
                this.processKeys.forEach(key => {
                    if (p[key] === undefined) {
                        p[key] = this.defaultProcess[key];
                    } else if (toString.call(p[key]) !== toString.call(this.defaultProcess[key])) {
                        vscode.window.showErrorMessage(`kagex.ctagsProcess[${index}].${key} has wrong value.`);
                        p[key] = this.defaultProcess[key];
                    }
                });
            });
        }

        const languages = vscode.workspace.getConfiguration("kagex").ctagsRunOnSaveLanguages;
        this.runOnSaveLanguages.length = 0;
        if (languages === undefined) {
            this.runOnSaveLanguages.push("kagex");
        } else if (toString.call(languages) !== toString.call(languages)) {
            vscode.window.showErrorMessage(`kagex.languages has wrong value.`);
            this.runOnSaveLanguages.push("kagex");
        } else {
            Array.prototype.push.apply(this.runOnSaveLanguages, languages);
        }
    }

    public updateCtags(save: boolean = false) {
        const rootPath = vscode.workspace.rootPath;
        if (rootPath === undefined) {
            if (!save) {
                vscode.window.showErrorMessage("No project currently opened");
            }
            return;
        }

        for (let index = 0; index < this.process.length; index++) {
            const p = this.process[index];
            if (save && !p.runOnSave) { continue; }
            if (p.tagFilePath === "") {
                vscode.window.showErrorMessage(`kagex.ctagsProcess[${index}].tagFilePath is empty.`);
                continue;
            }
            if (p.fileExtensions.length === 0) {
                vscode.window.showErrorMessage(`kagex.ctagsProcess[${index}].fileExtensions is empty.`);
                continue;
            }
            let langmap: string = p.fileExtensions.join("");
            let cmd: string = "ctags" +
                " --langdef=kagex" +
                ` --langmap=kagex:${langmap}` +
                " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*([a-zA-Z0-9_]+)/\\1/m,macro/\"" +
                " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*\\\"(.+?)\\\"/\\1/m,macro/\"" +
                " \"--regex-kagex=/^\\t*@[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*'(.+?)'/\\1/m,macro/\"" +
                " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*([a-zA-Z0-9_]+)/\\1/m,macro/\"" +
                " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*\\\"(.+?)\\\"/\\1/m,macro/\"" +
                " \"--regex-kagex=/\\[[ap]?macro[ \\t]+name[ \\t]*=[ \\t]*'(.+?)'/\\1/m,macro/\"" +
                ` ${p.extraOption} -f \"${rootPath}\\${p.tagFilePath}\" ${p.searchRecursive ? "-R" : ""} \"${rootPath}\\${p.searchPath}*\"`;
            exec(cmd,
                (err: any, stdout: any, stderr: any) => {
                    if (err !== null) {
                        vscode.window.showErrorMessage("ctags:" + err);
                    }
                });
        }
    }

    public onDidSaveTextDocument(document: vscode.TextDocument) {
        if (this.runOnSaveLanguages.indexOf(document.languageId) >= 0) {
            this.updateCtags(true);
        }
    }

    public onDidChangeConfiguration() {
        this.loadConfiguration();
    }
}

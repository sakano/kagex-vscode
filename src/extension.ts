'use strict';
import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { CTagsSupportProvider } from './ctags';

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

'use strict';
import { ExtensionContext } from 'vscode';
import * as vscode from 'vscode';
import { ReferenceProvider } from './reference';
import { CTagsSupportProvider } from './ctags';

export function activate(ctx: ExtensionContext): void {
    const referenceProvider = new ReferenceProvider();
    ctx.subscriptions.push(vscode.commands.registerCommand("kagex.showReferencePrompt", () => referenceProvider.showPrompt()));
    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => referenceProvider.onDidChangeConfiguration()));

    const ctagsSupportProvider = new CTagsSupportProvider();
    ctx.subscriptions.push(vscode.commands.registerCommand("kagex.updateCtags", () => ctagsSupportProvider.updateCtags()));
    ctx.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => ctagsSupportProvider.onDidSaveTextDocument(document)));
    ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => ctagsSupportProvider.onDidChangeConfiguration()));
}

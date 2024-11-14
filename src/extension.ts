import * as vscode from "vscode";

import { createStatusBarDateTimeItem } from "./status-bar-date-time";
import { createStatusBarCounterItem } from "./status-bar-counter";
import { addSupportForMermaid } from "./languages-mermaid";

/**
 * This method is called when your extension is activated. Your extension is activated the very first time the command
 * is executed.
 */
export function activate(context: vscode.ExtensionContext) {
  createStatusBarDateTimeItem(context);
  createStatusBarCounterItem(context);
  addSupportForMermaid(context);
}

/** This method is called when your extension is deactivated. */
export function deactivate() {
  vscode.window.showInformationMessage("I hope to see you again! o/");
}

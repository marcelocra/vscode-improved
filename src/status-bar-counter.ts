import * as vscode from "vscode";

/**
 * Create a display a status bar that shows the number of lines of the current file. If clicked, it will show a message
 * with more detailed statistics.
 */
export function createStatusBarCounterItem(context: vscode.ExtensionContext) {
  console.log("Creating status bar counter item...");

  const lineCountStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  context.subscriptions.push(lineCountStatusBarItem);

  const updateStatusBarWithCurrentLineCount = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const lineCount = editor.document.lineCount;
      lineCountStatusBarItem.text = `Lines: ${lineCount}`;
      lineCountStatusBarItem.show();
    } else {
      lineCountStatusBarItem.hide();
    }
  };

  // Register the command that will run when the status bar item is clicked
  lineCountStatusBarItem.command = "vscode-improved.statusBarCountClicked";
  const statusBarClickCommand = vscode.commands.registerCommand(
    "vscode-improved.statusBarCountClicked",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No active editor");
        return;
      }

      const document = editor.document;
      const text = document.getText();

      // Basic file info
      const fileName = document.fileName.split("/").pop() || "Unknown file";
      const numCharacters = text.length;
      const numWords = text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const totalLines = document.lineCount;

      // Detect comment syntax based on the language
      const languageId = document.languageId;
      let commentPattern = /^$/; // default regex for no comments

      if (
        ["javascript", "typescript", "java", "c", "cpp"].includes(languageId)
      ) {
        commentPattern = /^\s*\/\//; // matches // comments
      } else if (["python", "shellscript", "ruby"].includes(languageId)) {
        commentPattern = /^\s*#/; // matches # comments
      } else if (["html", "xml"].includes(languageId)) {
        commentPattern = /^\s*<!--/; // matches <!-- comments
      }

      // Count non-blank and non-comment lines if a comment pattern is defined
      let nonBlankAndNonCommentLines: number | null = null;
      if (commentPattern) {
        nonBlankAndNonCommentLines = 0;
        for (let i = 0; i < totalLines; i++) {
          const line = document.lineAt(i);
          if (!line.isEmptyOrWhitespace && !commentPattern.test(line.text)) {
            nonBlankAndNonCommentLines++;
          }
        }
      }

      // Display the statistics in a message
      vscode.window.showInformationMessage(
        `FILE: ${fileName}, CHARACTERS: ${numCharacters}, WORDS: ${numWords}, TOTAL LINES: ${totalLines}${nonBlankAndNonCommentLines !== null ? `, NON-BLANK/NON-COMMENT LINES: ${nonBlankAndNonCommentLines}` : ""}`
      );
    }
  );
  context.subscriptions.push(statusBarClickCommand);

  // Update when active editor changes or the document is modified.
  vscode.window.onDidChangeActiveTextEditor(
    updateStatusBarWithCurrentLineCount,
    null,
    context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
    updateStatusBarWithCurrentLineCount,
    null,
    context.subscriptions
  );

  // Run once, at activation.
  updateStatusBarWithCurrentLineCount();

  console.log("Status bar counter item created!");
}

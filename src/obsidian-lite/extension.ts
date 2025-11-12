import * as vscode from "vscode";
import * as path from "path";

interface FileItem extends vscode.QuickPickItem {
  uri: vscode.Uri;
  heading?: string;
}

export function activate(context: vscode.ExtensionContext) {
  // Trigger on [[ typed
  const typeHandler = vscode.workspace.onDidChangeTextDocument(
    async (event) => {
      console.log("hello");
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document !== event.document) return;
      if (editor.document.languageId !== "markdown") return;

      // Check if user just typed [[
      const change = event.contentChanges[0];
      if (!change || change.text !== "[") return;

      const position = change.range.start;
      const line = editor.document.lineAt(position.line);
      const textBeforeCursor = line.text.substring(0, position.character + 1);

      if (textBeforeCursor.endsWith("[[")) {
        // Delete the [[ and show the picker
        await editor.edit((editBuilder) => {
          editBuilder.delete(
            new vscode.Range(
              position.line,
              position.character - 1,
              position.line,
              position.character + 1
            )
          );
        });

        await vscode.commands.executeCommand(
          "markdown-link-creator.createLink"
        );
      }
    }
  );

  const disposable = vscode.commands.registerCommand(
    "markdown-link-creator.createLink",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      // Get cursor position for insertion
      const position = editor.selection.active;

      // Find all markdown files in workspace
      const files = await vscode.workspace.findFiles(
        "**/*.md",
        "**/node_modules/**"
      );
      const items: FileItem[] = [];

      // Add files and their headings
      for (const file of files) {
        const doc = await vscode.workspace.openTextDocument(file);
        const relativePath = vscode.workspace.asRelativePath(file);

        // Add the file itself
        items.push({
          label: path.basename(file.fsPath),
          description: relativePath,
          uri: file,
        });

        // Extract headings from the file
        const text = doc.getText();
        const headingRegex = /^(#{1,6})\s+(.+)$/gm;
        let match;

        while ((match = headingRegex.exec(text)) !== null) {
          const heading = match[2].trim();
          const headingSlug = heading
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

          items.push({
            label: `${match[1]} ${heading}`,
            description: `${relativePath}#${headingSlug}`,
            uri: file,
            heading: headingSlug,
          });
        }
      }

      // Show quick pick
      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: "Search for file or heading...",
        matchOnDescription: true,
      });

      if (!selected) return;

      // Build the link
      const currentFile = editor.document.uri;
      let linkPath = vscode.workspace.asRelativePath(selected.uri);

      // Make path relative to current file
      if (currentFile.scheme === "file" && selected.uri.scheme === "file") {
        const currentDir = path.dirname(currentFile.fsPath);
        const targetPath = selected.uri.fsPath;
        linkPath = path.relative(currentDir, targetPath).replace(/\\/g, "/");
      }

      // Add heading anchor if present
      if (selected.heading) {
        linkPath += `#${selected.heading}`;
      }

      // Insert the markdown link (Obsidian-style [[link]])
      const link = `[[${linkPath}]]`;
      await editor.edit((editBuilder) => {
        editBuilder.insert(position, link);
      });
    }
  );

  context.subscriptions.push(disposable, typeHandler);
}

export function deactivate() {}

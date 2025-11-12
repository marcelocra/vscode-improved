# Markdown Link Creator

Simple VS Code extension to create Obsidian-style wikilinks with fuzzy search for files and headings.

## Features

-   **Automatic trigger**: Type `[[` in any markdown file to open fuzzy search
-   **File search**: Search through all `.md` files in your workspace
-   **Heading search**: Browse headings within files (shown as `# Heading`, `## Subheading`, etc.)
-   **Relative paths**: Generates relative paths from the current file
-   **Wikilink format**: Creates `[[path/to/file.md#heading]]` links compatible with Obsidian and other markdown tools

## Usage

1. In a markdown file, type `[[`
2. The `[[` is automatically removed and fuzzy search opens
3. Type to search for files or headings (search works on both filename and full path)
4. Use arrow keys to navigate results
5. Press Enter to insert the wikilink at your cursor position

### Examples

-   Typing `[[` → searching "readme" → selecting "README.md" inserts: `[[README.md]]`
-   Typing `[[` → searching "install" → selecting "# Installation" from setup.md inserts: `[[setup.md#installation]]`

## Installation

### Development

1. Install dependencies: `npm install`
2. Compile: `npm run compile`
3. Press F5 to launch Extension Development Host
4. Open a markdown file and test by typing `[[`

### Package for installation

```bash
npm install -g @vscode/vsce
vsce package
```

Then install the `.vsix` file in VS Code via Extensions → Install from VSIX.

## Future Enhancements

-   **Full-text search**: Search for any text in workspace files and create line-based links like `[[file.md#L42]]`
-   **Block references**: Support for block-level linking with custom anchor IDs
-   **Preview on hover**: Show linked content on hover like Obsidian

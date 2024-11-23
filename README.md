# vscode-improved

I'm using this extension to learn about the VSCode Extensions API, so the set of functionalities implemented here might not make a lot of sense together.

This project was created using the [official getting started instructions][^1].

## Features

- Add VSCode Tokyo Night theme automatically.
- Show the number of lines of a file in the status bar.

## Known Issues

So far, none.

## Release Notes

### 0.5.0 - Add my own color theme

Created with help from [themer.dev](https://themer.dev/).

### 0.4.0 - Archive unused themes, organize used ones and add One Dark Pro

### 0.3.0 - Add One Dark Pro theme

### 0.2.0 - Add Andromeda theme

### 0.1.3 - Add more themes and change icon color (for light/dark support)

- Themes:
  - Atom One Dark
  - One Dark
  - Post-Apocalyptic
  - Post-Modern

### 0.1.2 - Change icon

### 0.1.1 - Load themes correctly

The themes were in the `./src` folder but need to be in the `./themes` folder. Because of that, they were not being loaded.

It was weird because they worked in the development host, but not after packed. That is likely because the `./src` folder doesn't exist in the package but the `./themes` is kept.

### 0.1.0 - Initial release.

- Fork [VSCode Tokyo Night](https://github.com/tokyo-night/tokyo-night-vscode-theme) theme.
- Show the number of lines of a file in the status bar.

---

**Enjoy!**

[^1]: https://code.visualstudio.com/api/get-started/your-first-extension

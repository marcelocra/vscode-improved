# vscode-improved

I'm using this extension to learn about the VSCode Extensions API, so the set of functionalities implemented here might not make a lot of sense together.

This project was created using the [official getting started instructions][^1].

## Features

- Add VSCode Tokyo Night theme automatically.
- Show the number of lines of a file in the status bar.

## Known Issues

So far, none.

## Release Notes

## [0.6.0] - 2025-03-27 15:57

### Added

- Night Owl theme

### 0.5.2 - [Spiral Tattoo Ink Dark Dim] Change error and warning colors

### 0.5.1 - [Spiral Tattoo Ink Dark Dim] Change colors

- comment not supported/allowed features
- add transparency
- remove underline in 'support'
- avoid using color #A600FF in bg, as it doesn't give good contrast
- change git decoration colors
- many more, see diff

### 0.5.0 - Add my own color theme, Spiral Tattoo Ink Dark Dim

Created initially with [themer.dev](https://themer.dev/), changing some elements later.

This might not be the final version yet, as I plan to use it and test it more.

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

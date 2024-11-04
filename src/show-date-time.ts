import * as vscode from "vscode";

/**
 * Create a status bar item that shows the current date and time in a custom, short, format. If clicked, it will show a
 * message with the full date and time using the user's locale.
 */
export function createStatusBarDateTimeItem(context: vscode.ExtensionContext) {
  const dateTimeStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  context.subscriptions.push(dateTimeStatusBarItem);

  // Register the command that will run when the status bar item is clicked.
  dateTimeStatusBarItem.command = "vscode-improved.showDateTimeNow";
  const dateTimeStatusBarCommand = vscode.commands.registerCommand(
    "vscode-improved.showDateTimeNow",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        new Date().toLocaleString(vscode.env.language, {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "shortOffset",
          weekday: "short",
        })
      );
    }
  );
  context.subscriptions.push(dateTimeStatusBarCommand);

  // Function to format date and time as '23nov24 12h38'.
  const formatDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("en", { month: "short" }).toLowerCase();
    const year = String(now.getFullYear()).slice(2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day}${month}${year} ${hours}h${minutes}`;
  };

  // Update the status bar item with the current date and time
  const updateDateTime = () => {
    dateTimeStatusBarItem.text = formatDateTime();
    dateTimeStatusBarItem.show();
  };

  // Set an interval to update the date and time every minute
  updateDateTime(); // Initial call
  const interval = setInterval(updateDateTime, 60000); // Update every minute

  context.subscriptions.push({ dispose: () => clearInterval(interval) }); // Clear interval on deactivate
}

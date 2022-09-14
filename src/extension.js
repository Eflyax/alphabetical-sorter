const
	vscode = require('vscode'),
	sortLines = require('./sorter');

function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.sortIt', () => {
		let
			editor = vscode.window.activeTextEditor,
			lines = [],
			selectionLength;

		const
			selection = editor.selection;
			startPoint = selection.start.line,
			endPoint = selection.end.line,
			isSingleLine = selection.isSingleLine;

		if (isSingleLine) {
			selectionLength = editor.document.getText(selection).length;
			lines = editor.document
				.getText(selection)
				.replace(/\s/g, '')
				.split(',');
		} else {
			selectionLength = editor.document.lineAt(endPoint).text.length;

			for (let i = startPoint; i <= endPoint; i++) {
				lines.push(editor.document.lineAt(i).text);
			}
		}

		lines = sortLines(lines);

		editor.edit(editBuilder => {
			isSingleLine
				? editBuilder.replace(selection, lines.join(', '))
				: editBuilder.replace(
						new vscode.Range(startPoint, 0, endPoint, selectionLength),
						lines.join('\n')
					);
		});
	}
);

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {};

exports.deactivate = deactivate;

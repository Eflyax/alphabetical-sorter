const superSort = function (lineA, lineB) {
	lineA = lineA.toString().toLowerCase();
	lineB = lineB.toString().toLowerCase();

	for (
		var index = 0, maxLength = Math.max(lineA.length, lineB.length);
		index < maxLength && lineA.charAt(index) === lineB.charAt(index);
		++index
	);

	if (index === maxLength) {
		return 0;
	}

	const
		charOne = lineA.charAt(index),
		charTwo = lineB.charAt(index);

	if (charOne === '{') {
		return -1;
	}
	else if (charOne === '-') {
		return 1;
	}
	else if (charTwo === '{') {
		return 1;
	}
	else if (charOne < charTwo) {
		return -1;
	}
	else {
		return 1;
	}
};

function sortLines(lines) {
	const
		indexesToDelete = [],
		importTypes = lines.filter(line => {
			return line.includes('type {')
		});

	importTypes.sort(superSort);

	lines = lines.filter(line => !line.includes('type {'));

	for (let index = 0; index <= lines.length; index++) {
		let line = lines[index];

		if (line === 'import {') {
			let
				indexInherit = 0,
				lineInherit = '';

			while (lineInherit !== undefined && !lineInherit.includes('} from')) {
				lineInherit = lines[index + indexInherit];
				lines[index] = lines[index] + lineInherit + ' ';
				indexInherit++;

				if (!lines[index + indexInherit].includes('import {')) {
					indexesToDelete.push(index + indexInherit);
				}
			}
		}

		if (lines[index]) {
			lines[index] = lines[index].replace(', } ', '} ');
			lines[index] = lines[index].replace('import {import { ', 'import {');
			lines[index] = lines[index].replace(' } from', '} from');
		}

		indexesToDelete.forEach(indexToDelete => {
			delete lines[indexToDelete];
		});

		if (line && line.includes('import {')) {
			const
				rawImportedModules = line.match(/\{(.*)\}/);

			if (rawImportedModules && rawImportedModules[1]) {
				let importedModules = rawImportedModules[1].split(', ');

				if (importedModules.length > 1) {
					importedModules = importedModules.sort(superSort).join(', ');
					lines[index] = lines[index].replace(rawImportedModules[1], importedModules);
				}
			}
		}
	}

	lines.sort(superSort);

	lines = lines.concat(importTypes);

	return lines.filter(line => {
		return line;
	});
}

module.exports = sortLines;

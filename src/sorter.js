const superSort = function (lineA, lineB) {
	lineA = lineA.toString();
	lineB = lineB.toString();

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
		charTwo = lineB.charAt(index),
		charOneLowerCase = charOne.toLowerCase(),
		charTwoLowerCase = charTwo.toLowerCase();

	function checkExceptions(valueA, valueB) {
		if (valueA === '-') {
			return 1;
		}

		if (valueB === '{') {
			return 1;
		}

		return -1;
	}

	if (charOneLowerCase < charTwoLowerCase) {
		return checkExceptions(charOneLowerCase, charTwoLowerCase);
	}
	else if (charOneLowerCase > charTwoLowerCase) {
		return 1;
	}
	else {
		if (charOne < charTwo) {
			return -1;
		}
		else if (charOne > charTwo) {
			return 1;
		}
		else {
			return 0;
		}
	}
};

function sortLines(lines) {
	const indexesToDelete = [];

	for (let index = 0; index <= lines.length; index++) {
		let line = lines[index];

		if (line === 'import {') {
			let
				indexInherit = 0,
				lineInherit = '';

			while (lineInherit !== undefined && !lineInherit.includes('}')) {
				lineInherit = lines[index + indexInherit];
				lines[index] = lines[index] + lineInherit + ' ';
				indexInherit++;
				indexesToDelete.push(index + indexInherit);
			}
		}

		if (lines[index]) {
			lines[index] = lines[index].replace(', } ', '} ');
			lines[index] = lines[index].replace('import {import { ', 'import {');
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

	return lines.filter(line => {
		return line;
	});
}

module.exports = sortLines;

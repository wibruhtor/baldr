import { colord, type HsvaColor, type RgbaColor } from "colord";

export const numberToRgba = (color: number): RgbaColor => {
	const r = (color >> 24) & 0xff;
	const g = (color >> 16) & 0xff;
	const b = (color >> 8) & 0xff;
	const a = (color & 0xff) / 0xff;
	return { r,g,b,a };
};

export const numberToHex = (color: number): string => {
	const rgba = numberToRgba(color);
	return colord(rgba).toHex();
};

export const numberToHsv = (color: number): HsvaColor => {
	const rgba = numberToRgba(color);
	return colord(rgba).toHsv()
};

export const hexToNumber = (color: string): number => {
	const rgba = hexToRgba(color);
	return rgbaToNumber(rgba);
};

export const hexToRgba = (color: string): RgbaColor => {
	const colorWithoutHash = color.replaceAll('#', '');

	if (colorWithoutHash.length === 3) {
		const r = Number.parseInt(colorWithoutHash[0] + colorWithoutHash[0], 16);
		const g = Number.parseInt(colorWithoutHash[1] + colorWithoutHash[1], 16);
		const b = Number.parseInt(colorWithoutHash[2] + colorWithoutHash[2], 16);
		return { r, g, b, a: 1 };
	} else if (colorWithoutHash.length === 4) {
		const r = Number.parseInt(colorWithoutHash[0] + colorWithoutHash[0], 16);
		const g = Number.parseInt(colorWithoutHash[1] + colorWithoutHash[1], 16);
		const b = Number.parseInt(colorWithoutHash[2] + colorWithoutHash[2], 16);
		const a = Number.parseInt(colorWithoutHash[3] + colorWithoutHash[3], 16) / 0xff;
		return { r, g, b, a };
	} else if (colorWithoutHash.length === 6) {
		const r = Number.parseInt(colorWithoutHash.substring(0, 2), 16);
		const g = Number.parseInt(colorWithoutHash.substring(2, 4), 16);
		const b = Number.parseInt(colorWithoutHash.substring(4, 6), 16);
		return { r, g, b, a: 1 };
	} else if (colorWithoutHash.length === 8) {
		const r = Number.parseInt(colorWithoutHash.substring(0, 2), 16);
		const g = Number.parseInt(colorWithoutHash.substring(2, 4), 16);
		const b = Number.parseInt(colorWithoutHash.substring(4, 6), 16);
		const a = Number.parseInt(colorWithoutHash.substring(6, 8), 16) / 0xff;
		return { r, g, b, a };
	}
	return { r: 0, g: 0, b: 0, a: 1 };
};


export const rgbaToNumber = (color: RgbaColor): number => {
	const r = (color.r & 0xff).toString(16).padStart(2, '0');
	const g = (color.g & 0xff).toString(16).padStart(2, '0');
	const b = (color.b & 0xff).toString(16).padStart(2, '0');
	const a = ((color.a * 0xff) & 0xff).toString(16).padStart(2, '0');
	return Number.parseInt(r + g + b + a, 16);
};

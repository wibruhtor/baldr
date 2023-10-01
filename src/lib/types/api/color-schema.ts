import { z } from 'zod';

export const ColorSchema = z
	.number()
	.min(0, 'Минимальное значение #00000000')
	.max(4294967295, 'Максимальное значение #FFFFFFFF');

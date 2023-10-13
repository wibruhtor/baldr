import { z } from 'zod';

export const CreateBanWordFilterRequestSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
});

export type CreateBanWordFilterRequest = z.infer<typeof CreateBanWordFilterRequestSchema>;

export const BanWordSchema = z
	.string()
	.min(1, { message: 'Минимальная длина 1 символ' })
	.max(32, { message: 'Максимальная длина 32 символа' });

export const UpdateBanWordFilterRequestSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
	banWords: z.array(BanWordSchema),
});

export type UpdateBanWordFilterRequest = z.infer<typeof UpdateBanWordFilterRequestSchema>;

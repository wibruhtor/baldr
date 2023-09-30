import { ColorSchema } from '$lib/types/api/color-schema';
import { NicknameSchema } from '$lib/types/api/nickname-schema';
import { z } from 'zod';

const ChatTypeSchema = z.enum(['default', 'block']);

export const CreateChatSettingsRequestSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
	chatType: ChatTypeSchema,
});

export type CreateChatSettingsRequest = z.infer<typeof CreateChatSettingsRequestSchema>;

export const UpdateChatSettingsRequestSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Минимальная длина 2 символа' })
		.max(32, { message: 'Максимальная длина 32 символа' }),
	chatType: ChatTypeSchema,
	color: z.object({
		backgroundColor: ColorSchema,
		gradientOnlyForCustomNicknames: z.boolean(),
		customNicknames: z.array(
			z.object({
				nickname: NicknameSchema,
				startColor: ColorSchema,
				endColor: ColorSchema,
			}),
		),
	}),
	size: z.object({
		marginTop: z.number().min(0, 'Минимальное значение 0'),
		marginRight: z.number().min(0, 'Минимальное значение 0'),
		marginBottom: z.number().min(0, 'Минимальное значение 0'),
		marginLeft: z.number().min(0, 'Минимальное значение 0'),
		paddingTop: z.number().min(0, 'Минимальное значение 0'),
		paddingRight: z.number().min(0, 'Минимальное значение 0'),
		paddingBottom: z.number().min(0, 'Минимальное значение 0'),
		paddingLeft: z.number().min(0, 'Минимальное значение 0'),
		borderTopLeftRadius: z.number().min(0, 'Минимальное значение 0'),
		borderTopRightRadius: z.number().min(0, 'Минимальное значение 0'),
		borderBottomLeftRadius: z.number().min(0, 'Минимальное значение 0'),
		borderBottomRightRadius: z.number().min(0, 'Минимальное значение 0'),
		maxMessages: z.number().min(5, 'Минимальное значение 5').max(100, 'Максимальное значение 100'),
	}),
	hide: z.object({
		hideMessagePattern: z.string(),
		hidePointsRewards: z.string(),
		hideLinks: z.boolean(),
		linkReplacement: z.string(),
		banWordReplacement: z.string(),
		nicknames: z.array(NicknameSchema),
		banWordFilterId: z.string().nullable(),
	}),
	font: z.object({
		fontFamily: z.string(),
		nicknameFontWeight: z
			.number()
			.min(0, 'Минимальное значение 0')
			.max(1000, 'Максимальное значение 1000'),
		textFontWeight: z
			.number()
			.min(0, 'Минимальное значение 0')
			.max(1000, 'Максимальное значение 1000'),
		fontSize: z.number().min(0, 'Минимальное значение 0'),
	}),
});

export type UpdateChatSettingsRequest = z.infer<typeof UpdateChatSettingsRequestSchema>;

import { z } from "zod";

export const NicknameSchema = z
.string()
.min(4, 'Минимальная длина 4 символа')
.max(25, 'Максимальная длина 25 символов')
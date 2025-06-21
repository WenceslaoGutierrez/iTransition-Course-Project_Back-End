import { z, ZodTypeAny } from 'zod';

const mainTemplateSchema = z.object({
  title: z.string({ required_error: 'validation.title_required' }).min(1, 'validation.title_min_length'),
  description: z.string().optional(),
  imageUrl: z.string().url({ message: 'validation.invalid_url' }).optional().or(z.literal('')),
  isPublic: z.boolean({ required_error: 'validation.isPublic_required' }),
  topicId: z.number({ required_error: 'validation.topicId_required' }).int(),
  tags: z.array(z.string().min(1, 'validation.tag_not_empty')).optional()
});

const questionTypes = ['string', 'text', 'integer', 'checkbox'] as const;
const questionFields: { [key: string]: ZodTypeAny } = {};

questionTypes.forEach((type) => {
  for (let i = 1; i <= 4; i++) {
    const baseKey = `${type}Q${i}`;
    questionFields[`${baseKey}Active`] = z.boolean().optional();
    questionFields[`${baseKey}Title`] = z.string().optional();
    questionFields[`${baseKey}Description`] = z.string().optional();
    questionFields[`${baseKey}ShowInResults`] = z.boolean().optional();
  }
});

export const createTemplateSchema = z.object({
  body: mainTemplateSchema.merge(z.object(questionFields))
});

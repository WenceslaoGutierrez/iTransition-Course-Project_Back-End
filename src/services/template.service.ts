import { PrismaClient, Prisma, Template, Tag } from '../generated/prisma';

const prisma = new PrismaClient();

const createCoreTemplate = async (transaction: Prisma.TransactionClient, templateData: any, authorId: number): Promise<Template> => {
  return transaction.template.create({ data: { ...templateData, authorId: authorId } });
};

const findOrCreateTags = async (transaction: Prisma.TransactionClient, tagNames: string[]): Promise<Tag[]> => {
  const upsertOperations = tagNames.map((name) => transaction.tag.upsert({ where: { name }, update: {}, create: { name } }));
  return Promise.all(upsertOperations);
};

const linkTagsToTemplate = async (transaction: Prisma.TransactionClient, templateId: number, tags: Tag[]) => {
  const templateTagData = tags.map((tag) => ({ templateId: templateId, tagId: tag.id }));
  await transaction.templateTag.createMany({ data: templateTagData });
};

export const createTemplate = async (templateData: any, authorId: number) => {
  const { tags, ...coreData } = templateData;
  return prisma.$transaction(async (transaction) => {
    const newTemplate = await createCoreTemplate(transaction, coreData, authorId);
    if (tags && tags.length > 0) {
      const tagObjects = await findOrCreateTags(transaction, tags);
      await linkTagsToTemplate(transaction, newTemplate.id, tagObjects);
    }
    return newTemplate;
  });
};

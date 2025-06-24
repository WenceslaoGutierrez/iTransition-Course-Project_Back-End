import { PrismaClient, Prisma, Template, Tag, User } from '../generated/prisma';

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

export const getTemplatesByAuthor = async (authorId: number) => {
  return prisma.template.findMany({
    where: { authorId: authorId },
    include: {
      topic: { select: { name: true } },
      _count: { select: { forms: true, likes: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

const isTemplatePublic = (template: Template): boolean => {
  return template.isPublic;
};

const isUserAdmin = (user: Omit<User, 'password'>): boolean => {
  return user.role === 'ADMIN';
};

const isUserTheAuthor = (template: Template, user: Omit<User, 'password'>): boolean => {
  return template.authorId === user.id;
};

const hasRestrictedAccess = async (templateId: number, userId: number): Promise<boolean> => {
  const accessRecord = await prisma.templateAccess.findUnique({
    where: {
      templateId_userId: { templateId, userId }
    }
  });
  return !!accessRecord;
};

const checkUserPermission = async (template: Template, user: Omit<User, 'password'>): Promise<boolean> => {
  return isUserAdmin(user) || isUserTheAuthor(template, user) || (await hasRestrictedAccess(template.id, user.id));
};

const getFullTemplateDetails = (templateId: number) => {
  return prisma.template.findUnique({
    where: { id: templateId },
    include: {
      author: { select: { id: true, firstName: true, lastName: true } },
      topic: true,
      tags: { include: { tag: true } }
    }
  });
};

export const findTemplateByIdForUser = async (templateId: number, currentUser?: Omit<User, 'password'>) => {
  const template = await getFullTemplateDetails(templateId);
  if (!template) return null;
  if (isTemplatePublic(template)) return template;
  if (!currentUser) return null;
  const hasPermission = await checkUserPermission(template, currentUser);
  return hasPermission ? template : null;
};

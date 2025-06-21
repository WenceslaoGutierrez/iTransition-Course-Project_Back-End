-- CreateTable
CREATE TABLE "Template" (
    "id" SMALLSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "display_order" TEXT,
    "author_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "string_q1_active" BOOLEAN NOT NULL DEFAULT false,
    "string_q1_title" VARCHAR(255),
    "string_q1_description" TEXT,
    "string_q1_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "string_q2_active" BOOLEAN NOT NULL DEFAULT false,
    "string_q2_title" VARCHAR(255),
    "string_q2_description" TEXT,
    "string_q2_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "string_q3_active" BOOLEAN NOT NULL DEFAULT false,
    "string_q3_title" VARCHAR(255),
    "string_q3_description" TEXT,
    "string_q3_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "string_q4_active" BOOLEAN NOT NULL DEFAULT false,
    "string_q4_title" VARCHAR(255),
    "string_q4_description" TEXT,
    "string_q4_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "text_q1_active" BOOLEAN NOT NULL DEFAULT false,
    "text_q1_title" VARCHAR(255),
    "text_q1_description" TEXT,
    "text_q1_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "text_q2_active" BOOLEAN NOT NULL DEFAULT false,
    "text_q2_title" VARCHAR(255),
    "text_q2_description" TEXT,
    "text_q2_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "text_q3_active" BOOLEAN NOT NULL DEFAULT false,
    "text_q3_title" VARCHAR(255),
    "text_q3_description" TEXT,
    "text_q3_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "text_q4_active" BOOLEAN NOT NULL DEFAULT false,
    "text_q4_title" VARCHAR(255),
    "text_q4_description" TEXT,
    "text_q4_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "integer_q1_active" BOOLEAN NOT NULL DEFAULT false,
    "integer_q1_title" VARCHAR(255),
    "integer_q1_description" TEXT,
    "integer_q1_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "integer_q2_active" BOOLEAN NOT NULL DEFAULT false,
    "integer_q2_title" VARCHAR(255),
    "integer_q2_description" TEXT,
    "integer_q2_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "integer_q3_active" BOOLEAN NOT NULL DEFAULT false,
    "integer_q3_title" VARCHAR(255),
    "integer_q3_description" TEXT,
    "integer_q3_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "integer_q4_active" BOOLEAN NOT NULL DEFAULT false,
    "integer_q4_title" VARCHAR(255),
    "integer_q4_description" TEXT,
    "integer_q4_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q1_active" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q1_title" VARCHAR(255),
    "checkbox_q1_description" TEXT,
    "checkbox_q1_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q2_active" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q2_title" VARCHAR(255),
    "checkbox_q2_description" TEXT,
    "checkbox_q2_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q3_active" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q3_title" VARCHAR(255),
    "checkbox_q3_description" TEXT,
    "checkbox_q3_show_in_results" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q4_active" BOOLEAN NOT NULL DEFAULT false,
    "checkbox_q4_title" VARCHAR(255),
    "checkbox_q4_description" TEXT,
    "checkbox_q4_show_in_results" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateTag" (
    "templateId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TemplateTag_pkey" PRIMARY KEY ("templateId","tagId")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" SMALLSERIAL NOT NULL,
    "userId" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "template_id" INTEGER NOT NULL,
    "string_a1" VARCHAR(255),
    "string_a2" VARCHAR(255),
    "string_a3" VARCHAR(255),
    "string_a4" VARCHAR(255),
    "text_a1" TEXT,
    "text_a2" TEXT,
    "text_a3" TEXT,
    "text_a4" TEXT,
    "integer_a1" INTEGER,
    "integer_a2" INTEGER,
    "integer_a3" INTEGER,
    "integer_a4" INTEGER,
    "checkbox_a1" BOOLEAN,
    "checkbox_a2" BOOLEAN,
    "checkbox_a3" BOOLEAN,
    "checkbox_a4" BOOLEAN,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SMALLSERIAL NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "user_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("user_id","template_id")
);

-- CreateTable
CREATE TABLE "TemplateAccess" (
    "template_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TemplateAccess_pkey" PRIMARY KEY ("template_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateAccess" ADD CONSTRAINT "TemplateAccess_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateAccess" ADD CONSTRAINT "TemplateAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('RESERVED', 'AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('APPROVED', 'CANCELED', 'AWAITING_PAYMENT');

-- CreateEnum
CREATE TYPE "PersonStatus" AS ENUM ('ACTIVE', 'BLOCKED');

-- CreateTable
CREATE TABLE "Person" (
    "Id" TEXT NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "status" "PersonStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Person_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "Id" TEXT NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "description" VARCHAR(255),
    "price" REAL NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "Id" TEXT NOT NULL,
    "e2e" VARCHAR(255),
    "status" JSONB NOT NULL,
    "ticketId" TEXT NOT NULL,
    "currentStatus" "TransactionStatus" NOT NULL DEFAULT 'AWAITING_PAYMENT',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_key" ON "Ticket"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_e2e_key" ON "Transaction"("e2e");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_ticketId_key" ON "Transaction"("ticketId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

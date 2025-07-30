import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        // Delete in correct order to avoid foreign key constraint errors
        await db.delete(schema.challengeProgress);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.userProgress);
        await db.delete(schema.courses);
        await db.delete(schema.UserSubscription);

        // Insert courses
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Educație financiară", 
                imageSrc: "/financial-literacy.png",
            },
            {
                id: 2,
                title: "Educație antreprenorială",
                imageSrc: "/cooperation.png",
            },
            {
                id: 3,
                title: "Economie pentru drept", 
                imageSrc: "/trade.png",
            },
            {
                id: 4,
                title: "Economie pentru Bac", 
                imageSrc: "/economic.png",
            },
        ]);

        // Insert units
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unitatea 1",
                description: "Învață noțiunile fundamentale despre bani, bănci şi economie",
                imageSrc: "/unitate1.jpg",
                order: 1,
            }
        ]);
        
        // Insert lessons
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Banii"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Banca"
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Investiții"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Economii"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Bugete"
            },
        ]);

        // Insert challenges
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                question: 'Care dintre acestea reprezintă banii fizici?',
                order: 1,
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                question: 'Selectează forma de plată digitală',
                order: 2,
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                question: 'Care este cea mai sigură metodă de păstrare a banilor?',
                order: 3,
            }
        ]);

        // Insert challenge options for challenge 1
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/money-cash.png",
                correct: true,
                text: "Bani cash",
                audioSrc: "/audio/cash.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/credit-card.png",
                correct: false,
                text: "Card de credit",
                audioSrc: "/audio/card.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/digital-wallet.png",
                correct: false,
                text: "Portofel digital",
                audioSrc: "/audio/digital.mp3",
            },
        ]);

        // Insert challenge options for challenge 2
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: false,
                text: "Bani cash",
                audioSrc: "/audio/cash.mp3",
            },
            {
                challengeId: 2,
                correct: true,
                text: "Transfer bancar",
                audioSrc: "/audio/transfer.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "Monede",
                audioSrc: "/audio/coins.mp3",
            },
        ]);

        // Insert challenge options for challenge 3
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/piggy-bank.png",
                correct: false,
                text: "Pușculiță",
                audioSrc: "/audio/piggy.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/bank-account.png",
                correct: true,
                text: "Cont bancar",
                audioSrc: "/audio/bank.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/bed.png",
                correct: false,
                text: "Sub saltea",
                audioSrc: "/audio/mattress.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                question: 'Care dintre acestea reprezintă banii fizici?',
                order: 1,
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                question: 'Selectează forma de plată digitală',
                order: 2,
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                question: 'Care este cea mai sigură metodă de păstrare a banilor?',
                order: 3,
            }
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();
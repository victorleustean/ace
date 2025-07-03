import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import Image from "next/image";

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
                title: "Banca"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Banca"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Banca"
            },
        ]);

        // Insert challenges
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                question: "Alege corect!",
                order: 1,
            }
        ]);

        // Insert challenge options
        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "el hombre",
                audioSrc: "/es_man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "el robot",
                audioSrc: "/es_robot.mp3",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();
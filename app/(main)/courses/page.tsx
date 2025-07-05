import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
    const { userId } = await auth();
    
    // If not authenticated, redirect to home
    if (!userId) {
        redirect("/");
    }

    console.log("CoursesPage - userId:", userId);

    try {
        const coursesData = getCourses();
        const userProgressData = getUserProgress(userId);

        const [courses, userProgress] = await Promise.all([
            coursesData,
            userProgressData,
        ]);

        console.log("Courses loaded:", courses.length, "User progress:", !!userProgress);

        return (
            <div className="h-full max-w-[912px] px-3 mx-auto">
                <h1 className="text-2xl font-bold text-grey-700">
                    Cursurile FinHub
                </h1>
                <List 
                    courses={courses}
                    activeCourseId={userProgress?.activeCourseId}
                />
            </div>
        );
    } catch (error) {
        console.error("Error loading courses page:", error);
        return (
            <div className="h-full max-w-[912px] px-3 mx-auto">
                <h1 className="text-2xl font-bold text-neutral-700">
                    Eroare la încărcarea cursurilor
                </h1>
                <p>Te rugăm să încerci din nou.</p>
            </div>
        );
    }
};

export default CoursesPage;
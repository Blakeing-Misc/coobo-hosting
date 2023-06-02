import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import courses from "./data.json";

interface Course {
  id: string;
  title: string;
  description: string;
  link: string;
  level: string;
}

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
  const { title, description, level, link } = await request.json();

  const newCourse: Course = {
    id: uuidv4(),
    title,
    description,
    level,
    link,
  };

  courses.push(newCourse);

  return NextResponse.json(courses);
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import Courses from "@/components/clients";
// import CourseSearch from './componets/CourseSearch';

const HomePage = async () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setCourses(data);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <h1>Welcome To Traversy Meida</h1>
      {/* <CourseSearch getSearchResults={(results) => setCourses(results)} /> */}
      <Courses courses={courses} />
    </>
  );
};
export default HomePage;

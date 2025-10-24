import React from "react";
import { useNavigate } from "react-router-dom";
import BlogAdmin from "../components/BlogAdmin";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: "5rem", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <BlogAdmin />
    </div>
  );
}

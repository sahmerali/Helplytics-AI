import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Avatar } from "../../components/ui/Avatar";
import { Modal } from "../../components/ui/Modal";

export default function Projects() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "", requiredSkills: "" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProjects();
  }, [token]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError("");
    setCreating(true);

    try {
      const res = await axios.post("http://localhost:5000/api/projects", newProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects([res.data, ...projects]);
      setIsModalOpen(false);
      setNewProject({ title: "", description: "", requiredSkills: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
          <p className="text-gray-500 mt-1">Browse active requests or post your own.</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + New Project
        </Button>
      </div>

      {loading ? (
        <div className="text-center p-12 text-gray-500">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400 text-2xl">📋</div>
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="text-sm text-gray-500 mt-2">Be the first to post a request or offer help!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <Badge variant={project.status === "Open" ? "success" : "secondary"}>
                    {project.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="mt-4">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="line-clamp-3 mb-4">{project.description}</CardDescription>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.requiredSkills.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                  {project.requiredSkills.length > 3 && (
                    <span className="text-xs text-gray-400 align-middle">+{project.requiredSkills.length - 3}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2">
                  <Avatar fallback={project.createdBy?.name?.charAt(0) || "U"} size="sm" />
                  <span className="text-xs font-medium text-gray-700">{project.createdBy?.name || "Anonymous"}</span>
                </div>
                {project.createdBy?._id !== user?.id && (
                  <Button variant="ghost" size="sm" className="text-indigo-600">Connect</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Post a New Project"
        description="Describe what you're working on and the skills you need help with."
      >
        <form id="project-form" onSubmit={handleCreateProject} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input 
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="e.g. Building an AI wrapper"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              rows="4"
              placeholder="Explain the project..."
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (Comma separated)</label>
            <input 
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="React, Node.js, Design"
              value={newProject.requiredSkills}
              onChange={(e) => setNewProject({...newProject, requiredSkills: e.target.value})}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={creating}>
              {creating ? "Posting..." : "Post Project"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

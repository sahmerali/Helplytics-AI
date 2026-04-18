import Project from "../models/Project.js";

// GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { category, urgency, location, search } = req.query;
    
    // Build query object
    let query = { status: "Open" }; // Default to active projects
    
    if (category && category !== "All") query.category = category;
    if (urgency && urgency !== "All") query.urgency = urgency;
    
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    if (search && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { requiredSkills: { $regex: search, $options: "i" } }
      ];
    }

    const projects = await Project.find(query)
      .populate("createdBy", "name role")
      .sort("-createdAt");
      
    res.json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error);
    res.status(500).json({ message: "Server error fetching projects" });
  }
};

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { title, description, category, urgency, location, requiredSkills } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    let skillsArray = [];
    if (Array.isArray(requiredSkills)) {
      skillsArray = requiredSkills;
    } else if (typeof requiredSkills === 'string' && requiredSkills.trim() !== '') {
      skillsArray = requiredSkills.split(",").map(s => s.trim()).filter(Boolean);
    }

    const project = await Project.create({
      title,
      description,
      category: category || "Other",
      urgency: urgency || "Medium",
      location: location || "Remote",
      requiredSkills: skillsArray,
      createdBy: req.user.id
    });

    const populatedProject = await project.populate("createdBy", "name role");
    res.status(201).json(populatedProject);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error creating project" });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name role trustScore");
    
    if (!project) return res.status(404).json({ message: "Request not found" });
    
    res.json(project);
  } catch (error) {
    console.error("Fetch project error:", error);
    res.status(500).json({ message: "Server error fetching request" });
  }
};

// PATCH /api/projects/:id/status
export const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findById(req.params.id);
    
    if (!project) return res.status(404).json({ message: "Request not found" });
    
    // Check ownership
    if (project.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this request" });
    }

    project.status = status;
    await project.save();
    
    res.json(project);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error updating request" });
  }
};

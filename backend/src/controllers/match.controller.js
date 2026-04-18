import User from "../models/User.js";

// ============================================
// Match Controller
// Handles finding and scoring potential matches
// for the current user based on role and skills.
// ============================================

// GET /api/matches/recommendations
export const getRecommendations = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Determine target roles to match with
    let targetRoles = [];
    if (currentUser.role === "Need Help") {
      targetRoles = ["Can Help", "Both"];
    } else if (currentUser.role === "Can Help") {
      targetRoles = ["Need Help", "Both"];
    } else {
      // If Both, they can match with anyone
      targetRoles = ["Need Help", "Can Help", "Both"];
    }

    // 1. Fetch potential matches from DB
    // Exclude current user, only get users with target roles, and who are onboarded
    const potentialMatches = await User.find({
      _id: { $ne: currentUser._id },
      role: { $in: targetRoles },
      hasCompletedOnboarding: true
    }).select("-password");

    // 2. Scoring Algorithm (Simple heuristic for Phase 2)
    // Calculate a match score based on overlapping skills and interests
    const currentUserSkills = currentUser.skills.map(s => s.toLowerCase().trim());
    const currentUserInterests = currentUser.interests.map(i => i.toLowerCase().trim());

    const scoredMatches = potentialMatches.map(user => {
      let score = 0;
      
      const matchSkills = user.skills.map(s => s.toLowerCase().trim());
      const matchInterests = user.interests.map(i => i.toLowerCase().trim());

      // Count overlapping skills (higher weight)
      const commonSkills = matchSkills.filter(skill => currentUserSkills.includes(skill));
      score += (commonSkills.length * 2);

      // Count overlapping interests (lower weight)
      const commonInterests = matchInterests.filter(interest => currentUserInterests.includes(interest));
      score += (commonInterests.length * 1);

      return {
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          skills: user.skills,
          interests: user.interests,
          location: user.location,
          avatarFallback: user.name.charAt(0).toUpperCase()
        },
        matchScore: score,
        commonSkills,
        commonInterests
      };
    });

    // 3. Sort by highest score first
    scoredMatches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({ matches: scoredMatches });

  } catch (error) {
    console.error("Match recommendation error:", error);
    res.status(500).json({ message: "Server error generating matches" });
  }
};

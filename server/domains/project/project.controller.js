// Actions methods

// GET /project/projects
//  GET /project/dashboard

const showDashboard = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION '/project/projects' '/project/dashboar'  🚧");
};

// GET /project/add-form
// GET /project/add
const addForm = (req, res) => {
  res.render('project/addView');
};

// POST "/project/add"
const addPost = (req, res) => {
  res.status(200).json(req.body);
};

// Controlador Home
export default {
  showDashboard,
  addForm,
  addPost,
};

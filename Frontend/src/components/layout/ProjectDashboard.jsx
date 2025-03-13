import { useState } from "react";
import {
  MessageSquare,
  Send,
  Upload,
  Plus,
  X,
  Calendar,
  Clock,
  User,
  Tag,
  Mail,
  Phone,
} from "lucide-react";

const ProjectDashboard = () => {
  const [activeCard, setActiveCard] = useState("tasks");
  const [newComment, setNewComment] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Homepage",
      completed: false,
      assignee: "Sarah Johnson",
      priority: "High",
      dueDate: "2025-03-20",
      description: "Create wireframes and mockups for the new homepage",
    },
    {
      id: 2,
      title: "API Integration",
      completed: false,
      assignee: "Mike Chen",
      priority: "Medium",
      dueDate: "2025-03-25",
      description: "Integrate backend API endpoints with frontend components",
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    dueDate: "",
    description: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      text: "I've completed the initial design mockups",
      time: "2:30 PM",
    },
    {
      id: 2,
      user: "Mike Chen",
      text: "Looking good! I'll start implementing the front-end tomorrow",
      time: "3:15 PM",
    },
    {
      id: 3,
      user: "Lisa Wong",
      text: "Don't forget we need to discuss the API integration",
      time: "4:05 PM",
    },
  ]);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      email: "sarah.j@example.com",
      phone: "555-123-4567",
      avatar: "/api/placeholder/40/40",
      tasks: 3,
      status: "online",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Frontend Developer",
      email: "mike.c@example.com",
      phone: "555-234-5678",
      avatar: "/api/placeholder/40/40",
      tasks: 2,
      status: "busy",
    },
    {
      id: 3,
      name: "Lisa Wong",
      role: "Project Manager",
      email: "lisa.w@example.com",
      phone: "555-345-6789",
      avatar: "/api/placeholder/40/40",
      tasks: 5,
      status: "online",
    },
    {
      id: 4,
      name: "Alex Taylor",
      role: "Backend Developer",
      email: "alex.t@example.com",
      phone: "555-456-7890",
      avatar: "/api/placeholder/40/40",
      tasks: 4,
      status: "offline",
    },
    {
      id: 5,
      name: "Jordan Smith",
      role: "QA Engineer",
      email: "jordan.s@example.com",
      phone: "555-567-8901",
      avatar: "/api/placeholder/40/40",
      tasks: 1,
      status: "online",
    },
  ];

  const priorities = ["Low", "Medium", "High", "Urgent"];

  const projectCards = [
    { id: "tasks", title: "Tasks", count: tasks.length },
    { id: "documents", title: "Documents", count: uploadedFiles.length },
    { id: "timeline", title: "Timeline", count: null },
    { id: "team", title: "Team Members", count: teamMembers.length },
  ];

  // Handle creating a new task
  const handleCreateTask = () => {
    if (newTask.title.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: newTask.title,
        completed: false,
        assignee: newTask.assignee,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        description: newTask.description,
      },
    ]);

    // Reset form and close modal
    setNewTask({
      title: "",
      assignee: "",
      priority: "Medium",
      dueDate: "",
      description: "",
    });
    setShowTaskModal(false);
  };

  // Handle toggling task completion
  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle sending a comment
  const handleSendComment = () => {
    if (newComment.trim() === "") return;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setComments([
      ...comments,
      {
        id: comments.length + 1,
        user: "You",
        text: newComment,
        time: currentTime,
      },
    ]);
    setNewComment("");
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newFiles = [...uploadedFiles];

    for (let file of files) {
      newFiles.push({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        uploadedAt: new Date().toLocaleDateString(),
      });
    }

    setUploadedFiles(newFiles);
  };

  // Handle input change for new task form
  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  // Get assignee tasks count
  const getAssigneeTasks = (memberName) => {
    return tasks.filter((task) => task.assignee === memberName).length;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Project Views
        </h2>
        {projectCards.map((card) => (
          <div
            key={card.id}
            className={`p-3 mb-2 rounded-lg cursor-pointer flex justify-between items-center ${activeCard === card.id
                ? "bg-blue-100 border-l-4 border-blue-500"
                : "hover:bg-gray-200"
              }`}
            onClick={() => setActiveCard(card.id)}
          >
            <span
              className={
                activeCard === card.id
                  ? "text-blue-700 font-medium"
                  : "text-gray-700"
              }
            >
              {card.title}
            </span>
            {card.count !== null && (
              <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                {card.count}
              </span>
            )}
          </div>
        ))}
        {/* Back to Home Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full mt-4"
        >
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {projectCards.find((c) => c.id === activeCard)?.title}
          </h1>

          {/* Tasks Section */}
          {activeCard === "tasks" && (
            <div className="space-y-4">
              <button
                onClick={() => setShowTaskModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add New Task
              </button>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`p-4 rounded-md ${task.completed ? "bg-green-100" : "bg-white"
                      } border shadow-sm`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={task.completed ? "line-through" : ""}>
                        <h3 className="font-medium text-lg">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-200"
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {task.assignee && (
                        <div className="flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                          <User size={12} className="mr-1" />
                          {task.assignee}
                        </div>
                      )}
                      {task.priority && (
                        <div
                          className={`flex items-center text-xs rounded-full px-3 py-1 ${task.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : task.priority === "Urgent"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                        >
                          <Tag size={12} className="mr-1" />
                          {task.priority}
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="flex items-center text-xs bg-blue-50 text-blue-600 rounded-full px-3 py-1">
                          <Calendar size={12} className="mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents Section */}
          {activeCard === "documents" && (
            <div className="space-y-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="mb-4 p-2 border border-gray-300 rounded-md cursor-pointer"
              />
              <div className="space-y-2">
                {uploadedFiles.length === 0 ? (
                  <p className="text-gray-500">No documents uploaded yet.</p>
                ) : (
                  uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-md shadow flex justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-medium">{file.name}</h3>
                        <p className="text-sm text-gray-600">
                          Size: {file.size}
                        </p>
                        <p className="text-xs text-gray-400">
                          Uploaded: {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Team Members Section */}
          {activeCard === "team" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg shadow-sm p-4 border"
                  >
                    <div className="flex items-start">
                      <div className="relative mr-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(
                            member.status
                          )} border-2 border-white`}
                        ></span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">
                              {member.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {member.role}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              {getAssigneeTasks(member.name)} tasks
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Mail size={14} className="mr-2" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone size={14} className="mr-2" />
                            {member.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comment Section Always Visible */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="px-4 py-3 bg-gray-100 border-b flex justify-between items-center">
            <span className="font-medium">Comments</span>
            <span className="text-xs text-gray-500">
              {comments.length} comments
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-200 p-3 flex items-center padding-bottom-25px">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 mr-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
            />
            <button
              onClick={handleSendComment}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Task</h2>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleTaskInputChange}
                  placeholder="Enter task title"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleTaskInputChange}
                  placeholder="Enter task description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <select
                  name="assignee"
                  value={newTask.assignee}
                  onChange={handleTaskInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select team member</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleTaskInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleTaskInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  disabled={!newTask.title.trim()}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${newTask.title.trim()
                      ? "hover:bg-blue-600"
                      : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;

import { useState, useEffect } from "react";
import { Plus, X, Calendar, User, Tag, FileText } from "lucide-react";
import { useParams } from "react-router-dom"; // Add useParams for dynamic routing
 
const ProjectDashboard = () => {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [activeCard, setActiveCard] = useState("tasks");
  const [newComment, setNewComment] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    priority: "Medium",
    dueDate: "",
    description: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectData, setProjectData] = useState({});
  const [timeline, setTimeline] = useState([]); // Add timeline state to track changes
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const teamMembers = [
    { id: 1, name: "Bruce Henson" },
  ]; // Add your team members here

  const projectCards = [
    { id: "tasks", title: "Tasks", count: tasks.length },
    { id: "documents", title: "Documents", count: uploadedFiles.length },
    { id: "timeline", title: "Timeline", count: timeline.length },
    { id: "team", title: "Team Members", count: teamMembers.length },
  ];

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }

        const data = await response.json();
        setProjectData(data);
        setTasks(data.tasks || []);
        setComments(data.comments || []);
        setUploadedFiles(data.files || []);
        setTimeline(data.timeline || []); // Fetch timeline data
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  // Function to log timeline events
  const logTimelineEvent = async (eventType, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/timeline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ eventType, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to log timeline event");
      }

      const event = await response.json();
      setTimeline([event, ...timeline]); // Add the new event to the timeline
    } catch (error) {
      console.error("Error logging timeline event:", error);
    }
  };

  // Handle creating a task
  const handleCreateTask = async () => {
    if (newTask.title.trim() === "" || !newTask.assignee || !newTask.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const task = await response.json();
      setTasks([...tasks, task]);

      // Log the task creation in the timeline
      logTimelineEvent("task_added", `Task "${newTask.title}" was added to the project.`);

      setNewTask({
        title: "",
        assignee: "",
        priority: "Medium",
        dueDate: "",
        description: "",
      });
      setShowTaskModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const fileData = new FormData();

    for (let file of files) {
      fileData.append("file", file);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: fileData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload files");
      }

      const uploadedFile = await response.json();
      setUploadedFiles([...uploadedFiles, uploadedFile]);

      // Log the document upload in the timeline
      logTimelineEvent("document_uploaded", `New document uploaded: "${uploadedFile.name}"`);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  // Handle comment submission
  const handleSendComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to send comment");
      }

      const comment = await response.json();
      setComments([...comments, comment]);

      // Log the comment posting in the timeline
      logTimelineEvent("comment_added", `New comment posted: "${newComment}"`);

      setNewComment("");
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Views</h2>
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
              className={activeCard === card.id ? "text-blue-700 font-medium" : "text-gray-700"}
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
        <button
          onClick={() => (window.location.href = "/projects")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full mt-4"
        >
          Log Out
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
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
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
            <div>
              <h2 className="text-xl font-semibold">Upload Files</h2>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="mb-4 p-2 border border-gray-300 rounded-md cursor-pointer"
              />
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                    <span>{file.name}</span>
                    <a href={file.url} className="text-blue-600">Download</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  name="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${newTask.title.trim() ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"}`}
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

import { useState } from "react";
import { MessageSquare } from "lucide-react";

const ProjectDashboard = () => {
    const [activeCard, setActiveCard] = useState("tasks");
    const [commentSectionExpanded, setCommentSectionExpanded] = useState(false);

    const projectCards = [
        { id: "tasks", title: "Tasks", count: 12 },
        { id: "documents", title: "Documents", count: 8 },
        { id: "timeline", title: "Timeline", count: null },
        { id: "team", title: "Team Members", count: 5 }
    ];

    const comments = [
        { id: 1, user: "Sarah Johnson", text: "I've completed the initial design mockups", time: "2:30 PM" },
        { id: 2, user: "Mike Chen", text: "Looking good! I'll start implementing the front-end tomorrow", time: "3:15 PM" },
        { id: 3, user: "Lisa Wong", text: "Don't forget we need to discuss the API integration", time: "4:05 PM" }
    ];

    const toggleCommentSection = () => {
        setCommentSectionExpanded(!commentSectionExpanded);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Views</h2>
                {projectCards.map((card) => (
                    <div
                        key={card.id}
                        className={`p-3 mb-2 rounded-lg cursor-pointer flex justify-between items-center ${activeCard === card.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'hover:bg-gray-200'}`}
                        onClick={() => setActiveCard(card.id)}
                    >
                        <span className={`${activeCard === card.id ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>{card.title}</span>
                        {card.count !== null && (
                            <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">{card.count}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{projectCards.find(c => c.id === activeCard)?.title}</h1>
                {activeCard === "tasks" && (
                    <div className="space-y-4">
                        <TaskCard title="Design homepage wireframes" dueDate="Mar 10" priority="High" assignee="Sarah Johnson" status="In Progress" />
                        <TaskCard title="Create content for about page" dueDate="Mar 12" priority="Medium" assignee="John Doe" status="To Do" />
                    </div>
                )}
                {activeCard === "documents" && (
                    <div className="space-y-4">
                        <DocumentCard title="Project Brief" type="PDF" updatedAt="Mar 5, 2025" size="1.2 MB" />
                        <DocumentCard title="Design Assets" type="ZIP" updatedAt="Mar 7, 2025" size="8.5 MB" />
                    </div>
                )}
            </div>

            <div className={`bg-white border-t border-gray-200 transition-all duration-300 ${commentSectionExpanded ? 'h-1/3' : 'h-12'}`}>
                <div className="px-4 py-3 flex justify-between items-center cursor-pointer bg-gray-100" onClick={toggleCommentSection}>
                    <div className="flex items-center">
                        <MessageSquare size={18} className="text-gray-600 mr-2" />
                        <span className="font-medium">Comments</span>
                    </div>
                    <span className="text-xs text-gray-500">{comments.length} comments</span>
                </div>
                {commentSectionExpanded && (
                    <div className="flex flex-col h-full p-4">
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
                )}
            </div>
        </div>
    );
};

const TaskCard = ({ title, dueDate, priority, assignee, status }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">{title}</h3>
            <div className="flex justify-between mb-3 text-sm text-gray-600">
                <span>Due: {dueDate}</span>
                <span className={`px-2 py-1 rounded-full ${priority === 'High' ? 'bg-red-100 text-red-800' : priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{priority}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Assigned to: {assignee}</span>
                <span className={`px-2 py-1 rounded-full ${status === 'To Do' ? 'bg-gray-100 text-gray-800' : status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{status}</span>
            </div>
        </div>
    );
};

const DocumentCard = ({ title, type, updatedAt, size }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-lg mb-2">{title}</h3>
            <div className="flex justify-between text-sm text-gray-600">
                <span>Updated: {updatedAt}</span>
                <span>{size}</span>
            </div>
        </div>
    );
};

export default ProjectDashboard;

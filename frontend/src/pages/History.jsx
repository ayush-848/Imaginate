import React, { useContext, useEffect, useState } from "react";
import { Download, Eye } from 'lucide-react';
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageModal from "../components/ImageModal";
import { downloadImage } from '../utils/downloadImage'

const History = () => {
    const { user } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageDownload = (imageUrl) => {
        downloadImage(imageUrl);
    };

    const handleImageView = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    useEffect(() => {
        if (user) {
            const fetchChats = async () => {
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_API_URL}/user/chats`,
                        { withCredentials: true }
                    );

                    if (response.data.success) {
                        setChats(response.data.chats);
                    } else {
                        setError(response.data.message || "Failed to fetch chats.");
                    }
                } catch (err) {
                    console.error(err);
                    setError(
                        err.response?.data?.message ||
                        "An error occurred while fetching chat history."
                    );
                } finally {
                    setLoading(false);
                }
            };

            fetchChats();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-950 overflow-hidden font-montserrat">
                    <p className="text-lg font-semibold text-gray-300 text-center">
                        Please log in to view your chat history.
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-950">
                <p className="text-lg font-semibold text-gray-300">Loading chat history...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-950">
                <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-slate-950 overflow-hidden font-montserrat">
                <Navbar />
                <div className="container mx-auto py-12 px-4">
                    <h2 className="text-3xl font-extrabold text-center text-gray-200 mb-8">
                        Your Chat History
                    </h2>
                    {chats.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chats.map((chat, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-800/70 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 ease-in-out hover:bg-gray-800/90 hover:border-gray-600 hover:scale-[1.02]"
                                >
                                    {chat.imageUrl && (
                                        <div className="mb-5 overflow-hidden rounded-lg relative group">
                                            <img
                                                src={chat.imageUrl}
                                                alt="Chat visual"
                                                className="w-full h-48 object-contain bg-gray-900 rounded-lg"
                                            />
                                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleImageView(chat.imageUrl)}
                                                    className="bg-black/50 p-1 rounded-full"
                                                >
                                                    <Eye className="w-4 h-4 text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleImageDownload(chat.imageUrl)}
                                                    className="bg-black/50 p-1 rounded-full"
                                                >
                                                    <Download className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-300 line-clamp-3">
                                            <span className="font-bold text-gray-100 block mb-1">Prompt:</span>
                                            {chat.prompt}
                                        </p>
                                        <p className="text-sm text-gray-300 line-clamp-3">
                                            <span className="font-bold text-gray-100 block mb-1">Result:</span>
                                            {chat.result}
                                        </p>
                                        <div className="flex justify-between items-center mt-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${chat.status === "success"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >
                                                {chat.status}
                                            </span>
                                            <p className="text-xs text-gray-400">
                                                {new Date(chat.timestamp).toLocaleString()} {/* Full date and time */}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg font-medium text-gray-300">
                            No chat history available.
                        </p>
                    )}
                </div>
            </div>
            <Footer />
            {selectedImage && (
                <ImageModal
                    imageUrl={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};

export default History;
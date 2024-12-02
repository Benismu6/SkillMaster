import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react';

// Post Component
const ForumPost = ({ post, onLike, onDislike, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-start mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
          {post.author[0].toUpperCase()}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{post.author}</h3>
          <p className="text-gray-600 text-sm">{post.timestamp}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{post.content}</p>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center text-gray-600 hover:text-green-500"
        >
          <ThumbsUp className="h-5 w-5 mr-2" />
          {post.likes}
        </button>
        <button 
          onClick={() => onDislike(post.id)}
          className="flex items-center text-gray-600 hover:text-red-500"
        >
          <ThumbsDown className="h-5 w-5 mr-2" />
          {post.dislikes}
        </button>
        <button 
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {post.replies.length} Replies
        </button>
      </div>

      {showReplies && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          {post.replies.map(reply => (
            <div key={reply.id} className="mb-3 pb-3 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mr-2">
                  {reply.author[0].toUpperCase()}
                </div>
                <span className="font-semibold text-gray-700">{reply.author}</span>
              </div>
              <p className="text-gray-600">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Community Forum Component
const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');

  // Simulated initial data
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        author: 'JohnDoe',
        content: 'What are the best resources for learning web development?',
        timestamp: '2 hours ago',
        likes: 15,
        dislikes: 2,
        replies: [
          {
            id: 101,
            author: 'WebDevPro',
            content: 'I recommend freeCodeCamp and Udemy courses!'
          }
        ]
      },
      {
        id: 2,
        author: 'TechEnthusiast',
        content: 'Looking for study partners in digital marketing',
        timestamp: '5 hours ago',
        likes: 10,
        dislikes: 1,
        replies: []
      }
    ];

    setPosts(mockPosts);
  }, []);

  // Create new post
  const createPost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      author: 'CurrentUser', // Replace with actual user in real implementation
      content: newPostContent,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  // Like post
  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {...post, likes: post.likes + 1} 
        : post
    ));
  };

  // Dislike post
  const dislikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {...post, dislikes: post.dislikes + 1} 
        : post
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Community Forum</h1>
      </div>

      {/* New Post Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <textarea 
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="What's on your mind?"
          rows="4"
        />
        <button 
          onClick={createPost}
          className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center hover:bg-blue-600"
        >
          <Send className="h-5 w-5 mr-2" />
          Post
        </button>
      </div>

      {/* Posts List */}
      <div>
        {posts.map(post => (
          <ForumPost 
            key={post.id} 
            post={post}
            onLike={likePost}
            onDislike={dislikePost}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;
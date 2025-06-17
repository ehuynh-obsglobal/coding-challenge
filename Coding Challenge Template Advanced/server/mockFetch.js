// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE
// DO NOT LOOK AT THIS FILE


const user = {
    profile: {
        id: 1,
        name: "John Doe"
    }
}

const skills = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "CSS Grid" },
    { id: 5, name: "HTML" }
];

const projects = [
    {
        id: 1,
        userId: 1,
        title: "Project 1",
        description: "A responsive web application built with modern JavaScript.",
        technologies: ["JavaScript", "HTML", "CSS"]
    },
    {
        id: 2,
        userId: 1,
        title: "Project 2",
        description: "An interactive dashboard with real-time updates.",
        technologies: ["React", "Node.js"]
    },
    {
        id: 3,
        userId: 1,
        title: "Project 3",
        description: "A mobile-first web application for tracking tasks.",
        technologies: ["JavaScript", "CSS Grid"]
    }
];

export function setupMockFetch() {
    window.fetch = async function(url, options = {}) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock different API endpoints
        if (url.endsWith('/api/user/profile') && (!options.method || options.method === 'GET')) {
            return new Response(JSON.stringify(user.profile), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
            });
        }

        if (url.match(/\/api\/projects\/\d+$/) && (!options.method || options.method === 'GET')) {
            const id = parseInt(url.split('/').pop());
            const userProjects = projects.filter(p => p.userId === id);

            return new Response(JSON.stringify(userProjects), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (url.match(/\/api\/project\/\d+$/) && (!options.method || options.method === 'GET')) {
            const id = parseInt(url.split('/').pop());
            const project = projects.find(p => p.id === id);
            
            if (project) {
                return new Response(JSON.stringify(project), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            
            return new Response(JSON.stringify({ error: 'Project not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // If no mock endpoint matches or method is wrong, return 405 Method Not Allowed
        return new Response(JSON.stringify({ 
            error: 'Method Not Allowed',
            message: `${options.method} method not allowed for ${url}`
        }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    };
}
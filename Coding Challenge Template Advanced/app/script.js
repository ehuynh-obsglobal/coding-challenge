import dataService from './dataService.js';

let profile = null;
let projects = null;

async function init() {
    await setUserProfile();
    await setProjects();
    createProjectCards();
    typeText();
}

// Typing Effect
let index = 0;
function typeText() {
    const text = `Hello, I'm ${profile?.name}.`;
    const typingText = document.getElementById('typing-text');
    
    function type() {
        if (index <= text.length) { 
            typingText.textContent += text[index];
            index++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filteredProjects = filter === 'all' 
            ? projects
            : projects.filter(project => 
                project.technologies.some(tech => 
                    tech.toLowerCase() === filter
                )
            );
        
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = '';
        displayProjects(filteredProjects);
    });
});

// Project Cards and Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-btn');

async function createProjectCards() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '<p>Loading projects...</p>';
    
    projectsContainer.innerHTML = '';
    
    displayProjects(projects);
}

closeModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', init);

async function setUserProfile() {
    profile = await dataService.getUserProfile();
}

async function setProjects() {
    projects = await dataService.getProjects();
}


function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.technologies = project.technologies.join(',');
        
        card.innerHTML = `
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="skills">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        card.addEventListener('click', async () => {
            const projectDetails = await dataService.getProjectById(project.id);
            modalContent.innerHTML = `
                <h2>${projectDetails.title}</h2>
                <p>${projectDetails.description}</p>
                <div class="skills">
                    ${projectDetails.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            `;
            modalOverlay.style.display = 'block';
        });
        
        projectsContainer.appendChild(card);
    });
}

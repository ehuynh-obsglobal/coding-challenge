// Project data
const projects = [
    {
        title: "Project 1",
        description: "A responsive web application built with modern JavaScript.",
        technologies: ["JavaScript", "HTML", "CSS"]
    },
    {
        title: "Project 2",
        description: "An interactive dashboard with real-time updates.",
        technologies: ["React", "Node.js"]
    },
    {
        title: "Project 3",
        description: "A mobile-first web application for tracking tasks.",
        technologies: ["JavaScript", "CSS Grid"]
    }
];

// Typing Effect
const text = "Hello, I'm a web developer.";
let index = 0;
function typeText() {
    const typingText = document.getElementById('typing-text');
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.technologies.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Project Cards and Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-btn');

function createProjectCards() {
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
        
        card.addEventListener('click', () => {
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <div class="skills">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            `;
            modalOverlay.style.display = 'block';
        });
        
        projectsContainer.appendChild(card);
    });
}

closeModal.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modalContent) {
        modalOverlay.style.display = 'none';
    }
});

// Fun Section
window.addEventListener('DOMContentLoaded', () => {
    const colorBtn = document.getElementById('colorBtn');
  
    colorBtn.addEventListener('click', () => {
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;
    });
});

function getRandomColor() {
    // Generate a random color in hex format: #RRGGBB
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
    typeText();
});

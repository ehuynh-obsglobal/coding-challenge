import { setupMockFetch } from '../.vs/server/mockFetch.js';

class DataService {
    constructor() {
        setupMockFetch();
    }

    getUserProfile() {
        return fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }

    async getProjects() {
        let id = 0;
    
        fetch('/api/user/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => id = data.id);

        return fetch(`/api/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json());
    }

    getProjectById(id) {
        return fetch(`/api/project/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
    }
}

const dataService = new DataService();
export default dataService;
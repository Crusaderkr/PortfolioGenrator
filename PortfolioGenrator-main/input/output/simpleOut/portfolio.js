document.addEventListener("DOMContentLoaded", () => {
    function displayProfile() {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (profile) {
            const profileDetails = document.getElementById("profile-details");
            profileDetails.innerHTML = `
                <h3>${profile.name}</h3>
                <img id="profile-image-preview" src="${profile.profileImageData}" alt="Profile Image" width="100">
                <p>${profile.introduction}</p>
                <p>Email: <a href="mailto:${profile.email}">${profile.email}</a></p>
                <p>LinkedIn: <a href="${profile.linkedin}" target="_blank">${profile.linkedin}</a></p>
                <a id="resume-link" href="${profile.resumeData}" target="_blank">View Resume</a>
            `;
        }
    }
    displayProfile();

    function displayAchievements() {
        const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
        const achievementsList = document.getElementById("achievements-list");
        achievementsList.innerHTML = achievements.map(achievement => `
            <div>
                <h3>${achievement.title}</h3>
                <p>${achievement.details}</p>
            </div>
        `).join("");
    }
    displayAchievements();

    function displayProjects() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const projectsList = document.getElementById("projects-list");
        projectsList.innerHTML = projects.map(project => `
            <div>
                <h3>${project.title}</h3>
                <p>${project.details}</p>
            </div>
        `).join("");
    }
    displayProjects();

    function displayExperiences() {
        const experiences = JSON.parse(localStorage.getItem("experiences")) || [];
        const experienceList = document.getElementById("experience-list");
        experienceList.innerHTML = experiences.map(experience => `
            <div>
                <h3>${experience.title}</h3>
                <p>${experience.details}</p>
            </div>
        `).join("");
    }
    displayExperiences();
});

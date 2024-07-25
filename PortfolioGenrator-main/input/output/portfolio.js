document.addEventListener("DOMContentLoaded", function() {
    function getPortfolioDataFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            try {
                return JSON.parse(decodeURIComponent(data));
            } catch (error) {
                console.error('Error parsing data from URL:', error);
                return null;
            }
        }
        return null;
    }

    const urlPortfolioData = getPortfolioDataFromURL();

    function displayProfileData() {
        const profileData = urlPortfolioData?.profile || JSON.parse(localStorage.getItem("profile"));
        console.log("Profile Data:", profileData);
        if (profileData) {
            if (document.getElementById("profile-name")) {
                document.getElementById("profile-name").textContent = profileData.name || "";
            }
            if (document.getElementById("profile-intro")) {
                document.getElementById("profile-intro").textContent = profileData.introduction || "";
            }
            if (document.getElementById("profile-email")) {
                document.getElementById("profile-email").textContent = profileData.email || "";
                document.getElementById("profile-email").href = `mailto:${profileData.email}` || "";
            }
            if (document.getElementById("linkedin-link")) {
                document.getElementById("linkedin-link").href = profileData.linkedin || "";
            }
            if (document.getElementById("github-link")) {
                document.getElementById("github-link").href = profileData.github || "";
            }
            if (document.getElementById("instagram-link")) {
                document.getElementById("instagram-link").href = profileData.instagram || "";
            }
            if (document.getElementById("profile-image")) {
                document.getElementById("profile-image").src = profileData.profileImageData || "";
            }
            if (document.getElementById("profile-resume")) {
                document.getElementById("profile-resume").href = profileData.resumeData || "";
            }
        } else {
            console.log("Profile data not found.");
        }
    }

    function displayAchievementsData() {
        const achievementsData = urlPortfolioData?.achievements || JSON.parse(localStorage.getItem("achievements"));
        console.log("Achievements Data:", achievementsData);
        if (achievementsData) {
            const achievementsList = document.getElementById("achievements-list");
            if (achievementsList) {
                achievementsList.innerHTML = "";  // Clear existing content
                achievementsData.forEach(achievement => {
                    const achievementDiv = document.createElement("div");
                    achievementDiv.classList.add("skill");
                    achievementDiv.setAttribute("data-date", "Title");
                    achievementDiv.setAttribute("data-aos", "fade-right");
                    achievementDiv.setAttribute("data-aos-delay", "300ms");

                    achievementDiv.innerHTML = `
                        <h3>${achievement.title}</h3>
                        <p>${achievement.details}</p>
                        <br>
                        <a href="${achievement.achieveLink || '#'}" class="cta">View Project/Certificate</a>
                    `;
                    achievementsList.appendChild(achievementDiv);
                });
            }
        } else {
            console.log("Achievements data not found.");
        }
    }

    function displayPortfolioData() {
        const portfolioData = urlPortfolioData?.projects || JSON.parse(localStorage.getItem("projects"));
        console.log("Portfolio Data:", portfolioData);
        if (portfolioData) {
            const portfolioList = document.getElementById("portfolio-list");
            if (portfolioList) {
                portfolioList.innerHTML = "";  // Clear existing content
                portfolioData.forEach(item => {
                    const portfolioDiv = document.createElement("div");
                    portfolioDiv.classList.add("portfolio-item");
                    portfolioDiv.setAttribute("data-aos", "fade-in");
                    portfolioDiv.setAttribute("data-aos-duration", "300ms");

                    portfolioDiv.innerHTML = `
                        </div>
                        <div class="portfolio-description">
                            <h6>${item.title}</h6>
                            <h1>${item.keyPoint || ''}</h1>
                            <p>${item.details}</p>
                            <a href="${item.links || '#'}" class="cta">View Project</a>
                        </div>
                    `;
                    portfolioList.appendChild(portfolioDiv);
                });
            }
        } else {
            console.log("Portfolio data not found.");
        }
    }

    function displayExperienceData() {
        const experienceData = urlPortfolioData?.experiences || JSON.parse(localStorage.getItem("experiences"));
        console.log("Experience Data:", experienceData);
        if (experienceData) {
            const experienceList = document.getElementById("experience-list");
            if (experienceList) {
                experienceList.innerHTML = "";  // Clear existing content
                experienceData.forEach(exp => {
                    const experienceItem = document.createElement("li");
                    experienceItem.classList.add("date");
                    experienceItem.setAttribute("data-aos", "fade-up");
                    experienceItem.setAttribute("data-aos-duration", "300ms");

                    experienceItem.innerHTML = `
                        <h1>${exp.title}</h1>
                        <p>${exp.details}</p>
                        <br>
                        <a href="${exp.expLink || '#'}" class="cta">View Work</a>
                    `;
                    experienceList.appendChild(experienceItem);
                });
            }
        } else {
            console.log("Experience data not found.");
        }
    }

    function copyToClipboard(data) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(data).then(() => {
                alert("Link copied 🧙‍♂️");
            }).catch(err => {
                console.error('Error copying data to clipboard: better luck next time🥺', err);
            });
        } else {
            // Fallback method if Clipboard API is not available
            const textArea = document.createElement('textarea');
            textArea.value = data;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                alert('Link copied 🧙‍♂️');
            } catch (err) {
                console.error('Error copying data to clipboard: better luck next time🥺', err);
            }
            document.body.removeChild(textArea);
        }
    }

    function generateShareableLink() {
        const profileData = JSON.parse(localStorage.getItem("profile")) || {};
         const achievementsData = JSON.parse(localStorage.getItem("achievements")) || {};
         const portfolioData = JSON.parse(localStorage.getItem("projects")) || {};
         const experienceData = JSON.parse(localStorage.getItem("experiences")) || {};

        const combinedData = {
            profile: profileData,
             achievements: achievementsData,
             projects: portfolioData,
             experiences: experienceData
        };

        const encodedData = encodeURIComponent(JSON.stringify(combinedData));
        const baseUrl = window.location.origin + window.location.pathname;
        const shareableLink = `${baseUrl}?data=${encodedData}`;

        // Check URL length and notify if too long
        if (shareableLink.length > 50000000) {
            alert("The generated URL is too long and might not work properly.");
            return null;
        }

        return shareableLink;
    }

    document.getElementById('generate-shareable-link').addEventListener('click', function() {
        const shareableLink = generateShareableLink();
        if (shareableLink) {
            console.log('Shareable Link:', shareableLink);
            copyToClipboard(shareableLink);
        }
    });

    // Call the functions to display data
    displayProfileData();
    displayAchievementsData();
    displayPortfolioData();
    displayExperienceData();
});

// jQuery for navbar and scrolling
$(document).ready(function () {
    $('.menu-toggler').on('click', function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function(){
        $('.menu-toggler').toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('nav a[href*="#"]').on('click', function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000);
    });

    $('#up').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
    });

    AOS.init({
        easing: 'ease',
        duration: 1800
    });
});

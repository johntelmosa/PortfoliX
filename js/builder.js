const form = document.getElementById("portfolioForm");
const resetButton = document.getElementById("resetButton");
const previewButton = document.getElementById("previewButton");
const saveMessage = document.getElementById("saveMessage");

const fullnameInput = document.getElementById("fullname");
const titleInput = document.getElementById("title");
const emailInput = document.getElementById("email");
const githubInput = document.getElementById("github");
const aboutInput = document.getElementById("aboutme");
const profileInput = document.getElementById("profile");
const skillsInput = document.getElementById("skills");
const technologiesInput = document.getElementById("technologies");
const templateInput = document.getElementById("template");
const primaryColorInput = document.getElementById("primaryColor");

const project1NameInput = document.getElementById("project1Name");
const project1DescriptionInput = document.getElementById("project1Description");
const project1TechInput = document.getElementById("project1Tech");
const project1GithubInput = document.getElementById("project1Github");

const project2NameInput = document.getElementById("project2Name");
const project2DescriptionInput = document.getElementById("project2Description");
const project2TechInput = document.getElementById("project2Tech");
const project2GithubInput = document.getElementById("project2Github");

const preview = document.getElementById("builderPreview");
const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewAbout = document.getElementById("previewAbout");
const previewGithub = document.getElementById("previewGithub");
const previewImage = document.getElementById("previewImage");

let currentProfileSource = "assets/images/prof.png";

const defaultData = {
    fullname: "John Vincent Telmosa",
    title: "Software Engineer",
    email: "john@example.com",
    github: "https://github.com/",
    aboutme:
        "I am an aspiring software engineer with a Bachelor’s degree in Information Technology aiming to transform clients' ideas into powerful websites.",
    profile: "assets/images/prof.png",
    skills: "HTML, CSS, JavaScript, Java, MySQL",
    technologies:
        "Frontend: HTML, CSS, JavaScript\nBackend: Java\nDatabase: MySQL",
    template: "modern",
    primaryColor: "#222222",
    projects: [
        {
            name: "Barangay Complaint Management System",
            description:
                "A web-based system designed to help barangays manage, track, and monitor complaints efficiently.",
            technologies: "Java, MySQL, REST API",
            github: "https://github.com/"
        },
        {
            name: "Library Management System",
            description:
                "A web-based system designed to help libraries manage books, users, borrowing, and returning records efficiently.",
            technologies: "Java, MySQL",
            github: "https://github.com/"
        }
    ]
};

function loadData() {
    const saved = localStorage.getItem("portfolixData");

    if (!saved) {
        return defaultData;
    }

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error("Unable to load saved portfolio data.", error);
        return defaultData;
    }
}

function setFormData(data) {
    fullnameInput.value = data.fullname || "";
    titleInput.value = data.title || "";
    emailInput.value = data.email || "";
    githubInput.value = data.github || "";
    aboutInput.value = data.aboutme || "";
    skillsInput.value = data.skills || "";
    technologiesInput.value = data.technologies || "";
    templateInput.value = data.template || "modern";
    primaryColorInput.value = data.primaryColor || "#222222";

    currentProfileSource =
        data.profile || "assets/images/prof.png";

    previewImage.src = currentProfileSource;

    const project1 = data.projects?.[0] || {};
    const project2 = data.projects?.[1] || {};

    project1NameInput.value = project1.name || "";
    project1DescriptionInput.value = project1.description || "";
    project1TechInput.value = project1.technologies || "";
    project1GithubInput.value = project1.github || "";

    project2NameInput.value = project2.name || "";
    project2DescriptionInput.value = project2.description || "";
    project2TechInput.value = project2.technologies || "";
    project2GithubInput.value = project2.github || "";
}

function getFormData() {
    return {
        fullname: fullnameInput.value.trim(),
        title: titleInput.value.trim(),
        email: emailInput.value.trim(),
        github: githubInput.value.trim(),
        aboutme: aboutInput.value.trim(),

        profile: currentProfileSource,

        skills: skillsInput.value.trim(),
        technologies: technologiesInput.value.trim(),

        template: templateInput.value,
        primaryColor: primaryColorInput.value,

        projects: [
            {
                name: project1NameInput.value.trim(),
                description: project1DescriptionInput.value.trim(),
                technologies: project1TechInput.value.trim(),
                github: project1GithubInput.value.trim()
            },
            {
                name: project2NameInput.value.trim(),
                description: project2DescriptionInput.value.trim(),
                technologies: project2TechInput.value.trim(),
                github: project2GithubInput.value.trim()
            }
        ]
    };
}

function saveData(data) {
    localStorage.setItem(
        "portfolixData",
        JSON.stringify(data)
    );
}

function updatePreview() {
    const data = getFormData();

    previewName.textContent =
        data.fullname || "Your Name";

    previewTitle.textContent =
        data.title || "Professional Title";

    previewAbout.textContent =
        data.aboutme ||
        "Your introduction will appear here.";

    previewGithub.href =
        data.github || "#";

    previewImage.src =
        currentProfileSource;

    preview.style.setProperty(
        "--primary-color",
        data.primaryColor
    );

    preview.classList.remove(
        "template-modern",
        "template-minimal",
        "template-creative"
    );

    preview.classList.add(
        `template-${data.template}`
    );
}

function updateSelectedProfileImage() {
    const file = profileInput.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        profileInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        currentProfileSource = event.target.result;

        previewImage.src =
            currentProfileSource;
    };

    reader.onerror = function () {
        alert("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
}

function showSaveMessage(message) {
    saveMessage.textContent = message;
    saveMessage.style.color = "#2f6f44";
}

function validateForm() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    return true;
}

form.addEventListener("input", updatePreview);

form.addEventListener("change", function (event) {
    if (event.target === profileInput) {
        updateSelectedProfileImage();
    }

    updatePreview();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const data = getFormData();

    saveData(data);

    showSaveMessage(
        "Portfolio saved. Opening preview..."
    );

    setTimeout(function () {
        window.location.href = "preview.html";
    }, 500);
});

previewButton.addEventListener("click", function () {
    if (!validateForm()) {
        return;
    }

    const data = getFormData();

    saveData(data);

    window.location.href = "preview.html";
});

resetButton.addEventListener("click", function () {
    const shouldReset = confirm(
        "Reset your PortfoliX data?"
    );

    if (!shouldReset) {
        return;
    }

    localStorage.removeItem("portfolixData");

    profileInput.value = "";

    setFormData(defaultData);
    updatePreview();

    saveMessage.textContent =
        "Portfolio has been reset.";

    saveMessage.style.color = "#9b2c2c";
});

const existingData = loadData();

setFormData(existingData);
updatePreview();
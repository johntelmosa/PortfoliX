const dataKey = "portfolixData";

const portfolioPreview =
    document.getElementById("portfolioPreview");

const portfolioImage =
    document.getElementById("portfolioImage");

const portfolioName =
    document.getElementById("portfolioName");

const portfolioTitle =
    document.getElementById("portfolioTitle");

const portfolioAbout =
    document.getElementById("portfolioAbout");

const portfolioGithub =
    document.getElementById("portfolioGithub");

const portfolioContactGithub =
    document.getElementById("portfolioContactGithub");

const portfolioEmail =
    document.getElementById("portfolioEmail");

const portfolioSkills =
    document.getElementById("portfolioSkills");

const portfolioTechnologies =
    document.getElementById("portfolioTechnologies");

const portfolioProjects =
    document.getElementById("portfolioProjects");

const downloadButton =
    document.getElementById("downloadButton");

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

function escapeHTML(value) {
    const div = document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;
}

function getData() {
    const savedData =
        localStorage.getItem(dataKey);

    if (!savedData) {
        return defaultData;
    }

    try {
        return JSON.parse(savedData);
    } catch (error) {
        console.error(
            "Invalid saved portfolio data.",
            error
        );

        return defaultData;
    }
}

function createSkillElement(skill) {
    const span =
        document.createElement("span");

    span.className =
        "skill-item";

    span.textContent =
        skill.trim();

    return span;
}

function createTechnologyElement(technology) {
    const div =
        document.createElement("div");

    div.className =
        "technology-item";

    div.textContent =
        technology.trim();

    return div;
}

function createProjectElement(project) {
    const article =
        document.createElement("article");

    article.className =
        "project-card";

    const title =
        document.createElement("h3");

    title.textContent =
        project.name ||
        "Untitled Project";

    const description =
        document.createElement("p");

    description.textContent =
        project.description ||
        "No project description provided.";

    const technologies =
        document.createElement("p");

    technologies.className =
        "project-tech";

    technologies.textContent =
        `Technologies: ${
            project.technologies ||
            "Not specified"
        }`;

    article.appendChild(title);
    article.appendChild(description);
    article.appendChild(technologies);

    if (project.github) {
        const githubLink =
            document.createElement("a");

        githubLink.className =
            "btn btn-secondary";

        githubLink.href =
            project.github;

        githubLink.target =
            "_blank";

        githubLink.rel =
            "noopener noreferrer";

        githubLink.textContent =
            "GitHub";

        article.appendChild(
            githubLink
        );
    }

    return article;
}

function renderPortfolio(data) {
    portfolioName.textContent =
        data.fullname ||
        "Your Name";

    portfolioTitle.textContent =
        data.title ||
        "Professional Title";

    portfolioAbout.textContent =
        data.aboutme ||
        "Your introduction will appear here.";

    portfolioEmail.textContent =
        data.email ||
        "No email provided.";

    portfolioImage.src =
        data.profile ||
        "assets/images/prof.png";

    portfolioImage.alt =
        data.fullname
            ? `${data.fullname} profile picture`
            : "Profile picture";

    portfolioGithub.href =
        data.github || "#";

    portfolioContactGithub.href =
        data.github || "#";

    portfolioPreview.style.setProperty(
        "--primary-color",
        data.primaryColor ||
        "#222222"
    );

    portfolioPreview.classList.remove(
        "template-modern",
        "template-minimal",
        "template-creative"
    );

    portfolioPreview.classList.add(
        `template-${
            data.template ||
            "modern"
        }`
    );

    portfolioSkills.innerHTML = "";
    portfolioTechnologies.innerHTML = "";
    portfolioProjects.innerHTML = "";

    const skills =
        (data.skills || "")
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

    skills.forEach(skill => {
        portfolioSkills.appendChild(
            createSkillElement(skill)
        );
    });

    const technologies =
        (data.technologies || "")
            .split("\n")
            .map(item => item.trim())
            .filter(Boolean);

    technologies.forEach(item => {
        portfolioTechnologies.appendChild(
            createTechnologyElement(item)
        );
    });

    const projects =
        Array.isArray(data.projects)
            ? data.projects.filter(
                project => project.name
            )
            : [];

    projects.forEach(project => {
        portfolioProjects.appendChild(
            createProjectElement(project)
        );
    });
}

function createDownloadHTML(data) {
    const skills =
        (data.skills || "")
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

    const skillHTML =
        skills
            .map(
                skill =>
                    `<span class="skill">${escapeHTML(skill)}</span>`
            )
            .join("");

    const projectHTML =
        (data.projects || [])
            .filter(project => project.name)
            .map(
                project => `
                    <article class="project">
                        <h2>${escapeHTML(project.name)}</h2>

                        <p>
                            ${escapeHTML(
                                project.description
                            )}
                        </p>

                        <p>
                            <strong>
                                Technologies:
                            </strong>
                            ${escapeHTML(
                                project.technologies
                            )}
                        </p>

                        ${
                            project.github
                                ? `
                                    <a
                                        href="${escapeHTML(project.github)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>
                                `
                                : ""
                        }
                    </article>
                `
            )
            .join("");

    const name =
        escapeHTML(data.fullname);

    const title =
        escapeHTML(data.title);

    const about =
        escapeHTML(data.aboutme);

    const email =
        escapeHTML(data.email);

    const github =
        escapeHTML(data.github);

    const profile =
        escapeHTML(
            data.profile ||
            "assets/images/prof.png"
        );

    const primaryColor =
        escapeHTML(
            data.primaryColor ||
            "#222222"
        );

    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ${name} | Portfolio
    </title>

    <style>

        :root {
            --primary: ${primaryColor};
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            color: #444;
        }

        header {
            padding: 60px 20px;
            background: white;
            text-align: center;
        }

        header img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            margin: 0 auto 20px;
        }

        header h1 {
            margin: 0;
            color: var(--primary);
            font-size: 56px;
        }

        main {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        section {
            margin-bottom: 20px;
            padding: 30px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 14px;
        }

        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill {
            padding: 8px 14px;
            background: var(--primary);
            color: white;
            border-radius: 999px;
        }

        .project-grid {
            display: grid;
            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 20px;
        }

        .project {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 12px;
        }

        a {
            color: var(--primary);
        }

        @media (max-width: 700px) {

            header h1 {
                font-size: 40px;
            }

            .project-grid {
                grid-template-columns: 1fr;
            }

        }

    </style>

</head>

<body>

    <header>

        <img
            src="${profile}"
            alt="Profile picture"
        >

        <p>
            ${title}
        </p>

        <h1>
            ${name}
        </h1>

    </header>

    <main>

        <section>

            <h2>
                About Me
            </h2>

            <p>
                ${about}
            </p>

        </section>

        <section>

            <h2>
                Skills
            </h2>

            <div class="skills">
                ${skillHTML}
            </div>

        </section>

        <section>

            <h2>
                Projects
            </h2>

            <div class="project-grid">
                ${projectHTML}
            </div>

        </section>

        <section>

            <h2>
                Contact
            </h2>

            <p>
                ${email}
            </p>

            <a href="${github}">
                GitHub
            </a>

        </section>

    </main>

</body>

</html>
    `;
}

downloadButton.addEventListener(
    "click",
    function () {

        const data =
            getData();

        const html =
            createDownloadHTML(data);

        const blob =
            new Blob(
                [html],
                {
                    type:
                        "text/html;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href =
            url;

        link.download =
            "my-portfolix.html";

        link.style.display =
            "none";

        document.body.appendChild(
            link
        );

        link.click();

        document.body.removeChild(
            link
        );

        setTimeout(
            function () {
                URL.revokeObjectURL(url);
            },
            1000
        );
    }
);

renderPortfolio(
    getData()
);
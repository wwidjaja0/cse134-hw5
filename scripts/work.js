document.addEventListener('DOMContentLoaded', () => {
	const tempArray = [{
		id: 1,
		title: "Personal Portfolio Website",
		description: "A personal portfolio website showcasing my skills and projects.",
		categories: "web",
		image: "assets/imgs/portfolio.png"
	}, {
		id: 2,
		title: "AI Chatbot",
		description: "An AI-powered chatbot for customer support.",
		categories: ["ai", "web"],
		image: "assets/imgs/chatbot.png"
	}, {
		id: 3,
		title: "Music Streaming App",
		description: "A web app for streaming and discovering new music.",
		categories: "music",
		image: "assets/imgs/music.png"
	}];
	localStorage.setItem("projects", JSON.stringify(tempArray));

	initProjectCards();
	initLoadButtons();
});

/**
 * A helper function to generate project cards from an array of projects.
 * @param {Array} projects - an array of project objects
 * @return {void}
 */
function generateProjectCards(projects) {
	const container = document.getElementById("projects");
	container.innerHTML = "";

	projects.forEach(project => {
		const card = document.createElement("project-card");
		card.id = project.id;
		card.setAttribute("title", project.title);
		card.setAttribute("description", project.description);
		card.setAttribute("categories", project.categories);
		card.setAttribute("image", project.image);
		card.setAttribute("link", `/project-${project.id}`);
		container.appendChild(card);
	});
};

/**
 * Initializes project cards by fetching data from localStorage or using a temporary array.
 * If localStorage is empty, it uses a predefined temporary array.
 * @returns {void}
 */
function initProjectCards() {
	generateProjectCards(JSON.parse(localStorage.getItem("projects")) || tempArray);
}

/**
 * Initializes the load buttons for loading projects from local storage or a remote API.
 * @returns {void}
 */
function initLoadButtons() {
	const loadLocalButton = document.getElementById('load-local');
	const loadRemoteButton = document.getElementById('load-remote');
	const container = document.getElementById("projects");

	loadLocalButton.addEventListener('click', () => {
		const projects = JSON.parse(localStorage.getItem("projects")) || [];
		generateProjectCards(projects);
	});

	loadRemoteButton.addEventListener('click', () => {
		fetch('https://my-json-server.typicode.com/wwidjaja0/cse134-hw5/')
			.then(response => response.json())
			.then(data => {
				generateProjectCards(data);
			});
	});
}

class ProjectCard extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const id = this.getAttribute("id") || "";
		const title = this.getAttribute("title") || "Untitled";
		const description = this.getAttribute("description") || "Click to see more...";
		const categories = this.getAttribute("categories") || "";
		const image = this.getAttribute("image") || "";
		const link = this.getAttribute("link") || "#";

		this.innerHTML += `
		<a id="project-${id}" href="${link}">
			<picture>
				<img src="${image}" alt="${title}">
			</picture>
			<div>
				<ul>
					${categories.split(",").map(category => { return `<li>${category}</li>`; }).join("")}
				</ul>
			</div>
		<h3>${title}</h3>
		<p>${description}</p></a>`
	}
}

console.log("ProjectCard component loaded");

customElements.define('project-card', ProjectCard);
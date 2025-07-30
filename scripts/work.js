document.addEventListener('DOMContentLoaded', () => {
	const tempArray = [{
		id: 1,
		title: "Personal Portfolio Website - Local",
		description: "This is the local version of what you would see on a backend.",
		link: "/",
		categories: "web",
		image: "assets/imgs/me.jpg"
	}, {
		id: 2,
		title: "MemorySpot",
		description: "A Card-Based Location Sharing Web App",
		link: "https://cse110-sp25-group24.github.io/cse110-sp25-group24/",
		categories: ["web"],
		image: "https://raw.githubusercontent.com/cse110-sp25-group24/cse110-sp25-group24/refs/heads/main/source/assets/apple-touch-icon.png"
	}, {
		id: 3,
		title: "Floor Manager",
		description: "A Discord bot for managing the \"floor\" for the Poker Tritons Discord server at UC San Diego.",
		link: "https://github.com/wwidjaja0/floor-manager",
		categories: ["web", "bot"],
		image: "https://ugc.production.linktr.ee/1f2f5abd-744d-4563-a944-1ee1b3be84f7_Logo1024x1024.png?io=true&size=avatar-v3_0"
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
		card.setAttribute("link", `${project.link}` || `/project-${project.id}`);
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

	loadLocalButton.addEventListener('click', () => {
		const projects = JSON.parse(localStorage.getItem("projects")) || [];
		generateProjectCards(projects);
	});

	loadRemoteButton.addEventListener('click', () => {
		fetch('https://my-json-server.typicode.com/wwidjaja0/cse134-hw5/projects')
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

customElements.define('project-card', ProjectCard);
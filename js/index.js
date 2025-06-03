// Get today's data and the current year
const today = new Date();
const thisYear = today.getFullYear();

// Create a footer element
const footer = document.createElement("footer");
document.body.appendChild(footer);

// Create and append a copyright element to the footer
const copyright = document.createElement('p');
copyright.innerHTML = `&copy; Cristian Camacho ${thisYear}`;
footer.appendChild(copyright);

// Define an array of skills
const skills = ["JavaScript", "HTML", "CSS", "C++", "GitHub", "Python", "Java", "Martial Arts Instructor", "Catholic Leader"];

// Select the Skills section and create a list element
const skillsSection = document.getElementById("Skills");
const skillsList = document.createElement("ul");
skillsSection.appendChild(skillsList);

// Loop through the skills array and add each skill as a list item
for(let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// Message Form
const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

// Hide messages section initially
messageSection.classList.add("hidden");
// Add submit even listener to the form
messageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // Extract values entered by the user
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);
  // Create a new list item for the message
  const newMessage = document.createElement("li");
  // Create and append to lailto link for the user's name
  const nameLink = document.createElement("a");
  nameLink.href = `mailto:${usersEmail}`;
  nameLink.innerText = usersName;
  // Create and append a span for the message test
  const messageSpan = document.createElement("span");
  messageSpan.innerText = ` wrote: ${usersMessage}`;

  newMessage.appendChild(nameLink);
  newMessage.appendChild(messageSpan);

  // Remove Button
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.type = "button";
  removeButton.classList.add("message-button");

  // Add click event to remove the message
  removeButton.addEventListener("click", function () {
    newMessage.remove();
    // Hide message section if no messages remain
    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  // Edit Button
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.type = "button";
  editButton.classList.add("message-button");

  // Add click event to prompt user to edit message
  editButton.addEventListener("click", function () {
    const newText = prompt("Edit your message:", messageSpan.innerText.replace(" wrote: ", ""));
    if (newText !== null) {
      messageSpan.innerText = ` wrote: ${newText}`;
    }
  });
  // Append buttons and message to the list
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);
  // Display message section
  messageSection.style.display = "block";
  // Reset the form fields
  messageForm.reset();
});

// Fetch GitHub repositories
fetch("https://api.github.com/users/Cristian184/repos")
  .then((response) => {
    // Check for a successful response
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  })
  .then((repositories) => {
    // Select the Projects section and list element
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    // Loop through each repository and create a list item
    repositories.forEach((repo) => {
      const project = document.createElement("li");
      // Create a link to the repository
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.innerText = repo.name;
      link.target = "_blank";

      project.appendChild(link);
      projectList.appendChild(project);
    });
  })
  .catch((error) => {
    // Handle fetch errors
    console.error("Failed to fetch GitHub repos:", error);
    // Display error message
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    const errorMessage = document.createElement("li");
    errorMessage.innerText = "Unable to load projects at this time.";
    projectList.appendChild(errorMessage);
  });
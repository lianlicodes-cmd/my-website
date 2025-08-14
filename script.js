// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Drag and drop functionality
let draggedElement = null;

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.outerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {
  this.classList.add("drag-over");
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (draggedElement !== this) {
    const grid = document.getElementById("masonry-grid");
    const draggedHTML = draggedElement.outerHTML;
    const targetHTML = this.outerHTML;

    draggedElement.outerHTML = targetHTML;
    this.outerHTML = draggedHTML;

    // Re-attach event listeners
    attachDragListeners();
  }

  return false;
}

function handleDragEnd(e) {
  this.classList.remove("dragging");
  const items = document.querySelectorAll(".grid-item");
  items.forEach((item) => {
    item.classList.remove("drag-over");
  });
}

function attachDragListeners() {
  const items = document.querySelectorAll(".grid-item");
  items.forEach((item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragenter", handleDragEnter);
    item.addEventListener("dragover", handleDragOver);
    item.addEventListener("dragleave", handleDragLeave);
    item.addEventListener("drop", handleDrop);
    item.addEventListener("dragend", handleDragEnd);

    // Click to navigate to project
    item.addEventListener("click", function () {
      const projectId = this.dataset.project;
      console.log("Navigate to project:", projectId);
      // You can add navigation logic here
      // window.location.href = `project-${projectId}.html`;
    });
  });
}

// Initialize drag and drop
attachDragListeners();

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

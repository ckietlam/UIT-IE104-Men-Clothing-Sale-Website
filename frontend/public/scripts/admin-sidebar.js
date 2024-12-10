// Select elements for sidebar toggle
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".mainContent"); // Select main content
const toggleBtn = document.querySelector(".toggleSidebarBtn");
const toggleIcon = toggleBtn.querySelector("img");

// Toggle sidebar state
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("expanded"); // Adjust mainContent size

  // Change icon based on sidebar state
  if (sidebar.classList.contains("collapsed")) {
    toggleIcon.src = "icons/icon-forward.svg";
  } else {
    toggleIcon.src = "icons/icon-backward.svg";
  }
});

// Select all dropdown toggles for menu
const dropdownToggles = document.querySelectorAll(".dropdownToggle");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link action
    const parent = toggle.closest(".menuItem.dropdown");

    // Close other dropdowns if necessary
    document.querySelectorAll(".menuItem.dropdown").forEach((item) => {
      if (item !== parent) {
        item.classList.remove("active");
      }
    });

    // Toggle the current dropdown
    parent.classList.toggle("active");
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menuItem.dropdown")) {
    document.querySelectorAll(".menuItem.dropdown").forEach((item) => {
      item.classList.remove("active");
    });
  }
});

// Code for handling user menu dropdown click
const userMenuButton = document.querySelector(".userMenu .dropdownToggle");
const userMenuDropdown = document.querySelector(".userMenu ul");

userMenuButton.addEventListener("click", (event) => {
  // Prevent the dropdown from hiding when clicked
  event.stopPropagation();
  // Toggle the display of the dropdown
  userMenuDropdown.style.display =
    userMenuDropdown.style.display === "block" ? "none" : "block";
});

// Close user menu dropdown when clicking elsewhere on the page
document.addEventListener("click", function (event) {
  if (!event.target.closest(".userMenu")) {
    userMenuDropdown.style.display = "none";
  }
});

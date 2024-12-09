
document.addEventListener("DOMContentLoaded", () => {
  const volunteerButtons = document.querySelectorAll(".volunteer-now");
  volunteerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.getElementById("contact-form");
      form.style.display = "block";
    });
  });

  const fetchCharityData = async () => {
    const apiKey = "pk_live_a3c30d3720e698aa4a304c1d86b417e5";
    const url = "https://api.every.org/v0.2/organizations?cause_area=animals";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from Every.org API");
      }

      const data = await response.json();
      displayCharityData(data.organizations);
    } catch (error) {
      console.error(error);
      document.getElementById("charity-container").innerHTML =
        "<p>Unable to load charity data at this time. Please try again later.</p>";
    }
  };

  const displayCharityData = (charities) => {
    const container = document.getElementById("charity-container");
    container.innerHTML = ""; 

    charities.forEach((charity) => {
      const charityCard = document.createElement("div");
      charityCard.className = "charity-card";
      charityCard.innerHTML = `
        <h3>${charity.name}</h3>
        <p>${charity.description || "No description available."}</p>
        <a href="${charity.website}" target="_blank">Learn More</a>
      `;
      container.appendChild(charityCard);
    });
  };

  fetchCharityData();
});

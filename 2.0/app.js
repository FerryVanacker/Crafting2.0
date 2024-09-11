document.addEventListener("DOMContentLoaded", async function() {
  const itemList = document.getElementById("item-list");
  const quantityInput = document.getElementById("quantity");
  const resultsContainer = document.getElementById("results-container");
  const calculateButton = document.getElementById("calculate-button");
  const modeToggle = document.getElementById("mode-toggle");
  let items = []; // Initialize an empty array to store the database
  const body = document.body;

  console.log("JavaScript code loaded");

  // Load the database using XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data.json', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        items = JSON.parse(xhr.responseText);
        console.log(items);

        // Populate the item-list element with the item names
        populateItemList();
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    } else {
      console.error('Error loading database:', xhr.statusText, xhr.responseText);
    }
  };
  xhr.onerror = function() {
    console.error('Error loading database:', xhr.statusText);
  };
  xhr.send();

  xhr.onloadend = function() {
    calculateButton.addEventListener("click", calculateMaterials);
  };

  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    updateMaterialTextColor();
  });

  function populateItemList() {
    items.forEach(item => {
      const radioButton = document.createElement('input');
      radioButton.type = 'radio';
      radioButton.name = 'item';
      radioButton.id = `item-${item.name}`;
      radioButton.value = item.name;

      const label = document.createElement('label');
      label.htmlFor = radioButton.id;
      label.textContent = item.name;

      const li = document.createElement('li');
      li.appendChild(radioButton);
      li.appendChild(label);

      itemList.appendChild(li);
    });
  }

 // Function to calculate and display materials
   function calculateMaterials() {
    const selectedItem = itemList.querySelector('input[type="radio"][name="item"]:checked');
    if (!selectedItem) {
      alert("Please select an item.");
      return;
    }

    const itemName = selectedItem.value.trim().toLowerCase();
    const quantity = parseInt(quantityInput.value) || 1; // Ensure quantity is at least 1
   
    // Find the item in the database
    const item = items.find(i => i.name.toLowerCase() === itemName);

    if (!item) {
      alert("Item not found in database.");
      return;
    }

    // Clear previous results
    resultsContainer.innerHTML = '';

    item.materials.forEach((material) => {
      const materialElement = document.createElement('span');
      const totalMaterial = material.quantity * quantity;
      materialElement.textContent = `${totalMaterial} x ${material.name}`;
      resultsContainer.appendChild(materialElement);
    });

    updateMaterialTextColor();
  }

  function updateMaterialTextColor() {
    const spans = resultsContainer.querySelectorAll('span');
    spans.forEach(span => {
      if (body.classList.contains("dark-mode")) {
        span.style.color = "#ffffff";
      } else {
        span.style.color = "#000000";
      }
    });
  }
});

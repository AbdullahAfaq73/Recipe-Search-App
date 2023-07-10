function searchRecipes(query) {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=e5df3ece&app_key=5975c573b0e72bf110cc2d421cdd985e`;

  const request = new XMLHttpRequest();
  request.open('GET', apiUrl, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const response = JSON.parse(request.responseText);
      // Handle the retrieved data
      showRecipes(response);
    } else {
      console.error('Request failed with status', request.status);
    }
  };

  request.onerror = function () {
    console.error('Request failed');
  };

  request.send();
}

function showRecipes(data) {
  const showFood = document.getElementById('error');

  // Clear previous content
  // showFood.innerHTML = '';

  if (data.hits.length === 0) {
    // No recipes found
    showFood.innerHTML = '<p>No recipes found.</p>';
  } else {
    // Display each recipe
    var i = 1;





    data.hits.forEach(hit => {
      const recipe = hit.recipe;
      console.log(recipe);




      const recipeContainer = document.getElementById("foodcard");

      var specificCharacters = [";", ","];


      var fetchedIngredients = recipe.ingredientLines;
      var convertIngredients = fetchedIngredients.toString();
      var IngredientsArray = convertIngredients.split(new RegExp(specificCharacters.join("|")));

      var formattedList1 = [];

      // Iterate over each ingredient and format it with a bullet point
      IngredientsArray.forEach(function (ingredient) {
        var listItem = "• " + ingredient.trim(); // Add a bullet point before each ingredient
        formattedList1.push(listItem); // Add the formatted item to the list array
      });

      var formattedLines_1 = formattedList1.join("<br>");

      console.log("Formatted lines are here:\n" + formattedLines_1);



// ...............for healthLable............
      var fetchedHealth = recipe.healthLabels;
      var convertHealth = fetchedHealth.toString();
      var healthArray = convertHealth.split(new RegExp(specificCharacters.join("|")));

      var formattedList2 = [];

      // Iterate over each ingredient and format it with a bullet point
      healthArray.forEach(function (health) {
        var listItem = "• " + health.trim(); // Add a bullet point before each ingredient
        formattedList2.push(listItem); // Add the formatted item to the list array
      });

      var formattedLines_2 = formattedList2.join("<br>");

      console.log("Formatted lines are here:\n" + formattedLines_2);



      // Create an empty array to store the formatted list items
      



      recipeContainer.innerHTML += `
    <div class="card">
        <img src="${recipe.image}" alt="${recipe.label}">
        <h4>${recipe.label}</h4>
        <p>${recipe.source}</p>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" class="btn btn-succes" > Lets cooks </button>

        <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel${i}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel${i}">${recipe.label}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist"  style="    margin: auto;
                margin-top: 10px;">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-home-tab${i}" data-bs-toggle="pill" data-bs-target="#pills-home${i}" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Ingredients</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-profile-tab${i}" data-bs-toggle="pill" data-bs-target="#pills-profile${i}" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Health</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-contact-tab${i}" data-bs-toggle="pill" data-bs-target="#pills-contact${i}" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home${i}" role="tabpanel" aria-labelledby="pills-home-tab" style="text-align: left;
  padding-left: 15px;" >  <h5>Ingredients: <br></h5>
    ${formattedLines_1}
      </div >
  <div class="tab-pane fade" id="pills-profile${i}" role="tabpanel" aria-labelledby="pills-profile-tab"  style="text-align: left;
  padding-left: 15px;"> <h5>Health lables: <br></h5> ${formattedLines_2}</div>
  <div class="tab-pane fade" id="pills-contact${i}" role="tabpanel" aria-labelledby="pills-contact-tab">3</div>
</div >

      <div class="modal-body" style"text-aling:justify;" >
              
                </div >
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
            </div >
        </div >
    </div >
        
      </div >
      <br>
        `;
      i++;
    });
  }
}

// Usage example

function search() {
  const input = document.getElementById("search-food").value;
  searchRecipes(input);
}

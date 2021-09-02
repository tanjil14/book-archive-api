//control spinner visibility
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
//control error throwing
const toggleSearchResult = (displayStyle) => {
  document.getElementById("search-results").style.display = displayStyle;
};

// search function, given input by user
const getBooks = () => {
  const inputText = document.getElementById("input-box");
  const searchText = inputText.value;
  const errorBox = document.getElementById("error-box");
  //   check is input empty
  if (searchText === "") {
    errorBox.innerHTML = `<h5 class='text-center'>You didn't enter any book</h5>`;
  } else {
    //   clear error msg
    errorBox.textContent = "";
    //   display spinner
    toggleSpinner("block");
    toggleSearchResult("none");
    loadData(searchText);
    //clear input box
    inputText.value = "";
  }
};

//load data by api
const loadData = async (searchText) => {
  const URL = `http://openlibrary.org/search.json?q=${searchText}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayTotalNum(data);
    displayResults(data.docs);
  } catch (e) {
    toggleSpinner("none");
    document.getElementById("error-box").innerText = `<h5 class='text-center'>${e.message},
    please try again!</h5>`;
  }
};
// display total number of found
const displayTotalNum = (totalResults) => {
  document.getElementById("total-results").innerHTML = `
<h6>About ${totalResults.numFound} Results</h6>`;
};

//  display books info
const displayResults = (results) => {
  const allResultsDiv = document.getElementById("all-results");
  //clear previous results
  allResultsDiv.textContent = "";
  // traverse all data in array
  results.forEach((result, index) => {
    //   handle load all data on ui,just load 30
    if (index < 30) {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = ` <div class="card h-100">
      <img src="https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg" class="card-img-top" alt="Image" />
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-4">BookName:</dt>
          <dd class="col-sm-8">${result.title}</dd>

          <dt class="col-sm-4">Author:</dt>
          <dd class="col-sm-8">${result.author_name ? result.author_name : "Author not found"}</dd>

          <dt class="col-sm-4">Publication Date:</dt>
          <dd class="col-sm-8">${result.publish_date ? result.publish_date : "Published date not found"}</dd>

          <dt class="col-sm-6">First Publish Year:</dt>
          <dd class="col-sm-6">${result.first_publish_year ? result.first_publish_year : " Date not found"}</dd>
        </dl>
      </div>
    </div>`;
      allResultsDiv.appendChild(div);
    }
  });
  //hide spinner
  toggleSpinner("none");
  toggleSearchResult("block");
};

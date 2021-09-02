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
    errorBox.innerHTML = `<h5 class='text-center'>You didn't enter any book!</h5>`;
    toggleSearchResult("none");
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
  const URL = `https://openlibrary.org/search.json?q=${searchText}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    displayTotalNum(data);
    displayResults(data.docs);
  } catch (e) {
    toggleSpinner("none");
    document.getElementById("error-box").innerHTML = `<h5 class='text-center'>${e.message},
    please try again!</h5>`;
  }
};
// display total number of found
const displayTotalNum = (totalResults) => {
  const resultsDiv = document.getElementById("total-results");
  if (totalResults.numFound === 0) {
    resultsDiv.innerHTML = `
    <h4 class="text-center">No data has been found!</h4>`;
  } else {
    resultsDiv.innerHTML = `
    <h6>About ${totalResults.numFound} Results</h6>`;
  }
};

//  display books info
const displayResults = (results) => {
  const allResultsDiv = document.getElementById("all-results");
  //clear previous results
  allResultsDiv.textContent = "";
  // traverse all data in array
  results.forEach((result, index) => {
    //   handle load all data on ui,just load on 30
    if (index < 30) {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = ` <div class="card h-100">
     <!--if images not found  by default id 10909258 is work-->
      <img src="https://covers.openlibrary.org/b/id/${result.cover_i ? result.cover_i : "10909258"}-M.jpg" class="card-img-top" height="350" alt="Image" />
      <div class="card-body text-dark bg-light shadow-sm">
        <dl class="row">
          <dt class="col-md-5">BookName:</dt>
          <dd class="col-md-7">${result.title}</dd>
          <dt class="col-md-5">Author:</dt>
          <dd class="col-md-7">${result.author_name ? result.author_name[0] : "Author not found"}</dd>
          <hr />
          <dt class="col-md-5">Publisher:</dt>
          <dd class="col-md-7">${result.publisher ? result.publisher[0] : "Publisher not found"}</dd>
          <hr />
          <dt class="col-md-5">Publication Date:</dt>
          <dd class="col-md-7">${result.publish_date ? result.publish_date[0] : "Published date not found"}</dd>
          <hr />
          <dt class="col-md-5">First Publish Year:</dt>
          <dd class="col-md-7">${result.first_publish_year ? result.first_publish_year : " Date not found"}</dd>
          </dl>
      </div>
    </div>`;
      allResultsDiv.appendChild(div);
    }
  });
  //hide spinner & show results
  toggleSpinner("none");
  toggleSearchResult("block");
};

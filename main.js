// select require all html elements

const getBooks = () => {
  const inputText = document.getElementById("input-box");
  const searchText = inputText.value;
  const URL = `http://openlibrary.org/search.json?q=${searchText}`;
  loadData(URL);
};

const loadData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  displayTotalNum(data);
  displayResults(data.docs);
};
const displayTotalNum = (totalResults) => {
  document.getElementById("total-results").innerHTML = `
<h6>About ${totalResults.numFound} Results</h6>`;
};
const displayResults = (results) => {
  //   results.forEach(result=>{
  //       const authorNames=result.author_name;
  //       authorNames?.forEach(author=>{
  //         console.log(author)
  //       })

  //   })

  const allResults = document.getElementById("all-results");
  results.forEach((result) => {
    const authors = result.author_name;
  
      const div=document.createElement('div');
      div.classList.add('col');
      div.innerHTML=` <div class="card h-100">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <dl class="row">
          <dt class="col-sm-4">BookName:</dt>
          <dd class="col-sm-8">${result.title}</dd>

          <dt class="col-sm-4">Author:</dt>
          <dd class="col-sm-8">${authors?.forEach((author) => author)}</dd>

          <dt class="col-sm-4">Publication Date:</dt>
          <dd class="col-sm-8">${result.publish_year}</dd>
        </dl>
      </div>
    </div>`;
     allResults.appendChild(div);

  })
};

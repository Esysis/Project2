//A const is a type of variable that cannot be changed once it has been assigned a value
const apiKey = '8cf59100d539bf9363c2f7f6beb01c19';
const gNewsApiKey = 'b31a28696095a791c50b6b1eced1680e';
const gNewsApiUrl = `https://gnews.io/api/v4/top-headlines?token=${gNewsApiKey}&lang=en`;
const WapiKey = 'e6e9cf82d2a043fa9be232847230905';
const locationEl = document.querySelector('.location');
const temperatureEl = document.querySelector('.temperature');
const conditionEl = document.querySelector('.condition');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// This function fetch's the weather api data using the api key. Catching and displaying error if parameters aren't met.


// This function fetch's news data using the gNewsApiUrl const from earlier. Catching and displaying error if parameters aren't met.
function getNewsData() {
    fetch(gNewsApiUrl)
        .then(response => response.json())
        .then(data => {
            updateNewsInfo(data.articles);
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });
}
//  This function checks if the page is populating less than 3 articles. If it is not, it will return an error.
function updateNewsInfo(articles) {
    if (articles.length < 3) {
        console.error('Not enough articles');
        return;
    }
    populateArticle(articles[0], 'main-article');
    populateArticle(articles[1], 'secondary-articles');
    populateArticle(articles[2], 'secondary-articles');
}
// This function actually populates the articles with a short paragraph description with a read more hyperlink to the full article.
function populateArticle(article, elementId) {
    const title = document.createElement('h3');
    title.textContent = article.title;
    const description = document.createElement('p');
    description.textContent = article.description;
    const link = document.createElement('a');
    link.href = article.url;
    link.textContent = 'Read more...';
    const image = document.createElement('img');
    image.src = article.image;
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    element.appendChild(image);
    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(link);
}
getNewsData();
// This function iterates over each column div filling in the articles.
function updateBreakingNews(articles) {
    const breakingNewsDivs = document.querySelectorAll('.breakingNews .breakingNews-li');
    
    for (let i = 0; i < breakingNewsDivs.length; i++) {
      if (articles[i]) {
        const imgElement = breakingNewsDivs[i].querySelector('img');
        const linkElement = breakingNewsDivs[i].querySelector('.article-link');
        
        imgElement.src = articles[i].image;
        imgElement.alt = articles[i].title;
        
        linkElement.href = articles[i].url;
      }
    }
  }
  
//  This function fetches the gnews api data and returns an error if it does not fill all parameters. 
  function getBreakingNewsData() {
    fetch(gNewsApiUrl)
      .then(response => response.json())
      .then(data => {
        updateBreakingNews(data.articles);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  }
  
  getBreakingNewsData();

  const emailInput = document.getElementById('email-input');
const emailSubmitButton = document.getElementById('email-submit-button');

function addEmailToContactList(email) {
    let contactList = localStorage.getItem('contactList');
    if (contactList) {
        contactList = JSON.parse(contactList);
    } else {
        contactList = [];
    }
    contactList.push(email);
    localStorage.setItem('contactList', JSON.stringify(contactList));
}

emailSubmitButton.addEventListener('click', () => {
    const email = emailInput.value;
    if (email) {
        addEmailToContactList(email);
        emailInput.value = '';
    }
});

emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const email = emailInput.value;
        if (email) {
            addEmailToContactList(email);
            emailInput.value = '';
        }
    }
});
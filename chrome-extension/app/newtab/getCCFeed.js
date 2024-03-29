// Parse the feed to get challenge list
// https://codingchallenges.substack.com/feed

function getCCFeed() {
  const challengeList = document.querySelector("#challenge-list");

  const url = "http://localhost:3000/chromeext-xml";
  fetch(url)
    .then(res => res.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      const items = xmlDoc.getElementsByTagName("item");

      function stringToNode(htmlString) {
        const tempContainer = document.createElement("p");
        htmlString = htmlString.trim();
        tempContainer.innerHTML = htmlString;
        return tempContainer.firstChild;
      }

      for (let i = 0; i < 6; i++) {
        const title = items[i].getElementsByTagName("title")[0].textContent;
        console.log(title);
        challengeList.appendChild(stringToNode(`<p>${i + 1}. ${title}</p>`));
      }
    })
    .catch(error => console.error(error));
}

getCCFeed();

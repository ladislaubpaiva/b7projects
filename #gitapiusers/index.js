const selector = (e) => document.querySelector(e);

selector('.search button').addEventListener('click', async (e) => {
  e.preventDefault();
  const input = selector('.search #searchInput').value;
  const url = `https://api.github.com/users/${input}`;
  const results = await fetch(url);
  const response = await results.json();
  showWarning('Carregando');
  console.log(response);
  if (response.message === 'Not Found') {
    showWarning('Não Encontrado');
  } else {
    showInfo({
      img: response.avatar_url,
      name: response.name,
      company: response.company,
      url: response.html_url,
      blog: response.blog,
      bio: response.bio,
      twitter: response.twitter_username,
      followers: response.followers,
      following: response.following
    });
  }
}
);
function showInfo (response) {
  showWarning('');
  selector('.profileImg img').src = response.img;
  selector('.name span').innerText = response.name;
  selector('.company span').innerText = response.company;
  selector('.blog a').setAttribute('href', `https://${response.blog}`);
  selector('.blog span').innerText = response.blog;
  selector('.twitter span').innerText = response.twitter;
  selector('.following span').innerText = response.following;
  selector('.followers span').innerText = response.followers;
  selector('.bio-content').innerText = response.bio;
  selector('.profileInfo').style.display = 'flex';
}

function showWarning (sms) {
  selector('.warning').style.color = '#fff';
  selector('.warning').innerText = sms;
}

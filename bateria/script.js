const selector = (e) => document.querySelector(e);
const selectorAll = (e) => document.querySelectorAll(e);

function playSound (sound) {
  const audioElement = selector(`#s_${sound}`);
  const keyElement = selectorAll(`div[data-key=${sound}`);
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }
  if (keyElement) {
    keyElement.forEach((e, index) => {
      keyElement[index].classList.add('active');
    });
    setTimeout(() => {
      keyElement.forEach((e, index) => {
        keyElement[index].classList.remove('active');
      });
    }, 300);
  }
}
function playComposition (songArray) {
  let wait = 0;
  for (const i of songArray) {
    setTimeout(() => {
      playSound(`key${i}`);
    }, wait);
    wait += 250;
  }
}
function playNumComposition (songArray) {
  let wait = 0;
  for (const i of songArray) {
    let n;
    switch (Number(i)) {
      case 1:
        n = 'z';
        break;
      case 2:
        n = 'x';
        break;
      case 3:
        n = 'c';
        break;
      case 4:
        n = 'a';
        break;
      case 5:
        n = 's';
        break;
      case 6:
        n = 'd';
        break;
      case 7:
        n = 'q';
        break;
      case 8:
        n = 'w';
        break;
      case 9:
        n = 'e';
        break;
    }
    setTimeout(() => {
      playSound(`key${n}`);
    }, wait);
    wait += 250;
  }
}

selector('#btn').addEventListener('click', () => {
  const song = selector('#input').value;
  if (song !== '') {
    const songArray = song.split('');
    selectorAll('.option').forEach((option) => {
      option.addEventListener('load', () => {});
      const key = Number(option.getAttribute('data-key'));
      switch (key) {
        case 0:
          playComposition(songArray);
          break;
        case 1:
          playNumComposition(songArray);
          break;
      }
    });
  }
});

// || Normal or Numpad
selectorAll('.option').forEach((option) => {
  option.addEventListener('click', () => {
    if (selector('.option.selected')) {
      selector('.option.selected').classList.remove('selected');
    } else {
      selector('.composer').classList.remove('hide');
    }
    option.classList.add('selected');
    const key = Number(option.getAttribute('data-key'));
    switch (key) {
      case 0:
        selector('.keys').classList.remove('hide');
        selector('.keys.numpad').classList.add('hide');
        selectorAll('.option').forEach((e) => e.classList.add('hide'));
        document.body.addEventListener('keyup', (e) => {
          playSound(e.code.toLowerCase());
        });
        break;
      case 1:
        selector('.keys.numpad').classList.remove('hide');
        selector('.keys').classList.add('hide');
        selectorAll('.option').forEach((e) => e.classList.add('hide'));
        document.body.addEventListener('keyup', (e) => {
          switch (e.code) {
            case 'Numpad1':
              playSound('keyz');
              break;
            case 'Numpad2':
              playSound('keyx');
              break;
            case 'Numpad3':
              playSound('keyc');
              break;
            case 'Numpad4':
              playSound('keya');
              break;
            case 'Numpad5':
              playSound('keys');
              break;
            case 'Numpad6':
              playSound('keyd');
              break;
            case 'Numpad7':
              playSound('keyq');
              break;
            case 'Numpad8':
              playSound('keyw');
              break;
            case 'Numpad9':
              playSound('keye');
              break;
          }
        });
        break;
      default:
        break;
    }
  });
});
selector('#btn-back').addEventListener('click', () => {
  location.reload();
});

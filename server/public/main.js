const deleteText = document.querySelectorAll('.fa-trash');
const thumbText = document.querySelectorAll('.fa-thumbs-up');

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteCoin);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', updateLikes);
});

async function deleteCoin() {
  const cName = this.parentNode.childNodes[1].innerText;
  const cPrice = this.parentNode.childNodes[3].innerText;

  try {
    const response = await fetch('deleteCoin', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coinNameS: cName,
        coinPriceS: cPrice,
      }),
    });
    const data = await response.json();
    //console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function updateLikes() {
  const cName = this.parentNode.childNodes[1].innerText;
  const cPrice = this.parentNode.childNodes[3].innerText;
  const cLikes = Number(this.parentNode.childNodes[5].innerText);

  try {
    const response = await fetch('updateLikes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coinNameS: cName,
        coinPriceS: cPrice,
        coinLikesS: cLikes,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

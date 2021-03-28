const deleteText = document.querySelectorAll('.del');

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteCoin);
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
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

// async function deleteRapper(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     try{
//         const response = await fetch('deleteCoin', {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'coinNameS': sName,
//               'coinPriceS': cPrice
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }
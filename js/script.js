let game = document.getElementById('game')
let output = document.getElementById('output')

const cells = ['', '', '', '', '', '', '', '', '']

let go = 'circle'
output.textContent = 'Circle goes first'

function createCells() {
  cells.forEach((cell, idx) => {
    const cellItem = document.createElement('div')
    cellItem.classList.add('square')
    cellItem.id = idx
    cellItem.addEventListener('click', addGo)
    game.append(cellItem)
  })
}

createCells()

function addGo(e) {
  console.log(e.target)
  const goDisplay = document.createElement('div')
  goDisplay.classList.add(go)
  e.target.append(goDisplay)
  go = go === 'circle' ? 'cross' : 'circle'
  output.textContent = `it is now ${go}'s go.`
  e.target.removeEventListener('click', addGo)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square')
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  winCombo.forEach(combo => {
    const circleWins = combo.every(cell =>
      allSquares[cell].firstChild?.classList.contains('circle')
    )

    if (circleWins) {
      output.textContent = 'Circle wins'
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  winCombo.forEach(combo => {
    const crossWins = combo.every(cell =>
      allSquares[cell].firstChild?.classList.contains('cross')
    )

    if (crossWins) {
      output.textContent = 'Cross wins'
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      return
    }
  })
}

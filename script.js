const playerContainer = document.getElementById('all-players-container')
const newPlayerFormContainer = document.getElementById('new-player-form')

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-E'
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`

// <!-- form to add new players -->
// <div id="new-player-form"></div>

// <!-- container for all players -->
// <div id="all-players-container"></div>

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

// GET /api/COHORT-NAME/players
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL + 'players')
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    console.error('Uh oh, trouble fetching players!', err)
  }
}

// GET /api/COHORT-NAME/players/PLAYER-ID
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(APIURL + 'players/' + playerId)
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err)
  }
}

// POST /api/COHORT-NAME/players/
const addNewPlayer = async (playerObj) => {
  try {
    const method = 'POST'
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify(playerObj)

    const response = await fetch(APIURL + 'players/', {
      method,
      headers,
      body
    })
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    console.error('Oops, something went wrong with adding that player!', err)
  }
}

// DELETE /api/COHORT-NAME/players/PLAYER-ID
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(APIRURL + 'players/' + playerId, {
      method: 'DELETE'
    })
    const result = await response.json()
    console.log(result)
    return result
  } catch (err) {
    console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err)
  }
}

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderAllPlayers = (playerList) => {
  // return a dom element that can be used in our innerHTML
  // {id, name, breed, status, imageUrl, createdAt, updatedAt, teamId, cohortId}

  const playersContainer = document.getElementById('all-players-container')

  const componentArray = playerList.map((player, i) => {
    const { id, name, breed, status, imageUrl, createdAt, updatedAt, teamId, cohortId } = player

    //     const playerCard = document.createElement('div')
    //     playerCard.id = id
    //     playerCard.className.add('player-card')
    //     playerCard.innerHTML = `
    //     <h2 class="player-name">Name: ${name}</h2>
    //     <h3 class="player-breed">Breed: ${breed}</h3>
    //     <h3 class="player-status">Status: ${status}</h3>
    //     <img class="player-img" src="${imageUrl}" alt="player name is ${name}"/>
    //     <button id="details-${id}" class="player-btn">Details</button>
    // `
    const otherPlayerCard = `
    <div id="player${id}" className="player-card">
      <h2 class="player-name">Name: ${name}</h2>
      <h3 class="player-breed">Breed: ${breed}</h3>
      <h3 class="player-status">Status: ${status}</h3>
      <img class="player-img" src="${imageUrl}" alt="player name is ${name}"/>
      <button id="details-${id}" class="player-btn">Details</button>
    </div>
      `
    // playerCard.addEventListener("click", (e) => {
    //   e.target.id
    // })

    // playersContainer.appendChild(playerCard)
    return otherPlayerCard
  })
  playersContainer.innerHTML = componentArray.join('')
  // playerContainer.appendChild()

  // {playerList.map((player) => {return <PlayerComponent />})}
  // return (<>...</>)
  playersContainer.addEventListener('click', async (e) => {
    const targetId = Number(e.target.id.slice(7))
    if (typeof targetId === 'number') {
      const singlePlayer = await fetchSinglePlayer(targetId)
      const { id, name, breed, status, imageUrl, createdAt, updatedAt, teamId, cohortId, team } =
        singlePlayer
      //...
      playersContainer.innerHTML = ``
    }
  })
}

/**
 * renderNewPlayers renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {}

const init = async () => {
  // also called main
  const players = await fetchAllPlayers() // gets players state object[] -> Player[]
  renderAllPlayers(players) // Builds the DOM

  renderNewPlayerForm()
}

init()

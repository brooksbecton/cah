
function filterPlayersCards(cards, playerID){
    return cards.filter(
        ({ playerID: cardOwnerId }) => Number(cardOwnerId) === Number(playerID)
      )
}

export default filterPlayersCards;
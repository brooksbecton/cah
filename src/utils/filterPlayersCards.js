
function filterPlayersCards(cards, playerID){
    return cards.filter(
        ({ playerID: cardOwnerId }) => cardOwnerId === playerID
      )
}

export default filterPlayersCards;
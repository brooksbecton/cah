
function filterPlayersCards(cards, playerID){
    return cards.filter(
        ({ playerID: cardOwnerId }) => cardOwnerId === Number(playerID)
      )
}

export default filterPlayersCards;
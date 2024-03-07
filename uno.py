class Card:
    def __init__(self, random, card_color=None, card_num=None) -> None:
        pass

class Player:
    def __init__(self, cards) -> None:
        pass

if __name__ == "__main__":
    # setting
    start_cards = 4
    start_players = 2
    players = []

    for i in range(start_players):
        generated_cards = []
        for z in range(start_cards):
            generated_cards.append(Card(random=True))
        players.append(Player(cards=generated_cards))

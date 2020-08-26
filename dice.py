import numpy as np
import random as random

np.random.seed(42)

def rand():
    z = random.randint(1, 6) # kann später durch richtigen Zufallszahlengenerator ersetze werden.
    return z # Zufallszahl aus {1, 2, 3, 4, 5, 6}

def RollOneDice(): # Würfeln mit einem Würfel
    w = rand()
    return w

def RollTwoDice(): # Würfeln mit zwei Würfeln
    w1 = RollOneDice()
    w2 = RollOneDice()
    return [w1, w2]


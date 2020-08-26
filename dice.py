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
    w = w1 + w2
    return [w, w1==w2] # Würfelergebnis und Bool ob Pasch

def RollTwoDiceWhichGreater():
    w1 = RollOneDice()
    w2 = RollOneDice()
    w = w1 + w2
    if w1<w2: # 2. Würfel zeigt höhere Zahl an
        return [w, 2]
    elif w1>w2: # 1. Würfel zeigt höhere Zahl an
        return [w, 1]
    elif w1==w2: # Pasch
        return [w, -1] # die -1 ist willkürlich gewählt, sodass diese nicht mit einem der beiden Würfel verwechselt werden kann.
    else: 
        print("ERROR")
        return [w, 404]

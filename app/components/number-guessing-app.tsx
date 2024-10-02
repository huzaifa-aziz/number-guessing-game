'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, ChangeEvent } from "react"

import React from 'react'

const NumberGuessingPage = () => {
    interface NumberGuessingState {
        gameStarted: boolean,
        gameOver: boolean,
        paused: boolean,
        targetNumber: number,
        userGuess: number | string,
        attempts: number
    }
//         states
        const [gameStarted, setGameStarted] = useState<boolean>(false)
        const [gameOver, setGameOver] = useState<boolean>(false)
        const [paused, setPaused] = useState<boolean>(false)
        const [userGuess, setUserGuess ] = useState<number | string>("")
        const [attempts, setaAttempts] = useState<number>(0)
        const [targetNumber, setTargetNumber] = useState<number>(0)

        //effect hooks

        useEffect(() => {
         if (gameStarted && !paused) {
            const randomNumber:number = Math.floor(Math.random() * 10) + 1;
            setTargetNumber(randomNumber)
         }
        }, [gameStarted, paused])

        const handleStartGame = ():void => {
            setGameStarted(true)
            setGameOver(false)
            setaAttempts(0)
            setPaused(false)
        }

        const handlePausedGame = ():void => {
            setPaused(true)
        }
        const handleResumeGame = ():void => {
            setPaused(false)
        }


        const handleGuess = (): void => {
            if (typeof userGuess === "number" && userGuess === targetNumber) {
                setGameOver(true)
            }else{
                setaAttempts(attempts + 1)
            }
        }
        const handleTryAgain = (): void => {
            setGameStarted(false)
            setGameOver(false)
            setUserGuess("")
            setaAttempts(0)
        }


        const handleUsderGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
            setUserGuess(parseInt(e.target.value))
        }


        


        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-purple-700 to-indigo-900">
              <div className="bg-indigo-100 rounded-xl shadow-2xl p-10 w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800">
                  Guess the Number
                </h1>
                <p className="text-center text-indigo-700 mb-6">
                  Can you guess the secret number between 1 and 10?
                </p>
                {!gameStarted && (
                  <div className="flex justify-center mb-6">
                    <Button
                      onClick={handleStartGame}
                      className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105"
                    >
                      Start the Game
                    </Button>
                  </div>
                )}
                {gameStarted && !gameOver && (
                  <div>
                    <div className="flex justify-center mb-6">
                      {paused ? (
                        <Button
                          onClick={handleResumeGame}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                          Resume
                        </Button>
                      ) : (
                        <Button
                          onClick={handlePausedGame}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                          Pause
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-center mb-6">
                      <Input
                        type="number"
                        value={userGuess}
                        onChange={handleUsderGuessChange}
                        className="bg-white border-2 border-purple-500 rounded-full py-3 px-6 w-full max-w-xs shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        placeholder="Your Guess"
                      />
                      <Button
                        onClick={handleGuess}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full ml-4 transition-transform transform hover:scale-105"
                      >
                        Guess
                      </Button>
                    </div>
                    <div className="text-center text-indigo-700">
                      <p>Attempts: {attempts}</p>
                    </div>
                  </div>
                )}
                {gameOver && (
                  <div>
                    <div className="text-center mb-6 text-indigo-800">
                      <h2 className="text-3xl font-extrabold">Game Over!</h2>
                      <p>You guessed the number in {attempts} attempts.</p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={handleTryAgain}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
          
          
}

export default NumberGuessingPage

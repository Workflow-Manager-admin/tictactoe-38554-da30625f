<template>
  <main class="ttt-main">
    <section class="ttt-container">
      <div class="ttt-status">
        <span v-if="winner">
          <span v-if="winner === 'draw'">Draw!</span>
          <span v-else>
            Player <b :style="{color: accentColor}">{{ winner }}</b> wins!
          </span>
        </span>
        <span v-else>
          Player <b :style="{color: accentColor}">{{ currentPlayer }}</b>'s turn
        </span>
      </div>
      <div class="ttt-board">
        <button
          v-for="(cell, idx) in board"
          :key="idx"
          class="ttt-cell"
          :disabled="!!cell || !!winner"
          @click="makeMove(idx)"
        >
          <span :class="cell === 'X' ? 'ttt-x' : (cell === 'O' ? 'ttt-o' : '')">
            {{ cell }}
          </span>
        </button>
      </div>
      <button class="ttt-reset" @click="resetGame">
        Reset
      </button>
    </section>
  </main>
</template>

<script setup>
// Minimalist, light-themed, two-player TicTacToe game logic

import { ref, computed } from 'vue'

// Board: Array of 9 cells (null|'X'|'O')
const board = ref(Array(9).fill(null))
// Current player: 'X' or 'O'
const currentPlayer = ref('X')
// Winner: null | 'X' | 'O' | 'draw'
const winner = ref(null)

// Colors from palette
const primaryColor = '#ffffff'
const secondaryColor = '#000000'
const accentColor = '#2196f3'

// PUBLIC_INTERFACE
function makeMove(idx) {
  if (winner.value || board.value[idx]) return
  board.value[idx] = currentPlayer.value
  checkWinner()

  if (!winner.value) {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

// PUBLIC_INTERFACE
function resetGame() {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
}

// PUBLIC_INTERFACE
function checkWinner() {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6]           // Diags
  ]
  for (const [a,b,c] of lines) {
    const v = board.value
    if (v[a] && v[a] === v[b] && v[a] === v[c]) {
      winner.value = v[a]
      return
    }
  }
  // Check draw
  if (board.value.every(cell => cell)) {
    winner.value = 'draw'
  }
}
</script>

<style scoped>
.ttt-main {
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ttt-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0px 2px 16px 0px rgba(33, 150, 243, 0.06);
  min-width: 340px;
}

.ttt-status {
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-bottom: 0.5rem;
  text-align: center;
}

.ttt-board {
  display: grid;
  grid-template-columns: repeat(3, 64px);
  grid-template-rows: repeat(3, 64px);
  gap: 0.5rem;
  background: #f6fafd;
  border-radius: 0.4rem;
  padding: 0.6rem;
}

.ttt-cell {
  width: 64px;
  height: 64px;
  background: #fff;
  color: #000;
  border: 1.5px solid #e3e7ef;
  border-radius: 0.26rem;
  font-size: 2.1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border 0.13s;
  cursor: pointer;
  outline: none;
  user-select: none;
}
.ttt-cell:focus {
  border: 1.5px solid #2196f3;
}
.ttt-cell:disabled {
  background: #f0f4f8;
  color: #b0b0b0;
  cursor: not-allowed;
}
.ttt-x {
  color: #2196f3;
}
.ttt-o {
  color: #000000;
}

.ttt-reset {
  margin-top: 0.8rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.42rem 1.4rem 0.54rem 1.2rem;
  color: #fff;
  background: #2196f3;
  border: none;
  border-radius: 0.35rem;
  box-shadow: 0 1px 3px 0 rgba(33, 150, 243, 0.11);
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: background 0.14s;
}
.ttt-reset:hover {
  background: #1760a3;
}
</style>

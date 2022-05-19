#! /usr/bin/env node

'use strict'

const { prompt } = require('enquirer')
const player = require('node-wav-player')
const fs = require('fs');

(async () => {
  const firstResponse = await prompt({
    type: 'select',
    name: 'purpose',
    message: 'Please select your purpose',
    choices: ['Chill', 'Driving', 'Relaxing', 'Motivational', 'Working']
  })

  const files = fs
    .readdirSync(firstResponse.purpose)
    .map((file) => file.replace(/.mp3/g, ''))

  const secondResponse = await prompt({
    type: 'select',
    name: 'music',
    message: 'Please select music',
    choices: files
  })

  player.play({ path: `${firstResponse.purpose}/${secondResponse.music}.mp3` })
})()

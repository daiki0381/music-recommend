#! /usr/bin/env node

'use strict'

const { prompt } = require('enquirer')
const open = require('open')
const axios = require('axios')

const channelId = 'UCrs9_v3vRYZqXMVAqrIFViA'
const apiKey = 'AIzaSyDsMaB4ddZrwtQQ23Dmy5-IEv-5ltF_KvE';

(async () => {
  const responseOfPlaylist = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&key=${apiKey}`
  )
  const jsonOfPlaylist = await responseOfPlaylist.data
  const titlesOfPlaylist = jsonOfPlaylist.items.map(item => item.snippet.title)

  const firstResponseOfEnquirer = await prompt({
    type: 'select',
    name: 'purpose',
    message: 'Please select your purpose',
    choices: titlesOfPlaylist
  })

  const [playlistMatchingTitle] = jsonOfPlaylist.items.filter(item => firstResponseOfEnquirer.purpose === item.snippet.title)
  const playlistId = playlistMatchingTitle.id

  const responseOfPlaylistItems = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}`
  )
  const jsonOfPlaylistItems = await responseOfPlaylistItems.data
  const titlesOfPlaylistItems = jsonOfPlaylistItems.items.map(item => item.snippet.title)

  const secondResponseOfEnquirer = await prompt({
    type: 'select',
    name: 'music',
    message: 'Please select music',
    choices: titlesOfPlaylistItems
  })

  const [PlaylistItemsMatchingTitle] = jsonOfPlaylistItems.items.filter(item => secondResponseOfEnquirer.music === item.snippet.title)
  const url = `https://www.youtube.com/watch?v=${PlaylistItemsMatchingTitle.snippet.resourceId.videoId}`
  open(url)
})()

"use strict"
util = require("util")
yeoman = require("yeoman-generator")
PageGenerator = yeoman.generators.NamedBase.extend(
  init: ->
    console.log "You called the page subgenerator with the argument " + @name + "."
    return

  files: ->
    @copy "somefile.js", "somefile.js"
    return
)
module.exports = PageGenerator
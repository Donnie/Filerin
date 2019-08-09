const express = require('express')
const fs = require('fs')
const path = require('path')
const filedir = path.dirname(__dirname) + `/files/`

module.exports = {
    create: function () {
        var app = express()
        app.listen(3000, () => console.log(`App listening on port 3000!`))
        if (!fs.existsSync(filedir)){
          fs.mkdirSync(filedir)
        }
      
        app.get(`/f/:filename`, function(req, res) {
            var filename = req.params.filename
            res.download(filedir + filename, filename, function (err) {
                if (err) {
                    console.error(err)
                } else {
                    fs.unlinkSync(filedir + filename)
                }
            })
        })
    }
}

const cheerio = require('cheerio')
const moment = require('moment')

/**
 * method for global user
 * @returns user is logged in or not
 */

exports.setLocals = () =>{
    return async (req,res,next) =>{
        res.locals.user = req.user
        res.locals.isLoggedIn = req.session.isLoggedIn

        res.locals.truncate = html =>{
            let node = cheerio.load(html)
            let text = node.text()

            text = text.replace(/(\r\n|\n|\r)/gm,'')

            if(text.length<=100){
                return text
            }

            else{
               return text.substr(0,100) + '...'
            }
        }
        res.locals.moment = time => moment(time).fromNow()
        next()

        

    }
}


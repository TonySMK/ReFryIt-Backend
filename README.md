
# ReFryIt - Back-end/Server
The application connects the front-end application and the chrome extension.

Developed by Tony Sun
## Deployment
Alpha Version

To deploy this project: NodeJS/ExpressJS/KnexJS/MySQL application

```bash
1. Install all dependencies:
  npm install

2. Create a database:
  -update .env file
  
3. Create/Migrate Database Tables:
  npm run migrate

3. Seed Database Tables:
  npm run seed

4. To start and render application:
  npm run server



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`=8080
`DB_HOST`
`DB_NAME`
`DB_USER`
`DB_PASSWORD`

ex:
PORT=8080
DB_HOST=###.#.#.#
DB_NAME=somedb
DB_USER=somebeans
DB_PASSWORD=somebeans


## Features

*front-end
@ https://github.com/TonySMK/ReFryIt-Frontend
    !!! and make sure PORT = 8080 !!!

**to be able to add new highlights/bookmarks, add the accompanying chrome extension to your chrome browser
@ https://github.com/TonySMK/ReFryIt-Chrome-Extension


## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


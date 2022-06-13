module.exports = {
    data: [{
        title: 'Pokédex',
        demoUrl: 'https://www.pokedex.taydenflitcroft.com',
        projectUrl: 'https://github.com/HeadbangGang/pokedex',
        id: 'pokedex',
        image: {
            screenshot: {
                name: 'pokedex',
                fileType: 'png'
            },
            icon: {
                name: 'pokeball',
                fileType: 'png'
            }
        },
        description: '[Pokédex](https://www.pokedex.taydenflitcroft.com) is a web app that generates all Pokémon currently included in The Pokémon Company\'s "National Pokédex" with their Pokédex index, type(s), and both standard and "Shiny" sprites. Pokédex leverages my [Global Backend](https://github.com/HeadbangGang/global-backend) project by acting as an API layer between the front end project and the fully open-sourced [PokéAPI](https://pokeapi.co/) that the data originates from.'
    }, {
        title: 'Dungeons and Dragons',
        demoUrl: 'https://www.dnd.taydenflitcroft.com',
        projectUrl: 'https://github.com/HeadbangGang/dungeons-and-dragons',
        id: 'dungeons-and-dragons',
        image: {
            screenshot: {
                name: 'dungeons-and-dragons',
                fileType: 'png'
            },
            icon: {
                name: 'd20',
                fileType: 'png'
            }
        },
        description: '[Dungeons and Dragons](https://dnd.taydenflitcroft.com) is a web app created to be used during my friends and my weekly Dungeons and Dragons session. It includes a random number generator that accentuates when a 1 or a 20 (the worst and best roll possible on a 20 sided die) is "rolled", as well as a real time data sheet to track each players initiative value (or turn order). This application utilizes Google\'s Firestore database to persist all data. The apps main functionality is hidden behind user authentication which can be found in the project\'s [README](https://github.com/HeadbangGang/dungeons-and-dragons/blob/develop/README.md).'
    }, {
        title: 'Plex Dashboard',
        projectUrl: 'https://github.com/HeadbangGang/plex-dashboard',
        id: 'plex-dashboard',
        image: {
            screenshot: {
                name: 'plex-dashboard',
                fileType: 'png'
            },
            icon: {
                name: 'plex-logo',
                fileType: 'png'
            }
        },
        description: 'Plex Dashboard is a dockerized web-app to display the current status of all of the services running on my home media center. It queries the services endpoints and displays the response\'s status code to display if services are running properly.'
    }, {
        title: 'Global Backend',
        projectUrl: 'https://github.com/HeadbangGang/global-backend',
        id: 'global-backend',
        image: {
            icon: {
                name: 'api',
                fileType: 'png'
            }
        },
        description: '[Global Backend](https://api.taydenflitcroft.com) is my Node.js backend used for my projects. It acts as a personal API layer between my front-end projects, and other services/databases such as [PokeApi](https://pokeapi.co) and my Amazon Web Services [S3](https://aws.amazon.com/s3/) database.'
    }, {
        title: 'Owen Wilson Buttons',
        projectUrl: 'https://github.com/HeadbangGang/owen-wilson-buttons',
        id: 'owen-wilson-buttons',
        image: {
            icon: {
                name: 'owen-wilson',
                fileType: 'png'
            }
        },
        description: '[Owen Wilson Buttons](https://chrome.google.com/webstore/detail/owen-wilson-buttons/bjmcjbjbipaaobcedgdpejjfnlgiojon?hl=en&authuser=0) is a novelty Chrome Extension that adds event listeners to all buttons and anchor elements in the DOM which, when pressed, displays a confetti animation and plays one of 8 variations of Owen Wilson\'s iconic "Wow". Owen Wilson Buttons is currently published and publically available on the Chrome Web Store [here](https://chrome.google.com/webstore/detail/owen-wilson-buttons/bjmcjbjbipaaobcedgdpejjfnlgiojon?hl=en&authuser=0).'
    }, {
        title: 'Portfolio',
        projectUrl: 'https://github.com/HeadbangGang/portfolio',
        demoUrl: 'https://www.taydenflitcroft.com',
        id: 'portfolio-project',
        image: {
            screenshot: {
                name: 'portfolio',
                fileType: 'png'
            },
            icon: {
                name: 'html-tag',
                fileType: 'png'
            }
        },
        description: '[Portfolio](https://taydenflitcroft.com) is a React web app, written in TypeScript, that you are currently viewing. It is built to showcase my accomplishments, projects and work experience. It is built without the use of a UI Component Library with all styles and animations written with SASS (SCSS).'
    }]
}

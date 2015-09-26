# Restfull

A web application that allows you to set up your RESTful backend in minutes.


Example JSON to start the Generator

POST: http://localhost:3000/create

{
    "repoName": "test-back-end",
    "repoDescription": "This Back End is a Test",
    "framework": "sails",
    "database": "mongo",
    "schemas": [
        {
            "name": "Song",
            "attributes": {
                "name": {
                    "type": "string",
                    "required": true
                },
                "description": {
                    "type": "string"
                }
            }
        },
        {
            "name": "Album",
            "attributes": {
                "name": {
                    "type": "string",
                    "required": true
                },
                "description": {
                    "type": "string"
                },
                "artist": {
                    "type": "Artist"
                },
                "songs": {
                    "type": "Song",
                    "collection": true
                }
            }
        },
        {
            "name": "Artist",
            "attributes": {
                "name": {
                    "type": "string",
                    "required": "true"
                },
                "age": {
                    "type": "integer"
                }
            }
        }
    ]
}





{
    "name": "Wiggity Wack",
    "description":"This album be wiggity wack!",
    "artist": {
        "name":"Joe Shmo",
        "age":65
    },
    "songs": [
        {
            "name": "Happy Birthday",
            "description": "What you sing on someone's special day"
        },
        {
            "name": "ABC",
            "description": "Learn your alphabet"
        },
        {
            "name": "Itsy Bitsy Spider",
            "description": "Oh no, there seems to be rain in the forecast."
        }
    ]
}